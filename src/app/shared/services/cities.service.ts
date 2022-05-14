import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { CitiesSearchQuery, LocationListQuery } from 'src/app/graphql/queries';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  constructor(private apollo: Apollo,) { }

  /***
   * Gets all the cities that the user can select from
   */
  getCities() {
    return this.apollo.query({
      query: LocationListQuery,
      variables: {
        type: 'city'
      }
    })
    .pipe(
      map((res: { data: any }) => res.data.locationList)
    )
  }  

  /**
   * Searches for cities based on user input
   * @param name City name
   * @returns Observable
   */
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
        map((i: any) => i.data.locationAutocomplete)        
      );
    }
  }
}
