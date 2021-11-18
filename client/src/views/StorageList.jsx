import { useEffect, useState } from 'react';
import { listMyStorages } from '../services/storage';
import { Link } from 'react-router-dom';

const StorageListView = () => {
  const [storages, setStorages] = useState(null);
  useEffect(() => {
    const fetchStorages = async () => {
      const storages = await listMyStorages();
      setStorages(storages);
    };
    fetchStorages();
  }, []);

  return (
    storages && (
      <div>
        <ul>
          {storages.map((storage) => (
            <li key={storage._id}>
              <Link to={`/storage/${storage._id}/manage`}>{storage.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

export default StorageListView;
