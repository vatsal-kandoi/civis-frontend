import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { isObjectEmpty } from '../../functions/modular.functions';
import { ConsultationsService } from '../../services/consultations.service';

@Component({
  selector: 'app-response-answers',
  templateUrl: './response-answers.component.html',
  styleUrls: ['./response-answers.component.scss']
})
export class ResponseAnswersComponent implements OnInit {

  @Input() response;
  @Input() showOnlyLongTextAnswer: boolean;
  @Input() roundNumber;
  alignedData: any;
  activeRound: any;
  questions;
  answers;

  constructor(private _cdRef: ChangeDetectorRef,
      private consultationService: ConsultationsService) { }

  ngOnInit(): void {
    this.alignedData = this.mapAnswers();
    this._cdRef.detectChanges();
  }

  mapAnswers() {
    if (!isObjectEmpty(this.response)) {
      this.answers = this.response.answers;
      if (this.answers && this.answers.length) {
        this.questions = this.getQuestions();
        const responseAnswers = [];
        this.answers.map((item) => {
          let answer = {};
          if (this.questions && this.questions.length) {
            const responseQuestion = this.questions.find((question) => +question.id === +item.question_id);
            if (responseQuestion) {
            if (responseQuestion.questionType === 'multiple_choice' || responseQuestion.questionType === 'dropdown') {
              answer = item.is_other ? this.getMultiChoiceAnswer(responseQuestion, item) :
               this.getMultiChoiceAnswer(responseQuestion, item.answer);
            } else  if (responseQuestion.questionType === 'checkbox') {
              answer =  this.getCheckboxAnswer(responseQuestion, item);
            } else {
              if (item.is_other) {
                answer = {
                  id: responseQuestion.id,
                  questionType: responseQuestion.questionType,
                  questionText: responseQuestion.questionText,
                  answer: item.other_option_answer
                };
              } else {
                answer = {
                  id: responseQuestion.id,
                  questionType: responseQuestion.questionType,
                  questionText: responseQuestion.questionText,
                  answer: item.answer
                };
              }
            }
          }
          }
          if (this.showOnlyLongTextAnswer) {
            if (answer['questionType'] === 'long_text') {
              responseAnswers.push(answer);
            }
          } else {
            responseAnswers.push(answer);
          }
        });
        return responseAnswers;
      }
    }
    return;
  }

  getQuestions() {
    let questions;
    if (this.showOnlyLongTextAnswer) {
       questions =
        this.consultationService.getQuestions(this.response.consultation, this.response.roundNumber);
        return questions;
    } else {
      if (this.roundNumber) {
        questions = this.consultationService.getQuestions(this.response.consultation, this.roundNumber);
        return questions;
      }
      return this.consultationService.getQuestions(this.response.consultation);
    }
  }

  getCheckboxAnswer(responseQuestion, item) {

    const checkboxAnswers = [];
    if (item.answer && item.answer.length > 0) {
      item.answer.map((id) => {
        let answerText = false;
        responseQuestion.subQuestions.map((question) => {
          if (+id === +question.id) {
            answerText = true;
            checkboxAnswers.push(question.questionText);
          }
        });
        if (!answerText) {
          checkboxAnswers.push('Question not answered');
        }
      });
    }
    if (item && item.is_other) {
      checkboxAnswers.push(item.other_option_answer);
    }
    return {
      id: responseQuestion.id,
      questionType: responseQuestion.questionType,
      questionText: responseQuestion.questionText,
      answer: checkboxAnswers
    };
  }


  getMultiChoiceAnswer(responseQuestion, item) {
    if (item && item.is_other) {
      return {
        id: responseQuestion.id,
        questionType: responseQuestion.questionType,
        questionText: responseQuestion.questionText,
        answer: item.other_option_answer
      };
    } else {
      const subQuestion = responseQuestion.subQuestions.find((question) => +question.id === +item);
      return {
        id: responseQuestion.id,
        questionType: responseQuestion.questionType,
        questionText: responseQuestion.questionText,
        answer: subQuestion.questionText
      };
    }

  }


}
