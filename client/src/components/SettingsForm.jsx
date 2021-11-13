import { useState } from 'react';
import { editUser } from './../services/user';

const SettingsForm = () => {
  const [inputValues, setInputValues] = useState({
    username: '',
    fName: '',
    lName: '',
    email: '',
    phoneNumber: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleFormSubmission = async (event) => {
    event.preventDefault();
    try {
      const response = await editUser(inputValues);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmission}>
        <h3>Personal details</h3>
        <label htmlFor="input-username">Username</label>
        <input
          id="input-username"
          type="text"
          placeholder="Username"
          name="username"
          value={inputValues.username}
          onChange={handleInputChange}
        />
        <label htmlFor="input-fName">First Name</label>
        <input
          id="input-fName"
          type="text"
          placeholder="First Name"
          name="fName"
          value={inputValues.fName}
          onChange={handleInputChange}
        />
        <label htmlFor="input-lName">Last name</label>
        <input
          id="input-lName"
          type="text"
          placeholder="Last name"
          name="lName"
          value={inputValues.lName}
          onChange={handleInputChange}
        />
        <h3>Contact information</h3>
        <label htmlFor="input-email">Email</label>
        <input
          id="input-email"
          type="email"
          placeholder="Your Email"
          name="email"
          value={inputValues.email}
          onChange={handleInputChange}
        />
        <label htmlFor="input-phone">Phone Number</label>
        <input
          id="input-phone"
          type="text"
          placeholder="Your Phone Number"
          name="phoneNumber"
          value={inputValues.phoneNumber}
          onChange={handleInputChange}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default SettingsForm;
