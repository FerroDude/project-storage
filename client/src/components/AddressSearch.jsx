import { useState } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';
import { styled } from '@mui/material/styles';
import styledComponents from 'styled-components';
import TextField from '@mui/material/TextField';

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
  componentRestrictions: { country: ['es', 'pt'] },
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
            <div>
              {loading && <div>...loading</div>}
              {suggestions.map((suggestion) => {
                const style = {
                  backgroundColor: suggestion.active && '#41b3f3'
                };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      style,
                      key: suggestion.description
                    })}
                  >
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </Wrapper>
  );
};

export default AddressSearch;
