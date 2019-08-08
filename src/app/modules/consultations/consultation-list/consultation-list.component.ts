import { Component, OnInit, HostListener } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { ConsultationList } from './consultation-list.graphql';
import { LinearLoaderService } from '../../../shared/components/linear-loader/linear-loader.service';


@Component({
  selector: 'app-consultation-list',
  templateUrl: './consultation-list.component.html',
  styleUrls: ['./consultation-list.component.scss']
})

export class ConsultationListComponent implements OnInit {

  consultationListData: any;
  consultationListArray: Array<any>;
  perPageLimit = 15;
  consultationListQuery: QueryRef<any>;
  loadingElements: any = {};
  
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
    if(this.consultationListData.paging.totalPages > this.consultationListData.paging.currentPage) {
      this.loader.show();
      this.loadingElements.consultationListMore = true;
      this.consultationListQuery.fetchMore({
        variables: {
          page: ++this.consultationListData.paging.currentPage
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
      statusFilter: status
    };
    return this.apollo.watchQuery({query: ConsultationList, variables});
  }

}
