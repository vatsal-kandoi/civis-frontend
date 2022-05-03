import gql from 'graphql-tag';

const ResendEmailConfirmationMutation = gql`
mutation resendEmail($email: String!) {
  authResendVerificationEmail(email: $email)
}
`;

export default ResendEmailConfirmationMutation;