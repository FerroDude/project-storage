import { useState, useEffect } from 'react';
import { rentStorage, getStorage } from '../services/storage';
import PhotoGallery from '../components/PhotoGallery';
import PaymentView from '../views/Payment';
import ReactCalendar from '../components/Calendar';

const StorageView = (props) => {
  const [storage, setStorage] = useState(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

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

  const handleUnrent = async () => {
    storage.isRented = false;
    storage.renter = null;
    setStorage({ ...storage });
    await rentStorage(storage);
  };

  const handleShowPaymentForm = () => {
    setShowPaymentForm(!showPaymentForm);
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
        <ReactCalendar />
        <br />
        {(!storage.isRented && (
          <button onClick={handleShowPaymentForm}>Rent this storage!</button>
        )) ||
          (storage.renter === user._id && (
            <button onClick={handleUnrent}>Return this storage</button>
          )) || <em>Not available!</em>}

        {showPaymentForm && <PaymentView onRent={handleRent} />}
      </div>
    )
  );
};

export default StorageView;
