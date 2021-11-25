import { useEffect, useState } from 'react';
import { listMyStorages, listRentedStorages } from '../services/storage';
import Storage from '../components/Storage';

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
        <ul style={{ padding: 0 }}>
          {storages.map((storage) => (
            <Storage key={storage._id} user={user} storage={storage} />
          ))}
        </ul>
      </div>
    )) || <p>No storages</p>
  );
};

export default StorageListView;
