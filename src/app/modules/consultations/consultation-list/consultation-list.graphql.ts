import gql from 'graphql-tag';

export const ConsultationList = gql`
  query consultationList($perPage: Int, $page: Int, $statusFilter: String, $featuredFilter: Boolean, $sort: ConsultationSorts, $sortDirection: SortDirections ) {
    consultationList(perPage: $perPage, page: $page, statusFilter: $statusFilter, featuredFilter: $featuredFilter, sort: $sort, sortDirection: $sortDirection) {
      data {
        id
        title
        createdAt
        consultationResponsesCount
        updatedAt
        responseDeadline
        ministry {
          id
          category {
            id
            coverPhoto (resolution: "350X285>") {
              id
              filename
              url
            }
          }
          name
        }
        status
      }
      paging {
        currentPage
        totalPages
        totalItems
      }
    }
  }
`