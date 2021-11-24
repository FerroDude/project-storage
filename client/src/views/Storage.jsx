import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { rentStorage, getStorage } from '../services/storage';
import PhotoGallery from '../components/PhotoGallery';
import PaymentView from '../views/Payment';
import {
  createSubscription,
  cancelSubscription
} from '../services/subscription';

const StorageView = (props) => {
  const [storage, setStorage] = useState(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const history = useHistory();

  const { user } = props;
  const { id } = props.match.params;

  useEffect(() => {
    const fetchStorage = async () => {
      const storage = await getStorage(id);
      setStorage(storage);
    };
    fetchStorage();
  }, [id]);

  const handleRent = async (paymentMethodToken) => {
    try {
      const duration = 55;
      await createSubscription({
        paymentMethodToken,
        storage: storage._id,
        duration
      });

      storage.isRented = true;
      storage.renter = user._id;

      setStorage({ ...storage });
      await rentStorage(storage);
      history.push(`/confirmation/subscribed/${storage._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnrent = async () => {
    try {
      await cancelSubscription(storage._id);
      storage.isRented = false;
      storage.renter = null;
      setStorage({ ...storage });
      await rentStorage(storage);
      history.push(`/confirmation/unsubscribed/${storage._id}`);
    } catch (error) {
      console.log(error);
    }
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
        {user && user.role === 'tenant' && (
          <div>
            {(!storage.isRented && (
              <button onClick={handleShowPaymentForm}>
                Rent this storage!
              </button>
            )) ||
              (storage.renter === user._id && (
                <button onClick={handleUnrent}>Return this storage</button>
              )) || <em>Not available!</em>}

            {showPaymentForm && (
              <PaymentView onRent={handleRent} storage={storage} />
            )}
          </div>
        )}
      </div>
    )
  );
};

export default StorageView;
