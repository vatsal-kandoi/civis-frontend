import gql from 'graphql-tag';

const CitiesSearchQuery = gql`
	query locationAutocomplete($q: String, $type: String) {
		locationAutocomplete(q: $q, type: $type){
			name
			 id
			 locationType
		 }
	}
`;

export default CitiesSearchQuery;