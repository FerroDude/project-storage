import React from 'react';
import Slider from 'react-slick';
import styledComponent from 'styled-components';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Rating } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const Slide = styledComponent.div`
    position: relative;
    color: #fff;    
`;
const StorageImage = styledComponent.img`
    border-radius: 20px;
    width: 100%;
    height: 240px;
`;
const StorageLocation = styledComponent.div`
    position: absolute;
    bottom: 0;
    margin-bottom: 54px;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    padding-left: 5px;
    font-weight: 600;
    `;
const StorageCityAndCountry = styledComponent.span`
    
`;
const StorageDistance = styledComponent.div`
    top: 0;
    right: 0;
    position: absolute;
    margin: 5px 10px 0px 0px;
`;
const Distance = styledComponent.span``;

const CustomizedRating = styled(Rating)`
  position: absolute;
  bottom: 0;
  margin-bottom: 25px;
  width: 100%;
  padding-left: 5px;
`;

function SlideShow({ storages }) {
  const settings = {
    dots: true,
    infite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  };

  return (
    <Slider {...settings}>
      {storages.map((data) => {
        const storage = data[0];
        const distance = data[1];
        return (
          <Link
            to={{
              pathname: `/storage/${storage._id}`
            }}
          >
            <Slide key={storage._id}>
              <StorageImage
                src={
                  storage.gallery
                    ? storage.gallery[0]
                    : '../../public/out-of-stock.png'
                }
                alt="Storage Image"
              />
              <StorageLocation>
                <LocationOnIcon />
                <StorageCityAndCountry>Lisbon, Portugal</StorageCityAndCountry>
              </StorageLocation>
              <CustomizedRating
                name="storage-rating"
                defautValue={storage.average}
                precision={0.5}
                readOnly
              />
              {distance && (
                <StorageDistance>
                  <Distance>{Number(distance).toPrecision(2)}</Distance>
                  <span> miles</span>
                </StorageDistance>
              )}
            </Slide>
          </Link>
        );
      })}
    </Slider>
  );
}

export default SlideShow;
