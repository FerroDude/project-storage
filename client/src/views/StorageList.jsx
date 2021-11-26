import { useEffect, useState } from 'react';
import { listMyStorages, listRentedStorages } from '../services/storage';
import StorageCard from '../components/StorageCard';
import styledComponents from 'styled-components';

const StorageList = styledComponents.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  background: ${(props) => props.theme.palette.background.component};
  border-radius: 5px;
  width: 70%;
  height: 95%;
  padding: ${(props) => props.theme.padding.element};
  margin: ${(props) => props.theme.margin.element};
  box-shadow: ${(props) => props.theme.shadow};
  @media only screen and (max-width: 600px) {
    width: 90%;
  }
`;

const Title = styledComponents.h1`
  color: ${(props) => props.theme.palette.title.component};
`;

const Info = styledComponents.p`
  margin-top: 3em;
  color: ${(props) => props.theme.palette.primary.text};
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
    storages && (
      <StorageList>
        <Title>My Storages</Title>
        {storages.length ? (
          storages.map((storage) => (
            <StorageCard key={storage._id} user={user} storage={storage} />
          ))
        ) : (
          <Info>You don't currently have any storages on your list</Info>
        )}
      </StorageList>
    )
  );
};

export default StorageListView;
