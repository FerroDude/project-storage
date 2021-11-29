import { useState } from 'react';
import { createStorage } from '../services/storage';
import AddressSearch from '../components/AddressSearch';
import FileUpload from '../components/FileUpload';
import { uploadMultipleFiles } from '../services/fileupload';
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
  z-index: 1;
  @media only screen and (max-width: 600px) {
    width: 100%;
  }
  .MuiFilledInput-input {
    color: ${(props) => props.theme.palette.primary.text};
  }
  .MuiInputLabel-root {
    color: ${(props) => props.theme.palette.primary.main};
  }

  .MuiFormHelperText-root {
    color: ${(props) => props.theme.palette.primary.text};
    margin: 0;
    background: ${(props) => props.theme.palette.background.component};
    font-size: 0.8em;
  }
`;

const Title = styledComponents.h1`
  color: ${(props) => props.theme.palette.title.component};
  font-weight: bold;
  margin-bottom: 0.5em;
`;

const StorageCreateView = () => {
  const [inputValues, setInputValues] = useState({
    name: '',
    description: '',
    coordinates: null,
    price: null,
    width: '',
    length: '',
    gallery: [],
    rentDates: []
  });

  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      for (let i = 0; i < inputValues.gallery.length; i++) {
        const file = inputValues.gallery[i];
        formData.append('pictures', file);
      }
      const gallery = await uploadMultipleFiles(formData);
      const storage = await createStorage({ ...inputValues, gallery });
      history.push(`/storage/${storage._id}`);
      console.log('Storage created');
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleGalleryChange = (files) => {
    setInputValues({ ...inputValues, gallery: files });
  };

  const handleCoordinatesChange = (coordinates) => {
    setInputValues({ ...inputValues, coordinates });
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Title>Create a new storage</Title>
        <FileUpload type="multiple" onPickFile={handleGalleryChange} />
        <Input
          variant="filled"
          label="Storage name"
          id="input-storage-name"
          type="text"
          name="name"
          value={inputValues.name}
          onChange={handleInputChange}
        />
        <Input
          multiline
          variant="filled"
          label="Description (max. 500 characters)"
          minRows="5"
          id="input-storage-description"
          type="text"
          name="description"
          helperText={`${
            500 - inputValues.description.length
          } characters remaining.`}
          value={inputValues.description}
          onChange={handleInputChange}
          inputProps={{
            maxLength: '500'
          }}
        />
        <AddressSearch onCoordinatesChange={handleCoordinatesChange} />
        <Input
          variant="filled"
          label="Price"
          id="input-storage-price"
          type="number"
          name="price"
          value={inputValues.price}
          onChange={handleInputChange}
        />
        <Subtitle>Storage space size</Subtitle>
        <Input
          variant="filled"
          label="Width"
          id="input-storage-width"
          type="text"
          name="width"
          value={inputValues.width}
          onChange={handleInputChange}
        />
        <Input
          variant="filled"
          label="Length"
          id="input-storage-length"
          type="text"
          name="length"
          value={inputValues.length}
          onChange={handleInputChange}
        />
        <Input
          variant="filled"
          label="Total area"
          id="input-storage-area"
          type="text"
          name="area"
          value={`${inputValues.length * inputValues.width} `}
        />
        <button>Save storage</button>
      </Form>
    </div>
  );
};

export default StorageCreateView;
