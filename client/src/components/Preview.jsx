import { useState } from 'react';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import styledComponents from 'styled-components';
import { styled } from '@mui/material/styles';

const Carousel = styledComponents.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  width: 15vw;
  height: 15em;
  @media only screen and (max-width: 600px) {
    width: 90vw;
  }
`;

const Image = styledComponents.img`
  max-width: 100%;
  max-height: 100%;
  display: inline-block;
  margin: 0;
  vertical-align: middle;
`;

const Stepper = styled(MobileStepper)`
  width: 100%;
`;

const Preview = ({ images, type }) => {
  const [index, setIndex] = useState(0);

  const goToNextPicture = () => {
    setIndex((previous) => previous + 1);
  };

  const goToPrevPicture = () => {
    setIndex((previous) => previous - 1);
  };

  return (
    images && (
      <Carousel>
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
      </Carousel>
    )
  );
};

export default Preview;
