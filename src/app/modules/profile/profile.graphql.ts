import gql from 'graphql-tag';

export const CurrentUserUpdate  = gql`
    mutation currentUserUpdate($user: CurrentUserUpdateInput!) {
        currentUserUpdate(user: $user) {
            id
            firstName
            lastName
            phoneNumber
        }
    }
`
