import { Link } from 'react-router-dom';

const ProfileView = ({ user }) => {
  return (
    user && (
      <div>
        <h2>Profile View</h2>
        <h3>{user.username}</h3>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYSprYSGY7wv-OyUUMHyEYhPtVO1juHDCtVg&usqp=CAU"
          alt={`${user.username}'s profile`}
          height="150px"
          width="150px"
        />
        <h3>Personal details</h3>
        <br />
        <strong>First name: </strong>
        <span>{user.fName}</span>
        <br />
        <strong>Last name: </strong>
        <span>{user.lName}</span>
        <br />
        <h3>Contact information</h3>
        <strong>Email: </strong>
        <span>{user.email}</span>
        <br />
        <strong>Phone number: </strong>
        <span>{user.phoneNumber}</span>
        <br />
        <button>
          <Link to="settings">Profile settings</Link>
        </button>
      </div>
    )
  );
};

export default ProfileView;
