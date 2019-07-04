import { Injectable } from '@angular/core';
import {Apollo} from 'apollo-angular';
import {HttpLink} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {prod, staging} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {
   uri = ''; // <-- add the URL of the GraphQL server here

  constructor(
    private apollo: Apollo,
    private httpLink: HttpLink
  ) { }

  initializeApollo() {
    return new Promise((resolve, reject) => {
    this.apollo.create({
      link: this.httpLink.create({uri: 'https://api-staging.civis.vote/graphql'}),
      cache: new InMemoryCache()
    });
    resolve();
  });
  }
}
