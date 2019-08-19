import gql from 'graphql-tag';

export const ConsultationProfile = gql`
  query consultationProfile($id: Int!) {
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
      sharedResponses(sort: created_at, sortDirection: desc) {
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

export const ConsultationProfileCurrentUser = gql`
  query consultationProfileCurrentUser($id: Int!) {
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
      respondedOn
      sharedResponses(sort: created_at, sortDirection: desc) {
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
            votedAs {
              id
              voteDirection
            }
          }
        }
        totalCount
      }
      updatedAt
    }
  }
`

export const VoteCreateQuery = gql `
  mutation voteCreate($consultationResponseVote: VoteCreateInput!) {
    voteCreate(consultationResponseVote: $consultationResponseVote) {
      id
      voteDirection
    }
  }
`

export const SubmitResponseQuery = gql`
  mutation consultationResponseCreate($consultationResponse: ConsultationResponseCreateInput!){
    consultationResponseCreate(consultationResponse: $consultationResponse){
      id
      user {
        firstName
      }
      consultation {
        title
        respondedOn
        sharedResponses(sort: created_at, sortDirection: desc) {
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
              votedAs {
                id
                voteDirection
              }
            }
          }
          totalCount
        }
      }
    }
  }
`


