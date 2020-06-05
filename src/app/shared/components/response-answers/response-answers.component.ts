import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-response-answers',
  templateUrl: './response-answers.component.html',
  styleUrls: ['./response-answers.component.scss']
})
export class ResponseAnswersComponent implements OnInit {

  @Input() questions;
  @Input() answers;
  constructor() { }

  ngOnInit(): void {
  }

  mapAnswers() {
    if (this.answers && this.answers.length) {
      const responseAnswers = [];
      this.answers.map((item) => {
        let answer = {};
        if (this.questions && this.questions.length) {
          const responseQuestion = this.questions.find((question) => +question.id === +item.question_id);
          if (responseQuestion.questionType === 'multiple_choice') {
            answer = this.getMultiChoiceAnswer(responseQuestion, item.answer);
          } else  if (responseQuestion.questionType === 'checkbox') {
            answer = this.getCheckboxAnswer(responseQuestion, item.answer);
          } else {
            answer = {
              id: responseQuestion.id,
              questionType: responseQuestion.questionType,
              questionText: responseQuestion.questionText,
              answer: item.answer
            };
          }
        }
        responseAnswers.push(answer);
      });
      return responseAnswers;
    }
    return;
  }

  getCheckboxAnswer(responseQuestion, answers) {
    const checkboxAnswers = [];
    answers.map((id) => {
      responseQuestion.subQuestions.map((question) => {
        if (+id === +question.id) {
          checkboxAnswers.push(question.questionText);
        }
      });
    });
    return {
      id: responseQuestion.id,
      questionType: responseQuestion.questionType,
      questionText: responseQuestion.questionText,
      answer: checkboxAnswers
    };
  }


  getMultiChoiceAnswer(responseQuestion, subQuestionId) {
    const subQuestion = responseQuestion.subQuestions.find((question) => +question.id === +subQuestionId);
    return {
      id: responseQuestion.id,
      questionType: responseQuestion.questionType,
      questionText: responseQuestion.questionText,
      answer: subQuestion.questionText
    };
  }

}
