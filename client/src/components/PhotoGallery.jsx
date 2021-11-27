import { useState } from 'react';
import { styled } from '@mui/material/styles';
import styledComponents from 'styled-components';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import CloseIcon from '@mui/icons-material/Close';

const Gallery = styledComponents.div`
  margin: 0;
  padding: 0;

  @media only screen and (max-width: 600px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const GalleryModal = styled(Modal)`
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;

  .MuiBackdrop-root {
    background: rgb(0, 0, 0);
    @media only screen and (max-width: 600px) {
      background: black;
    }
  }

  & :focus {
    outline: none;
  }
`;

const ClosedGallery = styled(ImageList)`
  height: auto;
  width: 30%;
  @media only screen and (max-width: 600px) {
    width: 80%;
  }
`;

const Image = styledComponents.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const OpenGallery = styledComponents.div`
  padding: 1em;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Close = styled(CloseIcon)`
  color: #ffb76b;
  cursor: pointer;
  font-size: 3em;
`;

const CustomImgListItem = styled(ImageListItem)`
  &:last-child img {
    background: grey;
    opacity: 0.3;
  }
`;

const Fig = styledComponents.figure`
  cursor: pointer;
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  position: relative;

  & > figcaption {
    font-size: 1.5em;
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    text-align: center;
    color: ${(props) => props.theme.palette.primary.text};
  }
`;

const PhotoGallery = ({ images }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Gallery>
      {(isOpen && (
        <GalleryModal open={isOpen}>
          {images && (
            <OpenGallery>
              <Close onClick={() => setIsOpen(false)} />
              <Box
                sx={{
                  margin: '0 auto',
                  width: '80vw',
                  height: '80vh',
                  overflowY: 'scroll'
                }}
              >
                <ImageList variant="masonry" cols={2} gap={10}>
                  {images.map((image) => (
                    <ImageListItem key={image}>
                      <Image
                        src={`${image}?w=248&fit=crop&auto=format`}
                        srcSet={`${image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        alt={image}
                        loading="lazy"
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </Box>
            </OpenGallery>
          )}
        </GalleryModal>
      )) || (
        <ClosedGallery cols={3} gap={8}>
          {images.slice(0, 5).map((image, i) => (
            <CustomImgListItem onClick={() => setIsOpen(true)} key={image}>
              <Fig>
                <Image src={image} srcSet={image} alt={image} loading="lazy" />
                {i === 4 && <figcaption>+{images.length - 5}</figcaption>}
              </Fig>
            </CustomImgListItem>
          ))}
        </ClosedGallery>
      )}
    </Gallery>
  );
};

export default PhotoGallery;
