import React from 'react';
import styled from 'styled-components';
import SearchBar from '../components/SearchBar';
import { getStorageNearCoods } from '../services/storage';

const Container = styled.div``;
const MainHeader = styled.h1``;

const HomeView = () => {
  const handleStorageCoords = async (coords) => {
    const storageNearSearch = getStorageNearCoods(coords);
    console.log(storageNearSearch);
  };
  return (
    <Container>
      <MainHeader>Find the right storage for you</MainHeader>
      <SearchBar onStorageCoordsChange={handleStorageCoords} />
    </Container>
  );
};

export default HomeView;
