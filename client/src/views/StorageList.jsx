import { useEffect, useState } from 'react';
import { listMyStorages, listRentedStorages } from '../services/storage';
import { Link } from 'react-router-dom';

const StorageListView = ({ user }) => {
  const [storages, setStorages] = useState(null);

  useEffect(() => {
    const fetchStorages = async () => {
      let storages;
      if (user) {
        user.role === 'landlord'
          ? (storages = await listMyStorages())
          : (storages = await listRentedStorages());
        setStorages(storages);
      }
    };
    fetchStorages();
  }, [user]);

  return (
    (storages && (
      <div>
        <h1>My Storages</h1>
        <ul>
          {storages.map((storage) => (
            <li key={storage._id}>
              {(user.role === 'landlord' && (
                <Link to={`/storage/${storage._id}/manage`}>
                  {storage.name}
                </Link>
              )) || <Link to={`/storage/${storage._id}`}>{storage.name}</Link>}
            </li>
          ))}
        </ul>
      </div>
    )) || <p>No storages</p>
  );
};

export default StorageListView;
