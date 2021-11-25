import { useState } from 'react';
import { signIn } from './../services/authentication';
import { useHistory } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import styledComponents from 'styled-components';
import TextField from '@mui/material/TextField';
import LoginIcon from '@mui/icons-material/Login';

const LogInIcon = styled(LoginIcon)`
  font-size: 3em;
  color: ${(props) => props.theme.palette.secondary.main};
  margin-bottom: 0.5em;
`;

const Form = styledComponents.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: ${(props) => props.theme.palette.background.component};
  border-radius: 5px;
  width: 90%;
  height: 95%;
  padding: ${(props) => props.theme.padding.element};
  margin: ${(props) => props.theme.margin.element};
  box-shadow: ${(props) => props.theme.shadow};
`;

const Input = styled(TextField)`
  margin: 1em 0;
  width: 60%;
  @media only screen and (max-width: 600px) {
    width: 100%;
  }
  background: rgba(255, 127, 4, 0.07);
  border-radius: 5px 5px 0 0;
  .MuiFilledInput-input {
    color: ${(props) => props.theme.palette.primary.text};
  }
  .MuiInputLabel-root {
    color: ${(props) => props.theme.palette.primary.main};
  }
`;

const Title = styledComponents.h1`
  color: ${(props) => props.theme.palette.title.component};
  font-weight: bold;
  margin-bottom: 1em;
`;

const SignInForm = (props) => {
  const [inputValues, setInputValues] = useState({
    emailOrUsername: '',
    password: ''
  });

  const history = useHistory();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleFormSubmission = async (event) => {
    event.preventDefault();
    const user = await signIn(inputValues);
    props.onAuthenticationChange(user);
    history.push('/profile');
  };

  return (
    <div>
      <Form onSubmit={handleFormSubmission}>
        <LogInIcon />
        <Title>Sign In</Title>
        <Input
          variant="filled"
          label="Email or username"
          id="emailOrUsername"
          name="emailOrUsername"
          type="text"
          value={inputValues.username}
          onChange={handleInputChange}
          placeholder="Email or username"
        />
        <Input
          variant="filled"
          label="Password"
          id="password"
          name="password"
          type="password"
          value={inputValues.password}
          onChange={handleInputChange}
          placeholder="password"
        />
        <button type="submit">Submit</button>
      </Form>
    </div>
  );
};
export default SignInForm;
