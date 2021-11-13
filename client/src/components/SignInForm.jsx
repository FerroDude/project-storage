import { useState } from 'react';
import { signIn } from './../services/authentication';

//state not used in this component warning test

const SignInForm = (props) => {
  const [inputValues, setInputValues] = useState({
    emailOrusername: '',
    password: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleFormSubmission = async (event) => {
    event.preventDefault();
    const user = await signIn(inputValues);
    props.authenticationChange(user);
  };

  return (
    <div>
      <form onSubmit={handleFormSubmission}>
        <label htmlFor="emailOrUsername">Email or username</label>
        <input
          id="emailOrUsername"
          name="emailOrUsername"
          type="text"
          value={inputValues.username}
          onChange={handleInputChange}
          placeholder="Email or username"
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={inputValues.password}
          onChange={handleInputChange}
          placeholder="password"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
export default SignInForm;
