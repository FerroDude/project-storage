import Carousel from './Carousel';
import { Link } from 'react-router-dom';
import styledComponents from 'styled-components';
import { styled } from '@mui/material/styles';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const StorageItem = styled(Card)`
  display: flex;
  align-items: center;
  @media only screen and (max-width: 600px) {
    width: 100%;
    flex-direction: column;
    align-items: center;
    padding: 1em;
    margin: 1em;
  }
  background: ${(props) => props.theme.palette.background.light};
  border-radius: 5px;
  width: 90%;
  height: 95%;
  padding: ${(props) => props.theme.padding.element};
  margin: ${(props) => props.theme.margin.element};
`;

const Location = styledComponents.div`
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.palette.primary.text};
`;

const Rating = styledComponents.div`
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.palette.primary.text};
`;

const LocationIcon = styled(LocationOnIcon)`
  color: ${(props) => props.theme.palette.secondary.main};
  margin: ${(props) => props.theme.margin.icon};
`;

const RatingIcon = styled(StarIcon)`
  color: ${(props) => props.theme.palette.secondary.main};
  margin: ${(props) => props.theme.margin.icon};
`;

const Area = styledComponents.p`
  color: ${(props) => props.theme.palette.primary.text};
`;

const Title = styledComponents.h3`
@media only screen and (max-width: 600px) {
  margin-top: 0.5em;
  text-align: center;
}
  color: ${(props) => props.theme.palette.title.subtitle};
`;

const Info = styled(CardContent)`
  width: 100%;
  padding-left: 4em;
  @media only screen and (max-width: 600px) {
    padding: 0;
    width: initial;
  }
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Details = styledComponents.div`
  @media only screen and (max-width: 600px) {
    display: flex;
    justify-content: space-around;
  }
`;

const StorageCard = ({ storage, user }) => {
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
            <Title>{storage.name}</Title>
            <Details>
              <Area>{storage.width * storage.length} &#13217;</Area>
              <Location>
                <LocationIcon />
                <span>Madrid</span>
              </Location>
              <Rating>
                <RatingIcon />
                <span>4.4</span>
              </Rating>
            </Details>
          </Link>
        </Info>
      </StorageItem>
    )
  );
};

export default StorageCard;
