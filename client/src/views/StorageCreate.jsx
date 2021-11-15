const StorageCreateView = () => {
  return (
    <div>
      <form>
        <label htmlFor="input-lName">Last name</label>
        <input
          id="input-lName"
          type="text"
          placeholder="Last name"
          name="lName"
          value={user.lName}
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
};

export default StorageCreateView;
