import gql from 'graphql-tag';

export const ResponseProfileQuery = gql`
    query consultationResponseProfile($id: Int!){
        consultationResponseProfile(id: $id){
            id
            responseText
            consultation {
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
                  totalCount
                }
                updatedAt
            }
        }
    }
`