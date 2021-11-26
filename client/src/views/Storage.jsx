import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { rentStorage, getStorage } from '../services/storage';
import PhotoGallery from '../components/PhotoGallery';
import PaymentView from '../views/Payment';
import ReactCalendar from '../components/Calendar';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import {
  createSubscription,
  cancelSubscription
} from '../services/subscription';
import styledComponents from 'styled-components';
import { styled } from '@mui/material/styles';

const Info = styledComponents.div`
  color: ${(props) => props.theme.palette.primary.text};
`;

const Location = styledComponents.div`
    display: flex;
    align-items: center;
`;

const Rating = styledComponents.div`
    display: flex;
    align-items: center;
`;

const LocationIcon = styled(LocationOnIcon)`
  color: ${(props) => props.theme.palette.secondary.main};
`;

const RatingIcon = styled(StarIcon)`
  color: ${(props) => props.theme.palette.secondary.main};
`;

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

  const calculateDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

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
        <Info>
          <h3>{storage.name}</h3>
          <p>{storage.description}</p>
          <Location>
            <LocationIcon />
            Madrid
          </Location>
          <Rating>
            <RatingIcon />
            4.4
          </Rating>
          <strong>Dimensions:</strong>
          <ul>
            <li>Width: {storage.width}</li>
            <li>Length: {storage.length}</li>
            <li>Area: {storage.width * storage.length}</li>
          </ul>
        </Info>
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
