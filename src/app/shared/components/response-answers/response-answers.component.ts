import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-response-answers',
  templateUrl: './response-answers.component.html',
  styleUrls: ['./response-answers.component.scss']
})
export class ResponseAnswersComponent implements OnInit {

  @Input() questions;
  @Input() answers;
  @Input() showOnlyLongTextAnswer: boolean;
  alignedData: any;
  constructor() { }

  ngOnInit(): void {
    this.alignedData = this.mapAnswers();
  }

  mapAnswers() {
    if (this.answers && this.answers.length) {
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
            answer = item.is_other ? this.getCheckboxAnswer(responseQuestion, item) : this.getCheckboxAnswer(responseQuestion, item.answer);
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
    return;
  }

  getCheckboxAnswer(responseQuestion, item) {

    const checkboxAnswers = [];
    if (item.answer && item.answer.length > 0) {
      item.answer.map((id) => {
        responseQuestion.subQuestions.map((question) => {
          if (+id === +question.id) {
            checkboxAnswers.push(question.questionText);
          }
        });
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
