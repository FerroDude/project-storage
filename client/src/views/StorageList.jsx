import { useEffect, useState } from 'react';
import { listMyStorages, listRentedStorages } from '../services/storage';
import StorageCard from '../components/StorageCard';
import styledComponents from 'styled-components';
import { styled } from '@mui/material/styles';

const StorageList = styledComponents.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  background: ${(props) => props.theme.palette.background.component};
  border-radius: 5px;
  width: 90%;
  height: 95%;
  padding: ${(props) => props.theme.padding.element};
  margin: ${(props) => props.theme.margin.element};
  box-shadow: ${(props) => props.theme.shadow};
`;

const Title = styledComponents.h1`
  color: ${(props) => props.theme.palette.title.component};
`;

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
      <StorageList>
        <Title>My Storages</Title>
        {storages.map((storage) => (
          <StorageCard key={storage._id} user={user} storage={storage} />
        ))}
      </StorageList>
    )) || <p>No storages</p>
  );
};

export default StorageListView;
