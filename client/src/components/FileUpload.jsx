import { useState } from 'react';

const FileUpload = ({ type, onPickFile }) => {
  const [previewFile, setPreviewFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      if (type === 'multiple') {
        //   setPreviewFile(event.target.files);
        //   onPickFile(event.target.files);
      } else {
        setPreviewFile(URL.createObjectURL(event.target.files[0]));
        onPickFile(event.target.files[0]);
        URL.revokeObjectURL(event.target.files[0]);
      }
    } else {
      setPreviewFile(null);
    }
  };

  return (
    <div>
      <div>
        {previewFile && <img src={previewFile} alt="preview" height="100px" />}
      </div>
      <input
        name="fileupload"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default FileUpload;
