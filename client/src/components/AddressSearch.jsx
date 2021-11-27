import { useState } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';
import { styled } from '@mui/material/styles';
import styledComponents from 'styled-components';
import TextField from '@mui/material/TextField';

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

const SuggestionItem = styledComponents.div`
color: ${(props) => props.theme.palette.primary.text};
margin: 10px 0;
padding: 5px 10px;
border-radius: 20px;
`;

const Input = styled(TextField)`
  margin: 1em 0;
  width: 100%;
  background: rgba(255, 127, 4, 0.07);
  border-radius: 5px 5px 0 0;
  @media only screen and (max-width: 600px) {
    width: 100%;
  }
  .MuiFilledInput-input {
    color: ${(props) => props.theme.palette.primary.text};
  }
  .MuiInputLabel-root {
    color: ${(props) => props.theme.palette.primary.main};
  }
`;

const Wrapper = styledComponents.div`
  width: 60%;
  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;

const searchOptions = {
  // componentRestrictions: { country: ['es', 'pt'] },
  types: ['address']
};

const AddressSearch = ({ onCoordinatesChange }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSelection = async (addressString) => {
    const results = await geocodeByAddress(addressString);
    const latLng = await getLatLng(results[0]);
    setSearchTerm(addressString);
    onCoordinatesChange(latLng);
  };

  return (
    <Wrapper>
      <PlacesAutocomplete
        value={searchTerm}
        onChange={setSearchTerm}
        onSelect={handleSelection}
        searchOptions={searchOptions}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <Input
              {...getInputProps({
                variant: 'filled',
                label: 'Address',
                id: 'input-storage-address',
                type: 'text',
                name: 'address'
              })}
            />
            <SuggestionsList>
              {loading && <div>...loading</div>}
              {suggestions.map((suggestion) => {
                const style = {
                  backgroundColor: suggestion.active && '#242424'
                };
                return (
                  <SuggestionItem
                    {...getSuggestionItemProps(suggestion, {
                      style,
                      key: suggestion.description
                    })}
                  >
                    {suggestion.description}
                  </SuggestionItem>
                );
              })}
            </SuggestionsList>
          </div>
        )}
      </PlacesAutocomplete>
    </Wrapper>
  );
};

export default AddressSearch;
