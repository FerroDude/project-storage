import { Link } from 'react-router-dom';
import styledComponents from 'styled-components';
import { styled } from '@mui/material/styles';

const Profile = styledComponents.div`
  color: ${(props) => props.theme.palette.primary.text};
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.palette.background.component};
  border-radius: 5px;
  width: 90%;
  height: 95%;
  padding: ${(props) => props.theme.padding.element};
  margin: ${(props) => props.theme.margin.element};
  box-shadow: ${(props) => props.theme.shadow};
`;

const Info = styledComponents.div`
  display: flex;
  flex-direction: column;
`;

const Title = styledComponents.h1`
  color: ${(props) => props.theme.palette.title.component};
`;

const Username = styledComponents.h1`
  color: ${(props) => props.theme.palette.title.component};
`;

const ProfileView = ({ user }) => {
  return (
    user && (
      <Profile>
        <Title>User Profile</Title>
        <h3>{user.username}</h3>
        {user.profilePicture && (
          <img
            src={user.profilePicture}
            alt={`${user.username}'s profile`}
            height="150px"
            width="150px"
          />
        )}

        <Info>
          <h3>Personal details</h3>
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
        </Info>

        <button>
          <Link to="settings">Profile settings</Link>
        </button>
      </Profile>
    )
  );
};

export default ProfileView;
