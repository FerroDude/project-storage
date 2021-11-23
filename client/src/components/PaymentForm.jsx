import { useEffect, useState } from 'react';
import {
  Elements,
  ElementsConsumer,
  CardElement
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4'
      }
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a'
    }
  }
};

const NonInjectedPaymentForm = (props) => {
  const handleFormSubmission = async (event) => {
    event.preventDefault();

    const { stripe, elements } = props;
    const cardElement = elements.getElement(CardElement);

    const result = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement
    });

    try {
      const { paymentMethod, error } = result;
      if (error) {
        alert('There was an error processing your payment method details.');
        console.log(error);
      } else if (paymentMethod) {
        const paymentMethodToken = paymentMethod.id;
        props.onConfirm(paymentMethodToken);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleFormSubmission}>
      <CardElement options={CARD_ELEMENT_OPTIONS} />
      <button>Confirm Subscription</button>
    </form>
  );
};

const STRIPE_PUBLIC_API_KEY = process.env.REACT_APP_STRIPE_PUBLIC_API_KEY;

const PaymentForm = (props) => {
  const [stripePromise, setStripePromise] = useState(null);

  useEffect(() => {
    setStripePromise(loadStripe(STRIPE_PUBLIC_API_KEY));
  }, []);

  return (
    stripePromise && (
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ stripe, elements }) => (
            <NonInjectedPaymentForm
              stripe={stripe}
              elements={elements}
              {...props}
            />
          )}
        </ElementsConsumer>
      </Elements>
    )
  );
};

export default PaymentForm;
