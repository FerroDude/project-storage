import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { rentStorage, getStorage } from '../services/storage';
import PhotoGallery from '../components/PhotoGallery';
import PaymentView from '../views/Payment';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import PersonIcon from '@mui/icons-material/Person';
import {
  createSubscription,
  cancelSubscription
} from '../services/subscription';
import styledComponents from 'styled-components';
import { styled } from '@mui/material/styles';

const Storage = styledComponents.div`
  background: ${(props) => props.theme.palette.background.component};
  border-radius: 5px;
  width: 90%;
  height: 95%;
  padding: ${(props) => props.theme.padding.element};
  margin: ${(props) => props.theme.margin.element};
  box-shadow: ${(props) => props.theme.shadow};
`;

const Info = styledComponents.div`
  color: ${(props) => props.theme.palette.primary.text};
`;

const Owner = styledComponents.div`
  display: flex;
  align-items: center;
`;

const Location = styledComponents.div`
  display: flex;
  align-items: center;
`;

const Rating = styledComponents.div`
  display: flex;
  align-items: center;
`;

const OwnerIcon = styled(PersonIcon)`
  color: ${(props) => props.theme.palette.secondary.main};
  margin: ${(props) => props.theme.margin.icon};
`;

const LocationIcon = styled(LocationOnIcon)`
  color: ${(props) => props.theme.palette.secondary.main};
  margin: ${(props) => props.theme.margin.icon};
`;

const RatingIcon = styled(StarIcon)`
  color: ${(props) => props.theme.palette.secondary.main};
  margin: ${(props) => props.theme.margin.icon};
`;

const Title = styledComponents.h3`
  color: ${(props) => props.theme.palette.title.component};
  font-weight: bold;
`;

const Subtitle = styledComponents.h4`
  color: ${(props) => props.theme.palette.title.subtitle};
  font-weight: bold;
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
      <Storage>
        <PhotoGallery images={storage.gallery} />
        <Info>
          <Title>{storage.name}</Title>
          <p>{storage.description}</p>
          <Owner>
            <OwnerIcon />
            Pekka Tiitinen
          </Owner>
          <Location>
            <LocationIcon />
            Madrid
          </Location>
          <Rating>
            <RatingIcon />
            4.4
          </Rating>
          <Subtitle>Dimensions:</Subtitle>
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
      </Storage>
    )
  );
};

export default StorageView;
