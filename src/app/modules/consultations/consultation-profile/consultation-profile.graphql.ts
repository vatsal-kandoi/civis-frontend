import gql from 'graphql-tag';

export const ConsultationProfile = gql`
  query consultationProfile($id: Int!) {
    consultationProfile(id: $id) {
      id
      title
      summary
      responseDeadline
      readingTime
      responsesReadingTimes
      url
      consultationResponsesCount
      ministry {
        id
        category {
          id
          coverPhoto {
            id
            filename
            url
          }
        }
        name
        logo {
          id
          filename
          url
        }
      }
      reviewType
      satisfactionRatingDistribution
      status
      anonymousResponses {
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
            votedAs {
              id
              voteDirection
            }
          }
        }
        totalCount
      }
      sharedResponses(sort: created_at, sortDirection: desc) {
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

export const ConsultationProfileCurrentUser = gql`
  query consultationProfileCurrentUser($id: Int!) {
    consultationProfile(id: $id) {
      id
      title
      summary
      responseDeadline
      readingTime
      responsesReadingTimes
      url
      consultationResponsesCount
      ministry {
        id
        category {
          id
          coverPhoto {
            id
            filename
            url
          }
        }
        name
        logo {
          id
          filename
          url
        }
      }
      reviewType
      satisfactionRatingDistribution
      status
      respondedOn
      anonymousResponses {
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
            votedAs {
              id
              voteDirection
            }
          }
        }
        totalCount
      }
      sharedResponses(sort: templates_count, sortDirection: desc) {
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
            votedAs {
              id
              voteDirection
            }
          }
        }
        totalCount
      }
      updatedAt
      questions {
        id
        questionText
        questionType
        subQuestions {
          id
          questionText
        }
      }
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

export const VoteDeleteQuery = gql `
  mutation voteDelete($consultationResponseId : Int!) {
    voteDelete(consultationResponseId : $consultationResponseId )
  }
`

export const SubmitResponseQuery = gql`
  mutation consultationResponseCreate($consultationResponse: ConsultationResponseCreateInput!){
    consultationResponseCreate(consultationResponse: $consultationResponse){
      id
      points
      user {
        id
        firstName
      }
      consultation {
        id
        title
        respondedOn
        anonymousResponses {
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
              votedAs {
                id
                voteDirection
              }
            }
          }
          totalCount
        }
        sharedResponses(sort: templates_count, sortDirection: desc) {
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
              votedAs {
                id
                voteDirection
              }
            }
          }
          totalCount
        }
        questions {
          id
          questionText
          questionType
          subQuestions {
            id
            questionText
          }
        }
      }
    }
  }
`;

export const ConsultationAnalysisQuery = gql`
  query consultationAnalysis($id: Int!) {
    consultationAnalysis(id: $id)
  }
`;



