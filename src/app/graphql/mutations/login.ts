import gql from 'graphql-tag';

const LoginMutation = gql`
mutation LoginMutation($auth: Login!) {
  authLogin(auth: $auth) {
    accessToken
  }
}
`;

export default LoginMutation;




