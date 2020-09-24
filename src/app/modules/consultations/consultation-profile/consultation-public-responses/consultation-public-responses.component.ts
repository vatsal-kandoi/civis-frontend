import { Component, OnInit, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { ConsultationsService } from 'src/app/shared/services/consultations.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-consultation-public-responses',
  templateUrl: './consultation-public-responses.component.html',
  styleUrls: ['./consultation-public-responses.component.scss']
})
export class ConsultationPublicResponsesComponent implements OnInit, AfterViewChecked {

  @ViewChild('responsesListContainer', { read: ElementRef , static: false }) responsesListContainer: ElementRef<any>;

  profileData: any;
  responseList: any;
  selectedUser: any;
  showUserProfileModal: boolean;
  fragment: any;
  checkForFragments: any;

  constructor(private consultationService: ConsultationsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscribeToProfileData();
    this.scrollToResponses();
  }

  ngAfterViewChecked() {
    if (this.checkForFragments) {
      this.subscribeToFragment();
      this.checkForFragments = false;
    }
  }

  subscribeToProfileData() {
    this.consultationService.consultationProfileData.subscribe((data) => {
      if (data) {
        this.profileData = data;
        this.responseList = data.sharedResponses.edges;
        this.checkForFragments = true;
      }
    });
  }

  openUserProfile(data) {
    this.selectedUser = data.id;
    this.showUserProfileModal = true;
  }

  subscribeToFragment() {
    this.route.fragment.subscribe(fragment => {
      this.fragment = fragment;
      if (this.fragment) {
        const element = document.getElementById(this.fragment);
        if (element) {
          window.scrollTo({
            top: element.getBoundingClientRect().top - 80,
            behavior: 'smooth',
          });
        }
      }
    });
  }

  scrollToResponses() {
    this.consultationService.scrollToPublicResponse
    .subscribe((scrollTo) => {
      if (scrollTo) {
        window.scrollTo({
          top: this.responsesListContainer.nativeElement.offsetTop - 80,
          behavior: 'smooth',
        });
        this.consultationService.scrollToPublicResponse.next(false);
      }
    });
  }

}
