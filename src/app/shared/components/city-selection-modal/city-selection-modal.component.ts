import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { distinctUntilChanged, debounceTime, takeWhile, switchMap, map, tap } from 'rxjs/operators';
import { CitiesSearchQuery, UpdateCity } from './city-selection-modal.graphql';
import { Apollo } from 'apollo-angular';
import { UserService } from '../../services/user.service';
import { ErrorService } from '../error-modal/error.service';

@Component({
  selector: 'app-city-selection-modal',
  templateUrl: './city-selection-modal.component.html',
  styleUrls: ['./city-selection-modal.component.scss']
})
export class CitySelectionModalComponent implements OnInit {

  @ViewChild('citySelectionModal', { static: false }) citySelectionModal: ModalDirective;
  searchEmitter: EventEmitter<any> = new EventEmitter();
  loading: boolean;
  cities: any;
  dropdownText = 'Begin Typing';
  user = {
    cityId: null,
  };

  constructor(
    private apollo: Apollo,
    private userService: UserService,
    private errorService: ErrorService,
  ) { }

  ngOnInit() {
    this.subscribeToSearch();
  }

  subscribeToSearch() {
    this.searchEmitter
      .pipe(
        distinctUntilChanged(),
        debounceTime(400),
        takeWhile(data => !!data),
        switchMap(data => {
          if (data) {
            this.loading = true;
            return this.searchCity(data.term);
          }
        })
      )
      .subscribe((result) => {
        this.loading = false;
        this.cities = result;
        if (!this.cities.length) {
          this.dropdownText = 'City not found';
        }
      }, (err: any) => {
        this.loading = false;
      });
  }

  onCitySearch(query: any) {
    if (!query.term) {
      query = null;
      return;
    }
    this.searchEmitter.emit(query);
  }

  searchCity(name: string) {
    if (name.trim()) {
      return this.apollo.query({
          query: CitiesSearchQuery,
          variables: {
            q: name,
            type: 'city'
          }
        })
        .pipe(
          map((i: any) => i.data.locationAutocomplete),
          tap(() => this.loading = false)
        );
    }
  }

  submit() {
    const user = { ...this.user };
    const variables = {
      user
    };
    this.apollo.mutate({ mutation: UpdateCity, variables })
      .pipe(
        map((res: any) => res.data.currentUserUpdate)
      )
      .subscribe((res) => {
        this.close();
      }, err => {
        this.close();
        this.errorService.showErrorModal(err);
      });
  }

  close() {
    this.citySelectionModal.hide();
  }

}
