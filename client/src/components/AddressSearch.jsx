import { useState } from 'react';

const AddressSearch = () => {
  return (
    <div>
      <label htmlFor="input-storage-address">Address</label>
      <input
        id="input-storage-address"
        type="text"
        placeholder="Address"
        name="Address"
        // value={}
        // onChange={}
      />
    </div>
  );
};

export default AddressSearch;
