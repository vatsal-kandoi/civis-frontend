import gql from 'graphql-tag';

export const CurrentUser = gql`
query{
  userCurrent {
    id
    city {
      id
      name
    }
    firstName
    lastName
    email
    notifyForNewConsultation
  }
}
`;