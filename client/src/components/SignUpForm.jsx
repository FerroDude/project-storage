import { useState } from 'react';
import { signUp } from './../services/authentication';
import { useHistory } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import styledComponents from 'styled-components';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

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
  @media only screen and (max-width: 600px) {
    width: 100%;
    background: transparent;
    box-shadow: none;
    margin: 0;
  }
`;

const Input = styled(TextField)`
  margin: 1em 0;
  width: 60%;
  background: rgba(255, 127, 4, 0.07);
  border-radius: 5px 5px 0 0;
  @media only screen and (max-width: 600px) {
    width: 100%;
  }
  .MuiFilledInput-input {
    color: ${(props) => props.theme.palette.primary.text};
  }
  .MuiInputLabel-root {
    color: ${(props) => props.theme.palette.primary.main};
  }
`;

const Option = styled(MenuItem)`
  padding: 1em;
  background: ${(props) => props.theme.palette.background.dark};
  color: ${(props) => props.theme.palette.primary.text};
`;

const Names = styledComponents.div`
  display: flex;
  gap: 6em;
  width: 60%;
  @media only screen and (max-width: 600px) {
    flex-direction: column;
    gap: 0;
    width: 100%;
  }
  justify-content: space-between;
`;

const Title = styledComponents.h1`
  color: ${(props) => props.theme.palette.title.component};
  font-weight: bold;
  margin-bottom: 1em;
`;

const SignUpView = (props) => {
  const [inputValues, setInputValues] = useState({
    username: '',
    fName: '',
    lName: '',
    email: '',
    password: '',
    phoneNumber: '',
    role: ''
  });
  const history = useHistory();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleFormSubmission = async (event) => {
    event.preventDefault();
    try {
      const user = await signUp(inputValues);
      props.onAuthenticationChange(user);
    } catch (error) {
      console.log(error, 'Api call for signup failed');
    }
    history.push('/profile');
  };

  return (
    <div>
      <Form onSubmit={handleFormSubmission}>
        <Title>Sign Up</Title>
        <Names>
          <Input
            variant="filled"
            label="First name"
            id="input-fName"
            type="text"
            name="fName"
            value={inputValues.fName}
            onChange={handleInputChange}
            required
          />
          <Input
            variant="filled"
            label="Last name"
            id="input-lName"
            type="text"
            name="lName"
            value={inputValues.lName}
            onChange={handleInputChange}
            required
          />
        </Names>
        <Input
          variant="filled"
          label="Username"
          id="input-username"
          type="text"
          name="username"
          value={inputValues.username}
          onChange={handleInputChange}
          required
        />
        <Input
          variant="filled"
          label="Email address"
          id="input-email"
          type="email"
          name="email"
          value={inputValues.email}
          onChange={handleInputChange}
          required
        />
        <Input
          variant="filled"
          label="Password"
          id="input-password"
          type="password"
          name="password"
          value={inputValues.password}
          onChange={handleInputChange}
          required
        />
        <Input
          variant="filled"
          label="Phone number"
          id="input-phone"
          type="text"
          name="phoneNumber"
          value={inputValues.phoneNumber}
          onChange={handleInputChange}
          required
        />
        <Input
          select
          defaultValue="Select a role"
          label="Role"
          id="input-role"
          name="role"
          value={inputValues.role}
          onChange={handleInputChange}
          required
        >
          <Option value="-">-</Option>
          <Option value="tenant">Tenant</Option>
          <Option value="landlord">Landlord</Option>
        </Input>
        <button type="submit">Sign Up</button>
      </Form>
    </div>
  );
};

export default SignUpView;
