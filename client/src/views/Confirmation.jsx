import { useParams, Link } from 'react-router-dom';

const ConfirmationView = () => {
  const { type, storageId } = useParams();

  return type === 'subscribed' ? (
    <div>
      Subscription successful. View your storage{' '}
      <Link to={`/storage/${storageId}`}>here</Link>
    </div>
  ) : (
    <div>Unsubscribed successfully</div>
  );
};

export default ConfirmationView;
