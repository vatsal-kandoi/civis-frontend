import gql from 'graphql-tag';

export const ConsultationList = gql`
  query consultationList($perPage: Int, $page: Int, $statusFilter: String) {
    consultationList(perPage: $perPage, page: $page, statusFilter: $statusFilter) {
      data {
        id
        title
        createdAt
        updatedAt
        responseDeadline
        ministry {
          id
          name
          coverPhoto {
            id
            url
          }
        }
        status
        responses {
          totalCount
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