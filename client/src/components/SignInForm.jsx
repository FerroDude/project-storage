import { useState } from 'react';
import { signIn } from './../services/authentication';
import { useHistory } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import styledComponents from 'styled-components';
import TextField from '@mui/material/TextField';
import LoginIcon from '@mui/icons-material/Login';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

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
  width: 40%;
  @media only screen and (max-width: 600px) {
    width: 100%;
    background: transparent;
    box-shadow: none;
    margin: 0;
  }
  height: 95%;
  padding: ${(props) => props.theme.padding.element};
  margin: ${(props) => props.theme.margin.element};
  box-shadow: ${(props) => props.theme.shadow};
`;

const Button = styledComponents.button`
  width: 50%;
  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;

const Input = styled(TextField)`
  margin: 1em 0;
  width: 50%;
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
  margin-bottom: 0.5em;
`;

const SignInForm = (props) => {
  const [inputValues, setInputValues] = useState({
    emailOrUsername: '',
    password: ''
  });
  const [passwordVisible, setPasswordvisible] = useState(false);

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

  const handlePasswordVisibility = () => {
    setPasswordvisible(!passwordVisible);
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
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircleIcon />
              </InputAdornment>
            )
          }}
        />
        <Input
          variant="filled"
          label="Password"
          id="password"
          name="password"
          type={(passwordVisible && 'text') || 'password'}
          value={inputValues.password}
          onChange={handleInputChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                {(passwordVisible && (
                  <VisibilityOffIcon
                    sx={{ cursor: 'pointer' }}
                    onClick={handlePasswordVisibility}
                  />
                )) || (
                  <VisibilityIcon
                    sx={{ cursor: 'pointer' }}
                    onClick={handlePasswordVisibility}
                  />
                )}
              </InputAdornment>
            )
          }}
        />
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
};
export default SignInForm;
