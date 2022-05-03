import gql from 'graphql-tag';

const SignUpMutation = gql`
	mutation authSignUp($auth: SignUp!){
    authSignUp(auth: $auth){
      accessToken
    }
  }
`;

export default SignUpMutation;

