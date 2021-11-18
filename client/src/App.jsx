import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomeView from './views/Home.jsx';
import SignInView from './views/SignIn.jsx';
import SignUpView from './views/SignUp';
import { useState, useEffect } from 'react';
import StorageView from './views/Storage';
import ProfileView from './views/Profile';
import SettingsView from './views/Settings';
import StorageListView from './views/StorageList.jsx';
import StorageCreateView from './views/StorageCreate';
import StorageManagementView from './views/StorageManagement';
import { signOut } from './services/authentication';
import Navigation from './components/Navigation/index.jsx';
import { loadAuthenticatedUser, editUser } from './services/user.js';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import './App.scss';
import styled from 'styled-components';
import Navbar from './components/Navbar.jsx';

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
          <Navbar />
          <h1>PROJECT STORAGE</h1>
          {(!isLoaded && <div>No User</div>) || (
            <h2>Name: {`${user.fName} ${user.lName}`}</h2>
          )}
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
              render={(props) => <StorageCreateView {...props} />}
            />
            <ProtectedRoute
              path="/storage/:id/manage"
              authorized={!isLoaded || (user && user.role === 'landlord')}
              redirect="/signUp"
              render={(props) => <StorageManagementView {...props} />}
            />
            <ProtectedRoute
              path="/storage/list"
              authorized={!isLoaded || (user && user.role === 'landlord')}
              redirect="/signUp"
              render={(props) => <StorageListView {...props} />}
            />
            <ProtectedRoute
              path="/storage/:id"
              authorized={!isLoaded || user}
              redirect="/signUp"
              render={(props) => <StorageView {...props} />}
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
