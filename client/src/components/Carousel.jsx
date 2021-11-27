import { useState } from 'react';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import styledComponents from 'styled-components';
import { styled } from '@mui/material/styles';

const CarouselComponent = styledComponents.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: 
  margin: 0 3em 0 0;
  width: 20vw;
  height: 10em;
  @media only screen and (max-width: 600px) {
    width: 100%;
    margin: 0;
  }
`;

const Image = styledComponents.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const Stepper = styled(MobileStepper)`
  position: absolute;
  display: block;
  margin: 0;
  padding: 0;
  background: transparent;
  height: 100%;
  width: 100%;

  & .MuiMobileStepper-dots {
    position: absolute;
    justify-content: center;
    top: 90%;
    width: 100%;
    margin: 0 auto;
  }

  & .MuiButton-root:first-child {
    background: ${(props) => props.theme.palette.background.opaqueLight};
    border-radius: 5px;
    position: absolute;
    top: 45%;
    left: 1%;
  }

  & .MuiButton-root:nth-child(3) {
    background: ${(props) => props.theme.palette.background.opaqueLight};
    border-radius: 5px;
    position: absolute;
    top: 45%;
    left: 74%;
  }
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
          variant="dots"
          position="static"
          index={index}
          steps={images.length}
          activeStep={index}
          backButton={
            <Button
              size="small"
              onClick={goToPrevPicture}
              disabled={index === 0}
            >
              <ArrowBackIcon />
            </Button>
          }
          nextButton={
            <Button
              size="small"
              onClick={goToNextPicture}
              disabled={index === images.length - 1}
            >
              <ArrowForwardIcon />
            </Button>
          }
        />
      </CarouselComponent>
    )
  );
};

export default Carousel;
