import gql from 'graphql-tag';

export const CurrentUser = gql`
query{
  userCurrent {
    id
    bestRank
    bestRankType
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
    responses(sort: created_at, sortDirection: asc) {
      edges {
        node {
          id
          points
          consultation {
            id
             title
            ministry {
              id
              name
              logo (resolution : "75*105>") {
                url
              }
            }
            responseDeadline
          }
        }
      }
    }
    stateRank
  }
}
`;