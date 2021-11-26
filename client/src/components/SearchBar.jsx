import React, { useState } from 'react';
import styledComponents from 'styled-components';
import { styled } from '@mui/material/styles';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';
import TextField from '@mui/material/TextField';

const Container = styledComponents.div``;
const SuggestionsList = styledComponents.div``;
const SearchInput = styled(TextField)`
  background: rgba(255, 127, 4, 0.15);
`;
const SomeComponent = styledComponents.div``;
const SuggetionItem = styledComponents.div``;

const SearchBar = ({ onStorageCoordsChange }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSelection = async (value) => {
    try {
      const searchAddress = await geocodeByAddress(value);
      const latLng = await getLatLng(searchAddress[0]);
      onStorageCoordsChange(latLng);
    } catch {
      // TODO We might want to create an error page for 500 requests or a No result found component   s
    }
  };

  return (
    <div>
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
    </div>
    // <SearchForm>
    //   <SearchInputLabel for="storage-search-bar">Search</SearchInputLabel>
    //   <SearchInput
    //     id="storage-search-bar"
    //     onChange={handleInputChange}
    //     name="storage-search"
    //   ></SearchInput>
    //   <SubmitButton
    //     onClick={() => {
    //       handleStorageSearchChange(inputValues.searchInput);
    //     }}
    //   >
    //     Search
    //   </SubmitButton>
    // </SearchForm>
  );
};

export default SearchBar;
