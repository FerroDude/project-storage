import { useState, useEffect } from 'react';
import PaymentForm from '../components/PaymentForm';
import { loadSubscription } from '../services/subscription';

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
        <h2>Please fill in your credit card details below</h2>
        <PaymentForm onConfirm={onRent} />
      </div>
    )) ||
    null
  );
};

export default PaymentView;
