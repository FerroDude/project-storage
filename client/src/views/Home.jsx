import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Rating, Slider, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import React, { useState } from 'react';
import styledComponents from 'styled-components';
import SearchBar from '../components/SearchBar';
import { getStorageNearCoods } from '../services/storage';
import { styled } from '@mui/material/styles';
import { CustomizedCancelIcon } from '../components/Navbar';

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
  const [filters, setFilters] = useState({ rating: 0 });
  const [addFilterIsClicked, setAddFilterIsCliked] = useState(false);
  const [searchResults, setSearchResults] = useState({ results: null });
  const [hasResults, setHasResults] = useState(false);

  const getSearchResults = async (
    serviceHandlerFunction,
    userCoords,
    filters,
    searchCoords
  ) => {
    return await serviceHandlerFunction({
      userCoords: [...userCoords],
      filters,
      ...searchCoords
    });
  };

  const handleStorageCoords = async (coords) => {
    let storageNearSearch;
    if (user) {
      const userCoordinates = user.location.coordinates;

      if (userCoordinates) {
        storageNearSearch = await getSearchResults(
          getStorageNearCoods,
          userCoordinates,
          filters,
          coords
        );

        setSearchResults({ results: [...storageNearSearch] });
      } else {
        navigator.geolocation.getCurrentPosition(async (pos) => {
          const guestUserCoords = [pos.coords.longitude, pos.coords.latitude];
          storageNearSearch = await getSearchResults(
            getStorageNearCoods,
            guestUserCoords,
            filters,
            coords
          );
        });

        setSearchResults({ results: [...storageNearSearch] });
      }
    } else if (!user) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const guestUserCoords = [pos.coords.longitude, pos.coords.latitude];
        storageNearSearch = await getSearchResults(
          getStorageNearCoods,
          guestUserCoords,
          filters,
          coords
        );
      });
      setSearchResults({ results: [...storageNearSearch] });
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

  const handleFilterSubmit = (e) => {
    setAddFilterIsCliked((prev) => !prev);
    if (e.target.id === 'cancel-filter') {
      setFilters({ ranting: 0 });
    }
  };

  console.log(filters);
  return (
    <Container>
      <MainHeader>Find the right storage for you</MainHeader>
      <SearchBar user={user} onStorageCoordsChange={handleStorageCoords} />
      <Button onClick={handleFilterSubmit}>
        {addFilterIsClicked ? (
          <CustomizedCancelIcon id="cancel-filter" />
        ) : (
          <FilterAltIcon />
        )}
      </Button>

      {addFilterIsClicked && (
        <SearchBarWrapper>
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
          <Typography>Search Radius from Location</Typography>
          <PrettoSlider
            id="location-range"
            valueLabelDisplay="auto"
            defaultValue={10}
            max={50}
            min={0}
            onChange={handleFilterChange}
            name="radius"
          />
          <Typography>Total Storage Area</Typography>
          <PrettoSlider
            id="area"
            valueLabelDisplay="auto"
            defaultValue={[0, 0]}
            max={1000}
            min={0}
            onChange={handleFilterChange}
            name="area"
          />

          <Rating
            name="rating"
            value="simple-controlled"
            onChange={handleFilterChange}
            value={filters.rating}
          />
          <Button onClick={handleFilterSubmit} variant="contained">
            Done
          </Button>
        </SearchBarWrapper>
      )}
    </Container>
  );
};

export default HomeView;
