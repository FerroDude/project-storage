import { useState, useEffect } from 'react';
import PaymentForm from '../components/PaymentForm';
import { loadSubscription } from '../services/subscription';
import styledComponents from 'styled-components';

const Subtitle = styledComponents.h3`
  margin-top: 0.5em;
  color: ${(props) => props.theme.palette.title.subtitle};
  font-weight: bold;
`;

const PaymentView = ({ onRent, storage }) => {
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    if (storage) {
      const fetchSubscription = async () => {
        const subscription = await loadSubscription(storage._id);
        setSubscription(subscription);
      };

      fetchSubscription();
    }
  }, [storage]);

  return (
    (!subscription && (
      <div>
        <Subtitle>Please fill in your credit card details below</Subtitle>
        <PaymentForm onConfirm={onRent} />
      </div>
    )) ||
    null
  );
};

export default PaymentView;
