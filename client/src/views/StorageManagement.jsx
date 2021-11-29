import { useState, useEffect } from 'react';
import FileUpload from '../components/FileUpload';
import PhotoGallery from '../components/PhotoGallery';
import { editStorage, getStorage, deleteStorage } from '../services/storage';
import { useHistory } from 'react-router-dom';
import { uploadMultipleFiles } from '../services/fileupload';
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

  .MuiFormHelperText-root {
    color: ${(props) => props.theme.palette.primary.text};
    margin: 0;
    background: ${(props) => props.theme.palette.background.component};
    font-size: 0.8em;
  }
`;

const Buttons = styledComponents.div`
  width: 60%;
  display: flex;
  justify-content: space-between;
  @media only screen and (max-width: 600px) {
    flex-direction: column;
    width: 100%;
  }
`;

const Button = styledComponents.button`
  @media only screen and (max-width: 600px) {
    padding: 1em 3em;
  }
`;

const Title = styledComponents.h1`
  color: ${(props) => props.theme.palette.title.component};
  font-weight: bold;
  margin-bottom: 0.5em;
`;

const Subtitle = styledComponents.h3`
  color: ${(props) => props.theme.palette.title.subtitle};
  margin: 1em 0 1em 0;
`;

const StorageManagementView = (props) => {
  const [storage, setStorage] = useState(null);
  const [files, setFiles] = useState([]);
  const history = useHistory();
  const { id } = props.match.params;

  useEffect(() => {
    const fetchStorage = async () => {
      const storage = await getStorage(id);
      setStorage(storage);
    };
    fetchStorage();
  }, [id]);

  const handleFormSubmission = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        formData.append('pictures', file);
      }
      const gallery = await uploadMultipleFiles(formData);
      await editStorage(storage._id, { ...storage, gallery });
      console.log('Storage updated');
      history.push('/storage/list');
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setStorage({ ...storage, [name]: value });
  };

  const handleGalleryChange = (files) => {
    setFiles(files);
  };

  const handleStorageDeletion = async () => {
    await deleteStorage(storage._id);
    history.push('/');
  };

  return (
    storage && (
      <div>
        <PhotoGallery images={storage.gallery} />
        <Form onSubmit={handleFormSubmission}>
          <Title>Manage your storage</Title>
          <FileUpload type="multiple" onPickFile={handleGalleryChange} />
          <Input
            variant="filled"
            label="Name"
            id="input-name"
            type="text"
            placeholder="Name"
            name="name"
            value={storage.name}
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
              500 - storage.description.length
            } characters remaining.`}
            value={storage.description}
            onChange={handleInputChange}
            inputProps={{
              maxLength: '500'
            }}
          />
          <Input
            variant="filled"
            label="Price"
            id="input-storage-price"
            type="number"
            placeholder="Price"
            name="price"
            value={storage.price}
            onChange={handleInputChange}
          />
          <Subtitle>Storage space size</Subtitle>
          <Input
            variant="filled"
            label="Width"
            id="input-storage-width"
            type="text"
            placeholder="Width"
            name="width"
            value={storage.width}
            onChange={handleInputChange}
          />
          <Input
            variant="filled"
            label="Length"
            id="input-storage-length"
            type="text"
            placeholder="Length"
            name="length"
            value={storage.length}
            onChange={handleInputChange}
          />
          <Input
            variant="filled"
            label="Total area"
            id="input-storage-area"
            type="text"
            name="area"
            value={`${storage.length * storage.width} `}
          />
          <Buttons>
            <Button>Save storage</Button>
            <Button onClick={handleStorageDeletion}>Delete storage</Button>
          </Buttons>
        </Form>
      </div>
    )
  );
};
export default StorageManagementView;
