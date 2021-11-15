import { useState } from 'react';

const PhotoGallery = () => {
  const [images, setImages] = useState(null);

  return (
    <div>
      <h1>Gallery</h1>
      {images && (
        <div>
          {images.map((image) => (
            <img src={image} alt="whatever" height="100px" />
          ))}
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
