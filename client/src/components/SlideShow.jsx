import React from 'react';
import Slider from 'react-slick';
import style from 'styled-components';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Rating } from '@mui/material';

const Slide = style.div``;
const StorageImage = style.img``;
const StorageLocation = style.div``;
const StorageCityAndCountry = style.span``;
const StorageDistance = style.div``;
const Distance = style.span``;

function SlideShow({ storages }) {
  const settings = {
    dots: true,
    infite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1
  };

  return (
    <Slider {...settings}>
      {storages.map((data) => {
        const storage = data[0];
        const distance = data[1];
        return (
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
            <Rating
              name="storage-rating"
              defautValue={storage.average}
              precision={0.5}
              readOnly
            />
            <StorageDistance>
              <Distance>{distance}</Distance> <span>miles</span>
            </StorageDistance>
          </Slide>
        );
      })}
      {/* <Slide>
        <Dummy>1</Dummy>
      </Slide>
      <Slide>
        <Dummy>2</Dummy>
      </Slide>
      <Slide>
        <Dummy>3</Dummy>
      </Slide>
      <Slide>
        <Dummy>4</Dummy>
      </Slide>
      <Slide>
        <Dummy>5</Dummy>
      </Slide>
      <Slide>
        <Dummy>6</Dummy>
      </Slide> */}
    </Slider>
  );
}

export default SlideShow;
