import gql from 'graphql-tag';

export const ConsultationList = gql`
  query consultationList($perPage: Int, $page: Int, $statusFilter: String, $featuredFilter: Boolean) {
    consultationList(perPage: $perPage, page: $page, statusFilter: $statusFilter, featuredFilter: $featuredFilter) {
      data {
        id
        title
        createdAt
        consultationResponsesCount
        updatedAt
        responseDeadline
        ministry {
          id
          name
          coverPhoto (resolution: "350X285>") {
            id
            url
          }
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