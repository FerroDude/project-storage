import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Rating, Slider, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';
import styledComponents from 'styled-components';
import SearchBar from '../components/SearchBar';
import { getStorageNearCoods } from '../services/storage';
import { styled } from '@mui/material/styles';

const Container = styledComponents.div``;
const MainHeader = styledComponents.h1``;
const SearchBarWrapper = styledComponents.div``;

const PrettoSlider = styled(Slider)({
  background: '#FFB76B',
  background:
    'linear-gradient(to right, #FFB76B 13% , #FFA73D 18% , #FF7C00 90% , #FF7F04 40% )',
  '-webkit-background-clip': 'text',
  '-webkit-text-fill-color': '#fff',
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
    backgroundColor: '#FF7C00',
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

const AreaFilter = styledComponents.div``;
const AreaFilterInputs = styledComponents.input``;

const HomeView = ({ user }) => {
  const [filters, setFilters] = useState({});

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

  const handleFilterChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFilters((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Container>
      <MainHeader>Find the right storage for you</MainHeader>
      <SearchBarWrapper>
        <SearchBar user={user} onStorageCoordsChange={handleStorageCoords} />
        <Typography>Price</Typography>
        <PrettoSlider
          valueLabelDisplay="auto"
          defaultValue={[0, 100]}
          max={2000}
          min={1}
          id="price"
          onChange={handleFilterChange}
          name="price"
        />
        <Typography>Search Radius</Typography>
        <PrettoSlider
          id="location-range"
          valueLabelDisplay="auto"
          defaultValue={[0, 100]}
          max={2000}
          min={0}
          onChange={handleFilterChange}
          name="radius"
        />
        <Typography>Unit Dimension</Typography>
        <AreaFilter>
          <AreaFilterInputs
            name="width"
            placeholder="Insert Width"
            id="input-width"
            type="number"
            onChange={handleFilterChange}
          ></AreaFilterInputs>
          <AreaFilterInputs
            name="height"
            placeholder="Insert Height"
            id="input-height"
            type="number"
            onChange={handleFilterChange}
          ></AreaFilterInputs>
        </AreaFilter>
        <Rating name="no-value" value={null} />
        <Button variant="contained">Done</Button>
      </SearchBarWrapper>
      <Button>
        <FilterAltIcon />
      </Button>
    </Container>
  );
};

export default HomeView;
