import gql from 'graphql-tag';

export const CurrentUser = gql`
  query CurrentUser {
    userCurrent {
        city {
            id
            locationType {
                city
                state
            }
            name
        }
        createdAt
        email
        firstName
        id
        lastName
        notifyForNewConsultation
    }
  }
`;