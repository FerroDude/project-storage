import SignInForm from '../components/SignInForm';

const SignInView = (props) => {
  return (
    <div>
      <SignInForm authenticationChange={props.authenticationChange} />
    </div>
  );
};

export default SignInView;
