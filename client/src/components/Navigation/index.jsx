import { Link } from 'react-router-dom';

const Navigation = (props) => {
  return (
    <nav className="Navigation">
      <Link to="/">Home</Link>
      <Link to="/storage/list">Storages list</Link>

      {(props.user && (
        <>
          <Link to="/profile">Profile</Link>
          {props.user.role === 'landlord' && (
            <>
              <Link to="/storage/create">Create storage</Link>
            </>
          )}
          <Link to="/">
            {' '}
            <button onClick={props.handleSignOut}>Sign out</button>
          </Link>
        </>
      )) || (
        <>
          <Link to="/signUp">Sign Up</Link>
          <Link to="/signIn">Sign In</Link>
        </>
      )}
    </nav>
  );
};

export default Navigation;
