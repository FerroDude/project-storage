import { useState, useEffect, useRef } from 'react';
import Carousel from './Carousel';
import styledComponents from 'styled-components';

const FilePicker = styledComponents.div`
  background: rgba(255, 127, 4, 0.07);
  width: 100%;
  border-radius: 5px;
  padding: 1em 1em;
  margin: 1em 0;
  font-size: 1em;
  color: rgba(255, 127, 4, 1);
  border: 1px solid rgba(255, 127, 4, 0.3);
  cursor: pointer;
`;

const FileUpload = ({ type, onPickFile }) => {
  const [previewFiles, setPreviewFiles] = useState(null);
  const fileInput = useRef(null);

  useEffect(() => {
    return () => {
      if (previewFiles) {
        for (let i = 0; i < previewFiles.length; i++) {
          URL.revokeObjectURL(previewFiles[i]);
          setPreviewFiles(null);
        }
      }
    };
  });

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files) {
      if (type === 'multiple') {
        let previews = [];
        for (let i = 0; i < files.length; i++) {
          previews.push(URL.createObjectURL(files[i]));
        }
        setPreviewFiles(previews);
        onPickFile(files);
      } else {
        setPreviewFiles(URL.createObjectURL(files[0]));
        onPickFile(files[0]);
        URL.revokeObjectURL(files[0]);
      }
    }
  };

  const handleClick = (event) => {
    fileInput.current.click();
  };

  return (
    <div>
      {previewFiles && <Carousel images={previewFiles} type={type} />}
      <FilePicker onClick={handleClick}>Click to select image(s)</FilePicker>
      <input
        style={{ display: 'none' }}
        name="fileupload"
        type="file"
        ref={fileInput}
        accept="image/*"
        onChange={handleFileChange}
        multiple={type === 'multiple'}
      />
    </div>
  );
};

export default FileUpload;
