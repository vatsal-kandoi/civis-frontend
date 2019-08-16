import gql from 'graphql-tag';

export const CurrentUser = gql`
query{
  userCurrent {
    id
    city {
      id
      name
      parent {
        id
        name
      }
    }
    cityRank
    createdAt
    email
    firstName
    lastName
    notifyForNewConsultation
    phoneNumber
    rank
    responses {
      edges {
        node {
          id
          points
        }
      }
    }
    stateRank
  }
}
`;