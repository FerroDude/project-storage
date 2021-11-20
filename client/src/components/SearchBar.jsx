import React, { useState } from 'react';
import styled from 'styled-components';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';

const Container = styled.div``;
const SuggestionsList = styled.div``;
const SearchInput = styled.input``;
const SomeComponent = styled.div``;
const SuggetionItem = styled.div``;

const SearchBar = ({ onStorageCoordsChange }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSelection = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);

    onStorageCoordsChange(latLng);
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
                name: 'search'
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
                    {...getSuggestionItemProps(suggestion, {
                      style,
                      key: suggestion.id
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
