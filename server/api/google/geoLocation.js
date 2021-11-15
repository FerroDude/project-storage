require.resolve('dotenv');
const axios = require('axios');

module.exports = async (address1, postalCode, city, country) => {
  // !! Address1 format (BuildingNumber<space>StreetName,<space>City,<Space>State/Province)
  const { data } = await axios.get(
    `${process.env.GEOCODING_API_URL}?address=${address1}&components=postal_code:${postalCode}|country:${country}|locality:${city}]&key=${process.env.GEOCODING_API_KEY}`
  );

  return data.results.geometry.location;
};

/*
!!! Access results form data.results (property results contains all information) 
!!! - For lon & lat, access results.geometry.location 

* @Status Possible status from the API:
* * "OK" - successful;
* * "OK" - successful;
* * "ZERO_RESULTS" - successful but no results;
* * "OVER_DAILY_LIMIT" - indicates any of the following:
* *    - The API key is missing or invalid.
* *    - Billing has not been enabled on your account
* *    - A self-imposed usage cap has been exceeded.
* *    - The provided method of payment is no longer valid 
* * "OVER_QUERY_LIMIT" - indicates that you are over your quota.
* * "REQUEST_DENIED" - indicates that your request was denied.
* * "INVALID_REQUEST" - generally indicates that the query (address, components or latlng) is missing.
* * "UNKNOWN_ERROR" - indicates that the request could not be processed due to a server error. The request may succeed if you try again.

*/
