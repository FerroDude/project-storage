import { useParams, Link } from 'react-router-dom';
import styledComponents from 'styled-components';

const Message = styledComponents.div`
  color: ${(props) => props.theme.palette.primary.text};
`;

const ConfirmationView = () => {
  const { type, storageId } = useParams();

  return type === 'subscribed' ? (
    <Message>
      Subscription successful. View your storage{' '}
      <Link to={`/storage/${storageId}`} style={{ color: '#FF7F04' }}>
        here
      </Link>
    </Message>
  ) : (
    <Message>Unsubscribed successfully</Message>
  );
};

export default ConfirmationView;
