import { useState, useEffect } from 'react';
import { rentStorage, getStorage } from '../services/storage';
import PhotoGallery from '../components/PhotoGallery';

const StorageView = (props) => {
  const [storage, setStorage] = useState(null);

  const { user } = props;
  const { id } = props.match.params;

  useEffect(() => {
    const fetchStorage = async () => {
      const storage = await getStorage(id);
      setStorage(storage);
    };
    fetchStorage();
  }, [id]);

  const handleRent = async () => {
    storage.isRented = true;
    storage.renter = user._id;

    setStorage({ ...storage });
    console.log(storage);
    await rentStorage(storage);
  };

  // setStorage({ ...storage, isRented: true, renter: user._id }); PREVIOUS WAY

  return (
    storage && (
      <div>
        <PhotoGallery images={storage.gallery} />
        <strong>Name</strong>
        <span>{storage.name}</span>
        <br />
        <strong>Description</strong>
        <span>{storage.description}</span>
        <br />
        <strong>Location:</strong>
        <span></span>
        <br />
        <strong>Size:</strong>
        <span>Width: {storage.width}</span>
        <span>Length: {storage.length}</span>
        <span>Area: {storage.width * storage.length}</span>
        <br />
        <strong>Location:</strong>
        <span></span>
        <br />
        {(!storage.isRented && (
          <button onClick={handleRent}>Rent this storage!</button>
        )) || <em>Not available!</em>}
      </div>
    )
  );
};

export default StorageView;
