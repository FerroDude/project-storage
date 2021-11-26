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

  .MuiFormHelperText-root {
    color: ${(props) => props.theme.palette.primary.text};
    margin: 0;
    background: ${(props) => props.theme.palette.background.component};
    font-size: 1em;
  }
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
        <button onClick={handleStorageDeletion}>Delete storage</button>
        <PhotoGallery images={storage.gallery} />
        <form onSubmit={handleFormSubmission}>
          <FileUpload type="multiple" onPickFile={handleGalleryChange} />
          <h3>Personal details</h3>
          <Input
            label="Name"
            id="input-name"
            type="text"
            placeholder="Name"
            name="name"
            value={storage.name}
            onChange={handleInputChange}
          />
          <Input
            label="Description"
            id="input-storage-description"
            type="text"
            placeholder="Description (max. 160 characters)"
            name="description"
            value={storage.description}
            onChange={handleInputChange}
            maxLength="160"
          />
          <p>{160 - storage.description.length} characters remaining.</p>
          <Input
            label="Price"
            id="input-storage-price"
            type="number"
            placeholder="Price"
            name="price"
            value={storage.price}
            onChange={handleInputChange}
          />
          <p>Storage space size</p>
          <Input
            label="Width"
            id="input-storage-width"
            type="text"
            placeholder="Width"
            name="width"
            value={storage.width}
            onChange={handleInputChange}
          />
          <Input
            label="Length"
            id="input-storage-length"
            type="text"
            placeholder="Length"
            name="length"
            value={storage.length}
            onChange={handleInputChange}
          />
          <p>Total area: {storage.width * storage.length}</p>
          <button>Save storage</button>
        </form>
      </div>
    )
  );
};
export default StorageManagementView;
