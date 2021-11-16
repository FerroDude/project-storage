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
          <ProtectedRoute
            path="/signIn"
            authorized={!isLoaded || !user}
            redirect="/"
            render={(props) => (
              <SignInView
                {...props}
                onAuthenticationChange={handleAuthenticationChange}
              />
            )}
          />

          <ProtectedRoute
            path="/signUp"
            authorized={!isLoaded || !user}
            redirect="/"
            render={(props) => (
              <SignUpView
                {...props}
                onAuthenticationChange={handleAuthenticationChange}
              />
            )}
          />

          <ProtectedRoute
            path="/profile"
            authorized={isLoaded && user}
            redirect="/signIn"
            render={(props) => <ProfileView {...props} user={user} />}
          />
          <ProtectedRoute
            path="/settings"
            authorized={isLoaded && user}
            redirect="/signIn"
            render={(props) => (
              <SettingsView {...props} onEditUser={handleEditUser} />
            )}
          />
          <ProtectedRoute
            path="/storage/create"
            authorized={!isLoaded || (user && user.role === 'landlord')}
            redirect="/signUp"
            render={(props) => <StorageCreateView {...props} user={user} />}
          />
          <Route exact path="/" component={HomeView} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

<div></div>;
export default App;
