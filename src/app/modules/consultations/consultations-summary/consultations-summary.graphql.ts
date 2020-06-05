import gql from 'graphql-tag';

export const ConsultationProfileQuery = gql`
  query consultationProfile($id: Int!, $responseToken: String!) {
    consultationProfile(id: $id) {
      id
      title
      summary
      page {
        id
        components
      }
      responseDeadline
      url
      consultationResponsesCount
      questions {
        id
        questionText
        questionType
        subQuestions {
          id
          questionText
        }
      }
      ministry {
        id
        name
        category {
          id
          coverPhoto {
            id
            filename
            url
          }
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
            answers
            downVoteCount
            responseText
            templatesCount
            upVoteCount
            user {
              id
              firstName
              profilePicture(resolution: "") {
                id
                url
              }
            }
          }
        }
        totalCount
      }
      updatedAt
    }
  }
`