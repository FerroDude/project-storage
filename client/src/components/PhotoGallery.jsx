import { useState } from 'react';
import { styled } from '@mui/material/styles';
import styledComponents from 'styled-components';
import Modal from '@mui/material/Modal';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

const PhotoGallery = ({ images }) => {
  const [isOpen, setIsOpen] = useState(false);

  const GalleryModal = styled(Modal)``;

  const CustomImageList = styled(ImageList)`
    height: 80%;
    width: 80%;
  `;

  const Image = styledComponents.img`
    width: 25vw;
  `;

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {isOpen && (
        <GalleryModal onBackdropClick={() => setIsOpen(false)} open={isOpen}>
          {images && (
            <CustomImageList cols={3} rowHeight={164}>
              {images.map((image) => (
                <ImageListItem key={image}>
                  <Image src={`${image}`} srcSet={`${image}`} alt={image} />
                </ImageListItem>
              ))}
            </CustomImageList>
          )}
        </GalleryModal>
      )}
      {images && (
        <div>
          {images.map((image) => (
            <img
              onClick={handleOpen}
              key={image}
              src={image}
              alt="whatever"
              height="100px"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
