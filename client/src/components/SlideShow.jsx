import React from 'react';
import Slider from 'react-slick';
import style from 'styled-components';

const Slide = style.div`

`;

const Dummy = style.h3``;

function SlideShow(props) {
  const settings = {
    dots: true,
    infite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };

  return (
    <Slider {...settings}>
      <Slide>
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
      </Slide>
    </Slider>
  );
}

export default SlideShow;
