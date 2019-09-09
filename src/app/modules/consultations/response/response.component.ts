import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { ResponseProfileQuery } from './response.graphql';
import * as moment from 'moment';
import { ErrorService } from 'src/app/shared/components/error-modal/error.service';


@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.scss']
})
export class ResponseComponent implements OnInit {
  responseId: number;
  profile: any;

  constructor(private activatedRoute: ActivatedRoute, private apollo: Apollo, private errorService: ErrorService) {
    this.activatedRoute.params.subscribe((param: any) => {
      this.responseId = +param['id'];
      if (this.responseId) {
        this.getResponseProfie();
      }
    });
   }

   getResponseProfie() {
    this.apollo.query({
      query: ResponseProfileQuery,
      variables : {
        id: +this.responseId
      }
    })
    .pipe (
      map((res: any) => res.data.consultationResponseProfile)
    )
    .subscribe((response) => {
      this.profile = response;
    }, err => {
      this.errorService.showErrorModal(err);
    });
   }

   convertDateFormat(date) {
     if (date) {
      return moment(date).format('Do MMM YY');
     }
  }

  ngOnInit() {
  }

}
