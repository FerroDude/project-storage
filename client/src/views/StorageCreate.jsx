import { useState } from 'react';
import { createStorage } from '../services/storage';
import AddressSearch from '../components/AddressSearch';
import FileUpload from '../components/FileUpload';

const StorageCreateView = () => {
  const [inputValues, setInputValues] = useState({
    name: '',
    description: '',
    address: '',
    price: '',
    width: '',
    length: '',
    gallery: []
  });
  console.log(inputValues);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createStorage(inputValues);
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

  return (
    <div>
      <form>
        <FileUpload type="multiple" onPickFile={handleGalleryChange} />
        <label htmlFor="input-storage-name">Storage name</label>
        <input
          id="input-storage-name"
          type="text"
          placeholder="Name"
          name="name"
          value={inputValues.name}
          onChange={handleInputChange}
        />
        <div>
          <label htmlFor="input-storage-description">Description</label>
          <textarea
            id="input-storage-description"
            type="text"
            placeholder="Description (max. 160 characters)"
            name="description"
            value={inputValues.description}
            onChange={handleInputChange}
            maxLength="160"
          />
          <p>{160 - inputValues.description.length} characters remaining.</p>
        </div>
        <AddressSearch />
        <label htmlFor="input-storage-price">Price</label>
        <input
          id="input-storage-price"
          type="text"
          placeholder="Price"
          name="price"
          value={inputValues.price}
          onChange={handleInputChange}
        />
        <p>Storage space size</p>
        <label htmlFor="input-storage-width">Width</label>
        <input
          id="input-storage-width"
          type="text"
          placeholder="Width"
          name="width"
          value={inputValues.width}
          onChange={handleInputChange}
        />
        <label htmlFor="input-storage-length">Length</label>
        <input
          id="input-storage-length"
          type="text"
          placeholder="Length"
          name="length"
          value={inputValues.length}
          onChange={handleInputChange}
        />
        <p>Total area: {inputValues.width * inputValues.length}</p>
        <button onClick={handleSubmit}>Save storage</button>
      </form>
    </div>
  );
};

export default StorageCreateView;
