import { useState } from 'react';
import { signIn } from './../services/authentication';

//state not used in this component warning test

const SignInForm = () => {
  const [inputValues, setInputValues] = useState({
    username: '',
    password: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleFormSubmission = async (event) => {
    event.preventDefault();
    const response = await signIn(inputValues);
    console.log(response);
    console.log(inputValues);
  };

  return (
    <div>
      <form onSubmit={handleFormSubmission}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          type="text"
          value={inputValues.username}
          onChange={handleInputChange}
          placeholder="username"
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
