import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import HomeView from './views/Home.jsx';
import SignInView from './views/SignIn.jsx';
import SignUpView from './views/SignUp';
import { useState, useEffect } from 'react';
import ProfileView from './views/Profile';
import SettingsView from './views/Settings';
import {
  loadAuthenticatedUser,
  editUser,
  getUser,
  deleteUser
} from './services/user.js';
import './App.scss';

function App() {
  const [user, setUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const loadUser = async () => {
    const user = await loadAuthenticatedUser();
    setUser(user);
    setIsLoaded(true);
  };

  useEffect(() => {
    loadUser();
  }, []);

  const handleAuthenticationChange = async (user) => {
    setUser(user);
    setIsLoaded(true);
    console.log('user', user);
  };

  const handleEditUser = async (user) => {
    const updatedUser = await editUser(user);
    setUser(updatedUser);
  };

  const handleSignOut = async () => {
    await deleteUser();
    setUser(null);
    setIsLoaded(false);
  };

  return (
    <div className="App">
      <h1>PROJECT STORAGE</h1>
      {(!user && <div>No User</div>) || (
        <h2>Name: {`${user.Fname} ${user.Lname}`}</h2>
      )}

      <BrowserRouter>
        <Link to="/">Home</Link>
        <Link to="signIn">Sign In</Link>
        <Link to="signUp">Sign Up</Link>
        <Switch>
          <Route exact path="/" component={HomeView} />
          <Route exact path="/signIn" component={SignInView} />
          <Route
            exact
            path="/signUp"
            render={(props) => (
              <SignUpView
                {...props}
                handleAuthenticationChange={handleAuthenticationChange()}
              />
            )}
          />
          <Route exact path="/profile" component={ProfileView} />
          <Route exact path="/settings" component={SettingsView} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
