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