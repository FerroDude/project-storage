import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Rating, Slider, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import React, { useState, useEffect } from 'react';
import styledComponents from 'styled-components';
import SearchBar from '../components/SearchBar';
import {
  getHighRatedStorages,
  getStorage,
  getStorageNearCoods,
  getStoragesNearUser
} from '../services/storage';
import { styled } from '@mui/material/styles';
import { CustomizedCancelIcon } from '../components/Navbar';
import SlideShow from '../components/SlideShow';

const Container = styledComponents.div`
  display: flex;
  flex-direction: column;
  
  .allow-location {
    margin: 2em auto;
    width: 60%;
    font-weight: 500;
  }
  `;
const SlideHeader = styledComponents.h6`
  padding: 1em;
  width: 100%  
`;
const SearchContainer = styledComponents.div`
  display: flex;
  padding: 0 1em;
  justify-content: space-between;
  position: relative;

  & :first-child:first-child {
    flex: 2;
    border-radius: 50px;
    
    #input-search {
      padding: 1em;
      color: ${(props) => props.theme.palette.primary.text};
    }
  }

`;

const SearchBarFilterContainer = styledComponents.div`
  margin: 2.5em 0;
  padding: 1em 1em;
  display: flex;
  flex-direction: column;
  gap: 1.1em;

  .MuiRating-root {
    background: #342211;
    padding: 3px 10px;
    width: 40%;
    border-radius: 35px;
  }
  `;

const SearchResults = styledComponents.div`
padding: 1em;
margin: 1em 0;  
color: ${(props) => props.theme.palette.primary.text};
.slick-list {
    height: 15em;
    border-radius: 20px;
}

.slick-dots li button:before {
  color: #ff7f04; 
}

`;

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

  const [isLocationAllowed, setIsLocationAllowed] = useState(false);
  const [nearStorage, setNearStorage] = useState([]);

  const [highRatedStorages, setHighRatedStorages] = useState(null);

  useEffect(() => {
    console.log('useEffect called');
    const getStorages = async () => {
      const loadedStorages = await getHighRatedStorages();
      setHighRatedStorages(loadedStorages);
    };
    getStorages();
  }, []);

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

        setSearchResults({ results: storageNearSearch });
      } else {
        navigator.geolocation.getCurrentPosition(async (pos) => {
          const guestUserCoords = [pos.coords.longitude, pos.coords.latitude];
          storageNearSearch = await getSearchResults(
            getStorageNearCoods,
            guestUserCoords,
            filters,
            coords
          );
          setSearchResults({ results: storageNearSearch });
        });
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
        setSearchResults({ results: storageNearSearch });
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

  const handleFilterSubmit = (e) => {
    setAddFilterIsCliked((prev) => !prev);
    if (e.target.id === 'cancel-filter') {
      setFilters({ ranting: 0 });
    }
  };

  const handleAllowLocation = async (e) => {
    if (user) {
      const storages = await getStoragesNearUser({
        lng: user.location.coordinates[0],
        lat: user.location.coordinates[1]
      });

      setNearStorage([...storages.data]);

      if (!storages.data.length > 0) {
        e.target.innerHTML = 'No Storages Near You';
        e.target.disabled = true;
      } else {
        setIsLocationAllowed(true);
      }
    } else if (!user) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const userCoords = {
          lat: pos.coords.longitude,
          lng: pos.coords.latitude
        };
        const storages = await getStoragesNearUser(userCoords);
        setNearStorage(storages.length ? [...storages] : []);
        if (!storages.data.length > 0) {
          e.target.innerHTML = 'No Storages Near You';
          e.target.disabled = true;
        } else {
          setIsLocationAllowed(true);
        }
      });
    }
  };

  console.log(nearStorage);
  return (
    <Container>
      <SearchContainer>
        <SearchBar user={user} onStorageCoordsChange={handleStorageCoords} />
        <Button onClick={handleFilterSubmit}>
          {addFilterIsClicked ? (
            <CustomizedCancelIcon id="cancel-filter" />
          ) : (
            <FilterAltIcon />
          )}
        </Button>
      </SearchContainer>
      {addFilterIsClicked && (
        <SearchBarFilterContainer>
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
            onChange={handleFilterChange}
            value={filters.rating}
          />
          <button onClick={handleFilterSubmit} variant="contained">
            Done
          </button>
        </SearchBarFilterContainer>
      )}
      {searchResults.results && (
        <SearchResults>
          <SlideHeader>Search Results</SlideHeader>
          <SlideShow storages={searchResults.results.sortedStorages} />
        </SearchResults>
      )}

      {highRatedStorages && (
        <SearchResults>
          <SlideHeader>Worldwide Recommendations</SlideHeader>
          <SlideShow storages={highRatedStorages.data} />
        </SearchResults>
      )}

      {!isLocationAllowed ? (
        <Button
          className="allow-location"
          onClick={handleAllowLocation}
          variant="contained"
        >
          Find Storages Near You
        </Button>
      ) : (
        <SearchResults>
          <SlideHeader>Storages Near You</SlideHeader>
          <SlideShow storages={nearStorage} />
        </SearchResults>
      )}
    </Container>
  );
};

export default HomeView;
