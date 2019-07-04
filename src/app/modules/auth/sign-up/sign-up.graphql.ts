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




