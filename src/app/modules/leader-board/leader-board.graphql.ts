import gql from 'graphql-tag';

export const UserList = gql`
  query userList($roleFilter: [UserRoles!], $locationFilter: Int, $perPage: Int, $page: Int, $sort: UserSorts, $sortDirection: SortDirections) {
    userList(roleFilter: $roleFilter, locationFilter: $locationFilter, perPage: $perPage, page: $page, sort: $sort, sortDirection: $sortDirection) {
      data {
        id
        firstName
        points
        profilePicture (resolution: "300X400>") {
          id
          filename
          url
        }
      }
      paging {
        currentPage
        totalItems
        totalPages
      }
    }
  }
`;
