import { useState, useEffect } from 'react';
import FileUpload from '../components/FileUpload';
import PhotoGallery from '../components/PhotoGallery';
import { editStorage, getStorage, deleteStorage } from '../services/storage';
import { useHistory } from 'react-router-dom';
import { uploadMultipleFiles } from '../services/fileupload';

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
          <label htmlFor="input-username">Name</label>
          <input
            id="input-name"
            type="text"
            placeholder="Name"
            name="name"
            value={storage.name}
            onChange={handleInputChange}
          />
          <label htmlFor="input-storage-description">Description</label>
          <textarea
            id="input-storage-description"
            type="text"
            placeholder="Description (max. 160 characters)"
            name="description"
            value={storage.description}
            onChange={handleInputChange}
            maxLength="160"
          />
          <p>{160 - storage.description.length} characters remaining.</p>
          <label htmlFor="input-storage-price">Price</label>
          <input
            id="input-storage-price"
            type="number"
            placeholder="Price"
            name="price"
            value={storage.price}
            onChange={handleInputChange}
          />
          <p>Storage space size</p>
          <label htmlFor="input-storage-width">Width</label>
          <input
            id="input-storage-width"
            type="text"
            placeholder="Width"
            name="width"
            value={storage.width}
            onChange={handleInputChange}
          />
          <label htmlFor="input-storage-length">Length</label>
          <input
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
