const PhotoGallery = ({ images }) => {
  return (
    <div>
      <p>Gallery</p>
      {images && (
        <div>
          {images.map((image) => (
            <img key={image} src={image} alt="whatever" height="100px" />
          ))}
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
