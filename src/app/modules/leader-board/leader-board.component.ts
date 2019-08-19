import { Component, OnInit, ViewChild, HostListener, ViewEncapsulation } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { map } from 'rxjs/operators';
import { Apollo, QueryRef } from 'apollo-angular';
import { UserList } from './leader-board.graphql';


@Component({
  selector: 'app-leader-board',
  templateUrl: './leader-board.component.html',
  styleUrls: ['./leader-board.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LeaderBoardComponent implements OnInit {

  level = 'National';

  levels = [
    {
      name: 'National'
    },
    {
      name: 'State'
    },
    {
      name: 'Local'
    }
  ];
  perPageLimit = 15;
  userListQuery: QueryRef<any>;
  userListData: any;
  loadingElements: any = {};
  leaderData: any;

  @ViewChild('leaderModal') leaderModal: ModalDirective;
  
  @HostListener('document:scroll', ['$event'])
  onScroll(event: any) {
    const boundingBox = document.documentElement.getBoundingClientRect();
    if ((Math.floor(+boundingBox.height) - window.scrollY) <= window.innerHeight && this.userListData) {
      this.loadMoreCard();
    }
  }

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this. fetchUserList();
  }
  
  openLeaderModal(data) {
    this.leaderData = data;
    this.leaderModal.show();
  }

  closeModal() {
    this.leaderModal.hide();
  }

  // selectLevel(event) {
  //   this.level = event;
  //   console.log(this.level, 'event');
  // }
  
  getQuery() {
    const variables = {
      perPage: this.perPageLimit,
      page: 1,
      roleFilter: 'citizen',
      locationFilter: null,
      sort: 'points',
      sortDirection: 'desc'
    };
    return this.apollo.watchQuery({query: UserList, variables});
  }

  fetchUserList() {
    this.userListQuery = this.getQuery();
    this.loadingElements.userList = true;
    this.userListQuery
      .valueChanges
        .pipe (
          map((res: any) => res.data.userList)
        )
        .subscribe(item => {
          this.loadingElements.userList = false;
          this.userListData = item;
        }, err => {
          console.log('not working', err);
        });
  }

  loadMoreCard() {
    if (this.loadingElements.userListMore || this.loadingElements.userList) {
      return;
    }
    if(this.userListData.paging.totalPages > this.userListData.paging.currentPage) {
      this.loadingElements.userListMore = true;
      this.userListQuery.fetchMore({
        variables: {
          page: ++this.userListData.paging.currentPage
        },
        updateQuery: (prev, {fetchMoreResult}) => {
          this.loadingElements.userListMore = false;
          if (!fetchMoreResult) {
            return prev;
          }
          const updatedObject = Object.assign({}, prev, {
            ...prev,
            userList: {
              ...prev.userList,
              data: [
                ...prev.userList.data,
                ...fetchMoreResult.userList.data
              ],
              paging: fetchMoreResult.userList.paging
            }
          });
          return updatedObject;
        }
      });
    }
  }  

}
