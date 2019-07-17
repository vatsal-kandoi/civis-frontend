import gql from 'graphql-tag';

export const ConsultationList = gql`
  query consultationList($perPage: Int, $page: Int) {
    consultationList(perPage: $perPage, page: $page) {
      data {
        id
        title
        createdAt
        updatedAt
        ministry {
          id
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