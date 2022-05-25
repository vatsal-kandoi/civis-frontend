import gql from 'graphql-tag';

const LocationListQuery = gql`
	query locationList($type: String) {
		locationList(type: $type){
			name
			 id
			 locationType
		 }
	}
`;

export default LocationListQuery;






