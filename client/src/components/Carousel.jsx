import { useState } from 'react';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import styledComponents from 'styled-components';
import { styled } from '@mui/material/styles';

const CarouselComponent = styledComponents.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  width: 15vw;
  height: 10em;
  @media only screen and (max-width: 600px) {
    width: 90vw;
  }
`;

const Image = styledComponents.img`
object-fit: cover;
width: 100%;
height: 100%;
`;

const Stepper = styled(MobileStepper)`
  width: 100%;
`;

const Carousel = ({ images, type }) => {
  const [index, setIndex] = useState(0);

  const goToNextPicture = () => {
    setIndex((previous) => previous + 1);
  };

  const goToPrevPicture = () => {
    setIndex((previous) => previous - 1);
  };

  return (
    images && (
      <CarouselComponent>
        <Image src={images[index]} alt={images[index]} />
        <Stepper
          variant="text"
          position="static"
          index={index}
          steps={images.length}
          backButton={
            <Button
              size="small"
              onClick={goToPrevPicture}
              disabled={index === 0}
            >
              Back
              <ArrowBackIcon />
            </Button>
          }
          nextButton={
            <Button
              size="small"
              onClick={goToNextPicture}
              disabled={index === images.length - 1}
            >
              Next
              <ArrowForwardIcon />
            </Button>
          }
        />
      </CarouselComponent>
    )
  );
};

export default Carousel;
