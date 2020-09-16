import gql from 'graphql-tag';

export const SignUpMutation = gql`
	mutation authSignUp($auth: SignUp!){
    authSignUp(auth: $auth){
      accessToken
    }
  }
`;

export const CitiesSearchQuery = gql`
	query locationAutocomplete($q: String, $type: String) {
		locationAutocomplete(q: $q, type: $type){
			name
			 id
			 locationType
		 }
	}
`;

export const LocationListQuery = gql`
	query locationList($type: String) {
		locationList(type: $type){
			name
			 id
			 locationType
		 }
	}
`;

export const ConsultationDeadlineQuery = gql`
	query onsultationProfile($id: Int!) {
		consultationProfile(id: $id) {
			id
			responseDeadline
		}
	}
`;

export const AuhtAcceptInviteMutation = gql`
	mutation authAcceptInvite($auth: AcceptInvite!){
		authAcceptInvite(auth: $auth){
      		accessToken
   		}
  	}
`;




