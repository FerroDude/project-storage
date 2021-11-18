import { useEffect, useState } from 'react';
import { listMyStorages } from 'react';

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
    <div>
      <ul>
        {storages.map((storage) => (
          <li key={storage._id}>{storage.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default StorageListView;
