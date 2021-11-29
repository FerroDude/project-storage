import { useState, useEffect } from 'react';
import { loadAuthenticatedUser } from '../services/user';
import { uploadSingleFile } from '../services/fileupload';
import FileUpload from './FileUpload';
import AddressSearch from './AddressSearch';
import { useHistory } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import styledComponents from 'styled-components';
import TextField from '@mui/material/TextField';

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

const Subtitle = styledComponents.h3`
  color: ${(props) => props.theme.palette.title.subtitle};
  margin: 1em 0 1em 0;
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

const Title = styledComponents.h1`
  color: ${(props) => props.theme.palette.title.component};
  font-weight: bold;
  margin-bottom: 0.5em;
`;

const SettingsForm = ({ onEditUser }) => {
  const [user, setUser] = useState({
    username: '',
    fName: '',
    lName: '',
    email: '',
    phoneNumber: '',
    coordinates: null
  });
  const [file, setFile] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const fetchUser = async () => {
      const user = await loadAuthenticatedUser();
      setUser({
        username: user.username,
        fName: user.fName,
        lName: user.lName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        coordinates: user.coordinates
      });
    };
    fetchUser();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const setProfileImgFile = (file) => {
    setFile(file);
  };

  const handleCoordinatesChange = (coordinates) => {
    setUser({ ...user, coordinates });
  };

  const handleFormSubmission = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('profilePicture', file);
      const profilePicture = await uploadSingleFile(formData);
      await onEditUser({ ...user, profilePicture });
      history.push('/profile');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    user && (
      <div>
        <Form onSubmit={handleFormSubmission}>
          <Title>Settings</Title>
          <FileUpload type="single" onPickFile={setProfileImgFile} />
          <Subtitle>Personal details</Subtitle>
          <Input
            variant="filled"
            label="Username"
            id="input-username"
            type="text"
            placeholder="Username"
            name="username"
            value={user.username}
            onChange={handleInputChange}
          />
          <Input
            variant="filled"
            label="First name"
            id="input-fName"
            type="text"
            placeholder="First Name"
            name="fName"
            value={user.fName}
            onChange={handleInputChange}
          />
          <Input
            variant="filled"
            label="Last name"
            id="input-lName"
            type="text"
            placeholder="Last name"
            name="lName"
            value={user.lName}
            onChange={handleInputChange}
          />
          <Subtitle>Contact information</Subtitle>
          <Input
            variant="filled"
            label="Email"
            id="input-email"
            type="email"
            placeholder="Your Email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
          />
          <Input
            variant="filled"
            label="Phone number"
            id="input-phone"
            type="text"
            placeholder="Your Phone Number"
            name="phoneNumber"
            value={user.phoneNumber}
            onChange={handleInputChange}
          />
          <Subtitle>Location</Subtitle>
          <AddressSearch onCoordinatesChange={handleCoordinatesChange} />
          <button type="submit">Save</button>
        </Form>
      </div>
    )
  );
};

export default SettingsForm;
