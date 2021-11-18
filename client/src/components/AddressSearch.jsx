import { useState } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';

const searchOptions = {
  componentRestrictions: { country: ['es'] },
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
    <div>
      <PlacesAutocomplete
        value={searchTerm}
        onChange={setSearchTerm}
        onSelect={handleSelection}
        searchOptions={searchOptions}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <label htmlFor="input-storage-address">Address</label>
            <input
              {...getInputProps({
                id: 'input-storage-address',
                type: 'text',
                placeholder: 'Type your address',
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
                  <div {...getSuggestionItemProps(suggestion, { style })}>
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
};

export default AddressSearch;
