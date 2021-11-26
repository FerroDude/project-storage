import { BrowserRouter } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { signOut } from './services/authentication';
import { loadAuthenticatedUser, editUser } from './services/user.js';
import styled from 'styled-components';
import Navbar from './components/Navbar.jsx';
import AllRoutes from './components/AllRoutes.jsx';
import './App.scss';

const Wrapper = styled.div`
  width: 100vw;
  height: 100%;
  font-family: 'Manrope', sans-serif;
  margin: 0;
`;

const Container = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  overflow-x: hidden;
`;

function App() {
  //setting state for user with hooks
  const [user, setUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  console.log(isLoaded);
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

          <AllRoutes
            user={user}
            isLoaded={isLoaded}
            handleAuthenticationChange={handleAuthenticationChange}
            handleEditUser={handleEditUser}
          />
        </Container>
      </BrowserRouter>
    </Wrapper>
  );
}
export default App;
