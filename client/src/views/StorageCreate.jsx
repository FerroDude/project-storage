import { useState } from 'react';
import {} from '../services/storage';

const StorageCreateView = () => {
  const [inputValues, setInputValues] = useState({
    name: '',
    description: '',
    location: '',
    price: '',
    width: '',
    length: ''
  });

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  return (
    <div>
      <form>
        <label htmlFor="input-storage-name">Storage name</label>
        <input
          id="input-storage-name"
          type="text"
          placeholder="Name"
          name="name"
          value={inputValues.name}
          onChange={handleInputChange}
        />
        <label htmlFor="input-storage-name">Description</label>
        <textarea
          id="input-storage-description"
          type="text"
          placeholder="Description (max. X characters)"
          name="description"
          value={inputValues.description}
          onChange={handleInputChange}
        />
        <label htmlFor="input-storage-name">Location</label>
        <input
          id="input-storage-location"
          type="text"
          placeholder="Name"
          name="location"
          value={inputValues.location}
          onChange={handleInputChange}
        />
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
        <label htmlFor="input-storage-price">Width</label>
        <input
          id="input-storage-width"
          type="text"
          placeholder="Width"
          name="width"
          value={inputValues.width}
          onChange={handleInputChange}
        />
        <label htmlFor="input-storage-price">Length</label>
        <input
          id="input-storage-length"
          type="text"
          placeholder="Length"
          name="length"
          value={inputValues.length}
          onChange={handleInputChange}
        />
        <p>Area: {inputValues.width * inputValues.length}</p>
        <button onClick={handleSubmit}>Save storage</button>
      </form>
    </div>
  );
};

export default StorageCreateView;
