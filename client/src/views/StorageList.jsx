//create a react component to  display the storage list
import { useEffect, useState } from 'react';
import { listStorages } from '../services/storage';

const StorageList = (props) => {
  const [storages, setStorages] = useState([]);

  /*  useEffect(() => {
    const fetchData = async () => {
      const result = await listStorages();
      setStorages(result);
    };
    fetchData();
  }, []); */

  return (
    <div>
      <h1>Storages List</h1>
    </div>
  );
};

export default StorageList;
