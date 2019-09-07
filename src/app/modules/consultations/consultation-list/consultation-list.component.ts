import { Component, OnInit, HostListener } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { ConsultationList } from './consultation-list.graphql';
import { LinearLoaderService } from '../../../shared/components/linear-loader/linear-loader.service';
import * as moment from 'moment';

@Component({
  selector: 'app-consultation-list',
  templateUrl: './consultation-list.component.html',
  styleUrls: ['./consultation-list.component.scss']
})

export class ConsultationListComponent implements OnInit {

  consultationListData: any;
  consultationListArray: Array<any>;
  consultationListPaging: any;
  perPageLimit = 15;
  consultationListQuery: QueryRef<any>;
  closedConsultationQuery: QueryRef<any>;
  loadingElements: any = {};
  closedConsultationList: Array<any>;
  closedConsultationPaging: any;
  loadClosedConsultation = false;
  
  @HostListener('document:scroll', ['$event'])
  onScroll(event: any) {
    const boundingBox = document.documentElement.getBoundingClientRect();
    if ((Math.floor(+boundingBox.height) - window.scrollY) <= window.innerHeight && this.consultationListData && this.consultationListArray) {
      this.loadMoreCard();
    }
  }

  constructor(private apollo: Apollo, private loader: LinearLoaderService) { }

  ngOnInit() {
    this.fetchActiveConsultationList();
  }
  
  fetchActiveConsultationList() {
    this.consultationListQuery = this.getQuery('published');
    this.loader.show();
    this.loadingElements.consultationList = true;
    this.consultationListQuery
      .valueChanges 
        .pipe (
          map((res: any) => res.data.consultationList)
        )
        .subscribe(item => {
            this.loadingElements.consultationList = false;
            this.consultationListData = item;
            this.consultationListArray = item.data;
            this.consultationListPaging = item.paging;
            if (!this.consultationListArray.length || 
              (this.consultationListPaging.currentPage === this.consultationListPaging.totalPages)) {
                this.loadClosedConsultation = true;
                this.fetchClosedConsultationList();
              }
        }, err => {
            this.loadingElements.consultationList = false;
            this.loader.hide();
            console.log('not working', err);
        })
  }

  loadMoreCard() {
    if (this.loadingElements.consultationListMore || this.loadingElements.consultationList) {
      return;
    }
    let pagingData = this.consultationListData.paging;
    if (this.loadClosedConsultation) {
      pagingData = this.closedConsultationPaging;
    }
    if(pagingData.totalPages > pagingData.currentPage) {
      this.loader.show();
      this.loadingElements.consultationListMore = true;
      this.consultationListQuery.fetchMore({
        variables: {
          page: ++pagingData.currentPage
        },
        updateQuery: (prev, {fetchMoreResult}) => {
          this.loader.hide();
          this.loadingElements.consultationListMore = false;
          if (!fetchMoreResult) {
            return prev;
          }
          const updatedObject = Object.assign({}, prev, {
            ...prev,
            consultationList: {
              ...prev.consultationList,
              data: [
                ...prev.consultationList.data,
                ...fetchMoreResult.consultationList.data
              ],
              paging: fetchMoreResult.consultationList.paging
            }
          });
          return updatedObject;
        }
      });
    }
  }  

  getQuery(status) {
    const variables = {
      perPage: this.perPageLimit,
      page: 1,
      statusFilter: status,
      featuredFilter: false,
      sort: 'response_deadline',
      sortDirection: 'desc',
    };
    return this.apollo.watchQuery({query: ConsultationList, variables});
  }
  
  fetchClosedConsultationList() {
    this.consultationListQuery = this.getQuery('expired');
    this.loader.show();
    this.loadingElements.consultationList = true;
    this.consultationListQuery
      .valueChanges 
        .pipe (
          map((res: any) => res.data.consultationList)
        )
        .subscribe(item => {
            this.loadingElements.consultationList = false;
            this.closedConsultationList = item.data;
            this.closedConsultationPaging = item.paging;
        }, err => {
            this.loadingElements.consultationList = false;
            this.loader.hide();
            console.log('not working', err);
        })
  }
  
  convertDateType(date) {
    return moment(date).format("Do MMM YY");
  }
  
}
