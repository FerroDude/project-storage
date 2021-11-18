//create a react component to  display the storage list
import { useEffect, useState } from 'react';
import { listStorages, listAllStorages } from '../services/storage';

const StorageList = (props) => {
  const [storages, setStorages] = useState([]);

  useEffect(() => {
    loadStorages();
  }, []);

  const loadStorages = async () => {
    const storages = await listAllStorages();
    setStorages(storages);
  };

  return (
    <div>
      <h1>Storages List</h1>
      {
        <ul>
          {(storages.length !== 0 && (
            <>
              {storages.map((storage) => (
                <li key={storage._id}>
                  <a href={`/storage/${storage._id}`}>{storage.name}</a>
                </li>
              ))}
            </>
          )) || <em>No storages yet..</em>}
        </ul>
      }
    </div>
  );
};

export default StorageList;
