import { useState, useEffect, useRef } from 'react';
import styledComponents from 'styled-components';

const FilePicker = styledComponents.div`
  background: grey;
  width: 100px;
  height: 100px;
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
      {previewFiles && (
        <div>
          {type === 'multiple' ? (
            <div>
              {previewFiles.map((file) => (
                <img key={file.name} src={file} alt="preview" height="100px" />
              ))}
            </div>
          ) : (
            <img src={previewFiles} alt="preview" height="100px" />
          )}
        </div>
      )}
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
