import gql from 'graphql-tag';

export const MinistryAutocompleteQuery = gql`
    query ministryAutocomplete ($q: String) {
        ministryAutocomplete (q: $q) {
            name
            id
            level
        }
    }
`

export const CreateConsultationMutation = gql`
    mutation consultationCreate($consultation: ConsultationCreateInput!) {
        consultationCreate(consultation: $consultation) {
        id
        createdBy {
            firstName
        }
        }
    }
`

export const MinistryCreateMutation = gql `
    mutation ministryCreate($ministry: Create!) {
        ministryCreate(ministry: $ministry) {
        id
        name
        level
        logo {
            url
        }
        }
    }
`

export const ConstantForTypeQuery = gql`
    query constantForType($constantType: String){
        constantForType(constantType: $constantType){
        id
        name
        }
    }
`;

export const CategoryListQuery = gql`
query categoryList($sort: CategorySort, $sortDirection: SortDirections){
    categoryList(sort: $sort, sortDirection: $sortDirection){
    data {
        id
        name
        coverPhoto {
        filename
        url
        }
    }
    paging {
        totalItems
    }
    }
}
`;
