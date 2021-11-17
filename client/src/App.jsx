import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom';
import HomeView from './views/Home.jsx';
import SignInView from './views/SignIn.jsx';
import SignUpView from './views/SignUp';
import { useState, useEffect } from 'react';
import ProfileView from './views/Profile';
import SettingsView from './views/Settings';
import { signOut } from './services/authentication';
import {
  loadAuthenticatedUser,
  editUser,
  getUser,
  deleteUser
} from './services/user.js';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import './App.scss';
import styled from 'styled-components';
import Navabar from './components/Navabar.jsx';

const Wrapper = styled.div`
  width: 100vw;
  font-family: 'Manrope', sans-serif;
  margin: 0;
  padding-top: 1em;
  background: #000;
`;
const Container = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  background: black;
`;

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
    <Wrapper>
      <BrowserRouter>
        <Container className="App">
          <Navabar />
          <h1>PROJECT STORAGE</h1>
          {(!isLoaded && <div>No User</div>) || (
            <h2>Name: {`${user.fName} ${user.lName}`}</h2>
          )}

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
            <Route exact path="/" component={HomeView} />
          </Switch>
        </Container>
      </BrowserRouter>
    </Wrapper>
  );
}

<div></div>;
export default App;
