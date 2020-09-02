import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

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

  constructor() {
  }

}
