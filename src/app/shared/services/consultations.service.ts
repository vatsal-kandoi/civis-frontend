import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import { isObjectEmpty } from '../functions/modular.functions';

@Injectable({
  providedIn: 'root'
})
export class ConsultationsService {

    enableSubmitResponse =  new BehaviorSubject(null);
    consultationId$ = new BehaviorSubject(null);
    openFeedbackModal = new BehaviorSubject (null);
    scrollToCreateResponse = new BehaviorSubject (null);
    activeTab = new BehaviorSubject (null);
    validateAnswers = new BehaviorSubject (null);
    consultationProfileData = new BehaviorSubject (null);
    useThisResponseAnswer = new BehaviorSubject(null);
    useThisResponseText = new BehaviorSubject(null);
    scrollToPublicResponse = new BehaviorSubject(null);
    activeRoundNumber = new BehaviorSubject(null);

  constructor() {
  }

  getQuestions(profileData, roundNumber?) {
    if (profileData && profileData.responseRounds) {
      const responseRounds = profileData.responseRounds;
      if (responseRounds && responseRounds.length) {
        let activeRound;
        if (roundNumber) {
          activeRound = responseRounds.find((round) => +round.roundNumber === +roundNumber);
        } else {
          activeRound  = responseRounds.find((round) => round.active);
        }
        if (!isObjectEmpty(activeRound)) {
          const questions = activeRound.questions;
            if (questions.length) {
              return questions;
            }
        }
      }
    }
    return;
  }

}
