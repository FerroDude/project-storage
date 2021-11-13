import SignUpForm from './../components/SignUpForm';

const SignUpView = (props) => {
  return (
    <div className="sign-up-view">
      <h1>Sign Up</h1>
      <SignUpForm onAuthenticationChange={props.onAuthenticationChange} />
    </div>
  );
};

export default SignUpView;
