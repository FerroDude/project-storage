import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom';
import HomeView from './views/Home.jsx';
import SignInView from './views/SignIn.jsx';
import SignUpView from './views/SignUp';
import { useState, useEffect } from 'react';
import ProfileView from './views/Profile';
import SettingsView from './views/Settings';
import StorageCreateView from './views/StorageCreate';
import { signOut } from './services/authentication';
import Navigation from './components/Navigation/index.jsx';
import {
  loadAuthenticatedUser,
  editUser,
  getUser,
  deleteUser
} from './services/user.js';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import './App.scss';

function App() {
  //setting state for user with hooks
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
    await signOut();
    setIsLoaded(false);
    setUser(null);
  };

  return (
    <div className="App">
      <h1>PROJECT STORAGE</h1>
      {(!isLoaded && <div>No User</div>) || (
        <h2>Name: {`${user.fName} ${user.lName}`}</h2>
      )}

      <BrowserRouter>
        <Navigation user={user} handleSignOut={handleSignOut} />
        <Switch>
          <Route
            exact
            path="/signIn"
            render={(props) => (
              <SignInView
                {...props}
                onAuthenticationChange={handleAuthenticationChange}
              />
            )}
          />
          <Route
            exact
            path="/signUp"
            render={(props) => (
              <SignUpView
                {...props}
                onAuthenticationChange={handleAuthenticationChange}
              />
            )}
          />
          <Route
            exact
            path="/profile"
            render={(props) => <ProfileView {...props} user={user} />}
          />
          <Route
            exact
            path="/settings"
            render={(props) => (
              <SettingsView {...props} onEditUser={handleEditUser} />
            )}
          />
          <Route exact path="/storage/create" component={StorageCreateView} />
          <Route exact path="/" component={HomeView} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

<div></div>;
export default App;
