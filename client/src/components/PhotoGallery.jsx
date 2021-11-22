import { useState } from 'react';
import { styled } from '@mui/material/styles';
import styledComponents from 'styled-components';
import Modal from '@mui/material/Modal';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import CloseIcon from '@mui/icons-material/Close';

const Gallery = styledComponents.div`
  margin: 0;
  padding: 0;
`;

const GalleryModal = styled(Modal)`
  background: rgba(0, 0, 0, 0.88);
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
`;

const CustomImageList = styled(ImageList)`
  padding: 0;
  margin: 1.5em auto;
  height: 80%;
  width: 80%;
`;

const ClosedGallery = styled(ImageList)`
  height: auto;
  width: 30%;
  @media only screen and (max-width: 600px) {
    width: 100%;
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
  font-size: 3em;
`;

const CustomImgListItem = styled(ImageListItem)`
  &:last-child img {
    opacity: 0.5;
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
  }
`;

const PhotoGallery = ({ images }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Gallery>
      {isOpen && (
        <GalleryModal open={isOpen}>
          {images && (
            <OpenGallery>
              <Close onClick={handleOpen} />
              <CustomImageList variant="masonry" cols={4} gap={8}>
                {images.map((image) => (
                  <ImageListItem key={image}>
                    <Image src={`${image}?fit=crop&auto=format`} alt={image} />
                  </ImageListItem>
                ))}
              </CustomImageList>
            </OpenGallery>
          )}
        </GalleryModal>
      )}
      <ClosedGallery cols={3} gap={8}>
        {images.slice(0, 5).map((image, i) => (
          <CustomImgListItem onClick={handleOpen} key={image}>
            <Fig>
              <Image src={image} srcSet={image} alt={image} loading="lazy" />
              {i === 4 && <figcaption>+{images.length - 5}</figcaption>}
            </Fig>
          </CustomImgListItem>
        ))}
      </ClosedGallery>
    </Gallery>
  );
};

export default PhotoGallery;
