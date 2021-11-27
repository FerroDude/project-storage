import React, { useState } from 'react';
import styledComponents from 'styled-components';
import { styled } from '@mui/material/styles';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';
import TextField from '@mui/material/TextField';

const Container = styledComponents.div``;
const SuggestionsList = styledComponents.div`
position: absolute;
z-index: 1;
background: rgb(20 20 20);
width: 100%;
right: 0;
padding: 1em 1em;
display: flex;
flex-direction: column;
justify-content: space-between;`;

const SearchInput = styled(TextField)`
  background: rgba(255, 127, 4, 0.15);
  color: white;
  width: 100%;
`;
const SomeComponent = styledComponents.div``;
const SuggetionItem = styledComponents.div`
margin: 10px 0;
padding: 5px 10px;
border-radius: 10px;
`;

const SearchBar = ({ onStorageCoordsChange }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSelection = async (value) => {
    try {
      const searchAddress = await geocodeByAddress(value);
      const latLng = await getLatLng(searchAddress[0]);
      await onStorageCoordsChange(latLng);
    } catch {
      // TODO We might want to create an error page for 500 requests or a No result found components
    }
  };

  return (
    <Container>
      <PlacesAutocomplete
        value={searchValue}
        onChange={setSearchValue}
        onSelect={handleSelection}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <Container>
            <SearchInput
              {...getInputProps({
                id: 'input-search',
                type: 'text',
                placeholder: 'Where would you like to rent?',
                name: 'search',
                variant: 'filled'
              })}
            />
            <SuggestionsList>
              {loading && <SomeComponent>...loading</SomeComponent>}
              {suggestions.map((suggestion) => {
                const style = {
                  backgroundColor: suggestion.active && 'orange'
                };
                return (
                  <SuggetionItem
                    key={suggestion.id}
                    {...getSuggestionItemProps(suggestion, {
                      style
                    })}
                  >
                    {suggestion.description}
                  </SuggetionItem>
                );
              })}
            </SuggestionsList>
          </Container>
        )}
      </PlacesAutocomplete>
    </Container>
  );
};

export default SearchBar;
