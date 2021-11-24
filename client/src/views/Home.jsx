import { Slider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styledComponents from 'styled-components';
import SearchBar from '../components/SearchBar';
import { getStorageNearCoods } from '../services/storage';
import { styled } from '@mui/material/styles';

const Container = styledComponents.div``;
const MainHeader = styledComponents.h1``;
const SearchBarWrapper = styledComponents.div``;

const PrettoSlider = styled(Slider)({
  color: '#52af77',
  height: 8,
  '& .MuiSlider-track': {
    border: 'none'
  },
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit'
    },
    '&:before': {
      display: 'none'
    }
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: '#52af77',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&:before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)'
    },
    '& > *': {
      transform: 'rotate(45deg)'
    }
  }
});

const HomeView = ({ user }) => {
  const handleStorageCoords = async (coords) => {
    if (user) {
      const storageNearSearch = await getStorageNearCoods({
        ...coords,
        coords: [...user.location.coordinates]
      });
      return storageNearSearch;
    } else if (!user) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const storageNearSearch = await getStorageNearCoods({
          ...coords,
          coords: [pos.coords.longitude, pos.coords.latitude]
        });
        return storageNearSearch;
      });
    } else {
      alert('Please, allow access to your location for a better experience');
    }
  };

  return (
    <Container>
      <MainHeader>Find the right storage for you</MainHeader>
      <SearchBarWrapper>
        <SearchBar user={user} onStorageCoordsChange={handleStorageCoords} />
        <PrettoSlider></PrettoSlider>
      </SearchBarWrapper>
    </Container>
  );
};

export default HomeView;
