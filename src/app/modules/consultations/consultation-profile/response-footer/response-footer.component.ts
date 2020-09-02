import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { ErrorService } from 'src/app/shared/components/error-modal/error.service';
import { Apollo } from 'apollo-angular';
import { VoteDeleteQuery, ConsultationProfileCurrentUser, VoteCreateQuery } from '../consultation-profile.graphql';
import { ConsultationsService } from 'src/app/shared/services/consultations.service';
import { filter } from 'rxjs/operators';
import * as moment from 'moment';
import { isObjectEmpty } from '../../../../shared/functions/modular.functions';


@Component({
  selector: 'app-response-footer',
  templateUrl: './response-footer.component.html',
  styleUrls: ['./response-footer.component.scss']
})
export class ResponseFooterComponent implements OnInit {
  @Input() response;
  currentUser: any;
  profileData: any;
  consultationId: any;
  responseId: any;
  showShareBlock = false;
  usingTemplate: boolean;
  responseQuestions: any;
  longTextResponse: {};

  constructor(private userService: UserService,
              private errorService: ErrorService,
              private apollo: Apollo,
              private consultationService: ConsultationsService) {
                this.consultationService.consultationId$
                .pipe(
                  filter(i => i !== null)
                )
                .subscribe((consulationId: any) => {
                  this.consultationId = consulationId;
                });
               }

  ngOnInit(): void {
    this.getCurrentUser();
    this.subscribeProfileData();
  }

  getCurrentUser() {
    this.userService.userLoaded$
    .subscribe((data) => {
      if (data) {
        this.currentUser = this.userService.currentUser;
      } else {
        this.currentUser = null;
      }
    });
  }

  subscribeProfileData() {
    this.consultationService.consultationProfileData.subscribe((data) => {
      this.profileData = data;
      this.responseQuestions = this.profileData.questions;
    });
  }

  vote(direction, response) {
    if (response.votedAs) {
      if (response.votedAs.voteDirection === direction) {
        this.undoVote(response, direction);
      } else {
        this.undoVote(response, direction, true);
      }
    } else {
      this.createVote(response, direction);
    }
  }

  undoVote(response, direction, createVote?) {
    if (response.id) {
      this.apollo.mutate({
        mutation: VoteDeleteQuery,
        variables: {
          consultationResponseId: response.id
        },
        update: (store, {data: res}) => {
          const variables = {id: this.consultationId};
          const resp: any = store.readQuery({query: ConsultationProfileCurrentUser, variables});
          if (res) {
            for (const value of resp['consultationProfile'].sharedResponses.edges) {
              if (value.node.id ===  response['id']) {
                if (response.votedAs) {
                  value.node[response.votedAs.voteDirection + 'VoteCount'] -= 1;
                }
                value.node.votedAs = null;
                this.response = value;
                break;
              }
            }
          }
          store.writeQuery({query: ConsultationProfileCurrentUser, variables, data: resp});
        }
      })
      .subscribe((res) => {
        if (createVote) {
          this.createVote(response, direction);
        }
      }, err => {
        this.errorService.showErrorModal(err);
      });
    }
  }

  createVote(response, direction) {
    const vote = {
      consultationResponseVote: {
        consultationResponseId: response.id,
        voteDirection: direction
      }
    };
    this.apollo.mutate({
      mutation: VoteCreateQuery,
      variables: vote,
      update: (store, {data: res}) => {
        const variables = {id: this.consultationId};
        const resp: any = store.readQuery({query: ConsultationProfileCurrentUser, variables});
        if (res) {
          for (const value of resp['consultationProfile'].sharedResponses.edges) {
            if (value.node.id ===  response['id']) {
              if (value.node[res.voteCreate.voteDirection + 'VoteCount']) {
                value.node[res.voteCreate.voteDirection + 'VoteCount'] += 1;
              } else {
                value.node[res.voteCreate.voteDirection + 'VoteCount'] = 1;
              }
              value.node.votedAs = res.voteCreate;
              this.response = value;
              break;
            }
          }
        }
        store.writeQuery({query: ConsultationProfileCurrentUser, variables, data: resp});
      }
    })
    .subscribe((data) => {
    }, err => {
      this.errorService.showErrorModal(err);
    });
  }

  toggleShareBlock(id) {
    if (id) {
      this.responseId = id;
      this.showShareBlock = !this.showShareBlock;
    }
  }

  showCreateResponse() {
    if ((this.checkClosed(this.profileData ? this.profileData.responseDeadline : null) === 'Closed')
        || !this.currentUser || (this.profileData && this.profileData.respondedOn)) {
        return false;
    }
    // this.enableCkEditor = true;
    return true;
  }

  checkClosed(deadline) {
    if (deadline) {
      const today = moment();
      const lastDate = moment(deadline);
      const difference = lastDate.diff(today, 'days');
      if (difference <= 0) {
        return difference === 0 ? 'Last day to respond' : 'Closed';
      } else {
        return `Active`;
      }
    }
  }

  questionnaireExist() {
    if (this.profileData && this.profileData.questions) {
      const questions = this.profileData.questions; {
        if (questions.length) {
          return true;
        }
      }
    }
    return false;
  }

  useThisResponse(response) {
    if (this.profileData.respondedOn) {
      return;
    }
    if (response) {
      this.usingTemplate = true;
      this.longTextResponse = this.getLongTextAnswer(response);
      if (!isObjectEmpty(this.longTextResponse)) {
        const obj = {
          responseText: this.longTextResponse['answer'],
          controlName: this.longTextResponse['id'].toString(),
          templateId: response.id
        };
        this.consultationService.useThisResponseAnswer.next(obj);
        // this.responseText =  this.templateText = this.longTextResponse['answer'];
        // const controlName = this.longTextResponse['id'].toString();
        // if (this.showCreateResponse() && this.questionnaireExist()) {
        //   this.showQuestions = true;
        //   const checkTextAreaElementExist = setInterval(() => {
        //     const textAreaElement = document.getElementById(`text-area-${controlName}`);
        //     if (textAreaElement) {
        //       clearInterval(checkTextAreaElementExist);
        //       window.scrollTo({
        //         top: this.questionnaireContainer.nativeElement.offsetTop - 80,
        //         behavior: 'smooth',
        //       });
        //       this.questionnaireForm.get(controlName).patchValue(this.responseText);
        //     }
        //   }, 100);
        // }
      } else {
        // this.responseText =  this.templateText = response.responseText;
        // window.scrollTo({
        //   top: this.responseIndex.nativeElement.offsetTop,
        //   behavior: 'smooth',
        // });
        // if (this.responseText) {
        //   this.consultationsService.enableSubmitResponse.next(true);
        // }
      }
      // this.templateId = response.id;
      // this.customStyleAdded = false;
      // this.editIframe();
    }
  }

  getLongTextAnswer(response) {
    const answers = response && response.answers;
    let answer = {};
    if (answers && answers.length) {
      answers.map((item) => {
        if (this.responseQuestions && this.responseQuestions.length) {
          const responseQuestion = this.responseQuestions.find((question) => +question.id === +item.question_id);
          if (responseQuestion.questionType === 'long_text') {
            answer = {
              id: responseQuestion.id,
              questionType: responseQuestion.questionType,
              questionText: responseQuestion.questionText,
              answer: item.answer
            };
          }
        }
      });
      return answer;
    }
    return;
  }

}

