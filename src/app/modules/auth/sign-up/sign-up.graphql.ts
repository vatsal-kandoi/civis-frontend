import gql from 'graphql-tag';

export const SignUpMutation = gql`
	mutation authSignUp($auth: SignUp!){
    authSignUp(auth: $auth){
      accessToken
    }
  }
`;

export const CitiesSearchQuery = gql`
	query locationAutocomplete($q: String) {
		locationAutocomplete(q: $q){
			name
			 id
			 locationType
		 }
	}
`;

export const LocationListQuery = gql`
	query locationList {
		locationList{
			name
			 id
			 locationType
		 }
	}
`;




