import { uploadMultipleFiles } from '../services/fileupload';
import { useState } from 'react';

const PhotoGallery = () => {
  const [images, setImages] = useState(null);
  const [files, setFiles] = useState(null);

  const handleImageChange = (event) => {
    const images = event.target.files;
    setFiles(images);
  };

  const uploadImages = async () => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('pictures', files[i]);
    }
    const pics = await uploadMultipleFiles(formData);
    setImages(pics);
  };

  return (
    <div>
      <h1>Gallery</h1>
      <input
        name="profilePicture"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        multiple
      />
      <button onClick={uploadImages}>Submit</button>
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
