const FileUpload = ({ type, onPickFile }) => {
  return (
    <div>
      <input
        name="fileupload"
        type="file"
        accept="image/*"
        onChange={
          type === 'multiple'
            ? (event) => onPickFile(event.target.files)
            : (event) => onPickFile(event.target.files[0])
        }
        multiple={type === 'multiple'}
      />
    </div>
  );
};

export default FileUpload;
