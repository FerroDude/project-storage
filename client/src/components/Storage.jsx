import Carousel from './Carousel';
import { Link } from 'react-router-dom';
import styledComponents from 'styled-components';
import { styled } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import Divider from '@mui/material/Divider';

const StorageItem = styled(ListItem)`
  display: flex;
  align-items: flex-start;
  font-size: 1em;
  @media only screen and (max-width: 600px) {
    margin: 0;
    padding: 0;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Location = styledComponents.div`
    display: flex;
    align-items: center;
`;

const Rating = styledComponents.div`
    display: flex;
    align-items: center;
`;

const Area = styledComponents.p`

`;

const Info = styledComponents.div`
    padding-left: 2em;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    @media only screen and (max-width: 600px) {
        margin-top: 4em;
        padding-left: 0;
    }
`;

const Storage = ({ storage, user }) => {
  return (
    storage && (
      <StorageItem>
        <Carousel images={storage.gallery} />
        <Info>
          <Link
            to={
              (user.role === 'landlord' && `/storage/${storage._id}/manage`) ||
              `/storage/${storage._id}`
            }
          >
            <strong>{storage.name}</strong>
            <Area>{storage.width * storage.length} &#13217;</Area>
            <Location>
              <LocationOnIcon />
              Madrid
            </Location>
            <Rating>
              <StarIcon />
              4.4
            </Rating>
          </Link>
        </Info>
        <Divider />
      </StorageItem>
    )
  );
};

export default Storage;
