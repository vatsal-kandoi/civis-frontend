import gql from 'graphql-tag';

export const ConsultationProfileQuery = gql`
  query consultationProfile($id: Int!, $responseToken: String!) {
    consultationProfile(id: $id) {
      id
      title
      summary
      responseDeadline
      url
      consultationResponsesCount
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
      satisfactionRatingDistribution
      responses(sort: created_at, sortDirection: desc, responseToken: $responseToken) {
        edges {
          node {
            id
            downVoteCount
            responseText
            templatesCount
            upVoteCount
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