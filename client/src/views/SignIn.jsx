import SignInForm from '../components/SignInForm';

const SignInView = (props) => {
  return (
    <div>
      <h1>Hello Sign in</h1>
      <SignInForm onAuthenticationChange={props.onAuthenticationChange} />
    </div>
  );
};

export default SignInView;
