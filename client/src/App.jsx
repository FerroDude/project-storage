import { BrowserRouter } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { signOut } from './services/authentication';
import { loadAuthenticatedUser, editUser } from './services/user.js';
import './App.scss';
import styled from 'styled-components';
import Navbar from './components/Navbar.jsx';
import AllRoutes from './components/AllRoutes.jsx';

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
          <Navbar user={user} handleSignOut={handleSignOut} />
          <h1>PROJECT STORAGE</h1>
          {(!isLoaded && <div>No User</div>) || (
            <h2>Name: {`${user.fName} ${user.lName}`}</h2>
          )}
          <AllRoutes
            user={user}
            handleAuthenticationChange={handleAuthenticationChange}
            handleEditUser={handleEditUser}
          />
        </Container>
      </BrowserRouter>
    </Wrapper>
  );
}

<div></div>;
export default App;
