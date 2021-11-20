//This view is for development purposes only.
import { useState, useEffect } from 'react';
import { listAllStorages } from '../services/storage';
import { Link } from 'react-router-dom';

const AllStorages = () => {
  const [storages, setStorages] = useState(null);

  useEffect(() => {
    fetchStorages();
  }, []);

  const fetchStorages = async () => {
    const storages = await listAllStorages();
    setStorages(storages);
  };

  return (
    <div>
      <h1>All Storages</h1>
      {storages && (
        <ul>
          {storages.map((storage) => (
            <li key={storage._id}>
              <Link to={`/storage/${storage._id}`}>{storage.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllStorages;
