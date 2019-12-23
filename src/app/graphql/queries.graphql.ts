import gql from 'graphql-tag';

export const UserFragment = {
  user: gql`
    fragment user on CurrentUser {
      id
      city {
        id
        name
        locationType
        parent {
          id
          locationType
        }
      }
      cityRank
      firstName
      points
      profilePicture (resolution: "300X400>") {
        id
        filename
        url
      }
      sharedResponses(sort: created_at, sortDirection: asc) {
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
                logo (resolution : "") {
                  url
                }
              }
              responseDeadline
            }
          }
        }
      }
      rank
      stateRank
    }
  `
};

export const CurrentUser = gql`
query{
  userCurrent {
    id
    bestRank
    bestRankType
    points
    city {
      id
      name
      parent {
        id
        name
      }
    }
    cityRank
    confirmedAt
    createdAt
    email
    firstName
    lastName
    notifyForNewConsultation
    phoneNumber
    profilePicture(resolution: "") {
      id
      url
    }
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
              logo (resolution : "") {
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
