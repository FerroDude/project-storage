import SignInForm from '../components/SignInForm';

const SignInView = (props) => {
  return <SignInForm onAuthenticationChange={props.onAuthenticationChange} />;
};

export default SignInView;
