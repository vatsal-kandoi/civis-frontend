import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {ApolloModule} from 'apollo-angular';
import {HttpLinkModule} from 'apollo-angular-link-http';
import {GraphqlService} from './graphql.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApollo,
      deps: [GraphqlService],
      multi: true
    },
    GraphqlService
  ]
})
export class GraphQLModule {
}

export function initializeApollo(graphqlService: GraphqlService) {
  return () => graphqlService.initializeApollo();
}
