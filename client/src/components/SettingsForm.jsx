import { useState, useEffect } from 'react';
import { loadAuthenticatedUser, uploadImage } from './../services/user';

const SettingsForm = ({ history, onEditUser }) => {
  const [user, setUser] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await loadAuthenticatedUser();
      setUser(user);
    };
    fetchUser();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleFormSubmission = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('profilePicture', imageFile);

    try {
      const profilePicture = await uploadImage(formData);
      await onEditUser({ ...user, profilePicture });
      history.push('/profile');
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageChange = (event) => {
    const image = event.target.files[0];
    setImageFile(image);
  };

  return (
    user && (
      <div>
        <form onSubmit={handleFormSubmission}>
          <input
            name="profilePicture"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          <h3>Personal details</h3>
          <label htmlFor="input-username">Username</label>
          <input
            id="input-username"
            type="text"
            placeholder="Username"
            name="username"
            value={user.username}
            onChange={handleInputChange}
          />
          <label htmlFor="input-fName">First Name</label>
          <input
            id="input-fName"
            type="text"
            placeholder="First Name"
            name="fName"
            value={user.fName}
            onChange={handleInputChange}
          />
          <label htmlFor="input-lName">Last name</label>
          <input
            id="input-lName"
            type="text"
            placeholder="Last name"
            name="lName"
            value={user.lName}
            onChange={handleInputChange}
          />
          <h3>Contact information</h3>
          <label htmlFor="input-email">Email</label>
          <input
            id="input-email"
            type="email"
            placeholder="Your Email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
          />
          <label htmlFor="input-phone">Phone Number</label>
          <input
            id="input-phone"
            type="text"
            placeholder="Your Phone Number"
            name="phoneNumber"
            value={user.phoneNumber}
            onChange={handleInputChange}
          />
          <button type="submit">Save</button>
        </form>
      </div>
    )
  );
};

export default SettingsForm;
