import gql from 'graphql-tag';

export const ConsultationResponseList = gql`
  query consultationResponseList($sort: ConsultationResponseSorts!, $sortDirection: SortDirections) {
    consultationResponseList(sort: $sort, sortDirection: $sortDirection){
      data {
        id
        responseText
        user {
          id
          firstName
          profilePicture {
            id
            url
          }
        }
      }
      paging {
        currentPage
        totalPages
        totalItems
      }
    }
  }
`
export const ImpactStats = gql`
  query ImpactStats {
    impactStats
  }
`