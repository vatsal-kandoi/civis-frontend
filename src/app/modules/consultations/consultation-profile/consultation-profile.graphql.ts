import gql from 'graphql-tag';

export const ConsultationProfile = gql`
  query consultationProfile($id: Int!) {
    consultationProfile(id: $id) {
      id
      title
      summary
      responseDeadline
      url
      ministry {
        id
        name
        coverPhoto {
          id
          filename
          url
        }
        logo {
          id
          filename
          url
        }
      }
      responses {
        edges {
          node {
            id
            responseText
            user {
              id
              firstName
            }
          }
        }
        totalCount
      }
      updatedAt
    }
  }
`