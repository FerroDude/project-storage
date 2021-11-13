const ProfileView = () => {
  return (
    <div>
      <h2>Profile View</h2>
      <h3>johnny</h3>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYSprYSGY7wv-OyUUMHyEYhPtVO1juHDCtVg&usqp=CAU"
        alt={`${'johnny'}'s profile`}
        height="150px"
        width="150px"
      />
      <h3>Personal details</h3>
      <br />
      <strong>First name: </strong>
      <span>John</span>
      <br />
      <strong>Last name: </strong>
      <span>Doe</span>
      <br />
      <h3>Contact information</h3>
      <strong>Email: </strong>
      <span>gijo57</span>
      <br />
      <strong>Phone number: </strong>
      <span>+1-202-555-0123</span>
      <br />
    </div>
  );
};

export default ProfileView;
