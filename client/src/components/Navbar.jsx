import styledComponents from 'styled-components';
import MenuIcon from '@mui/icons-material/Menu';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ClearIcon from '@mui/icons-material/Clear';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Container = styledComponents.div`
  margin-bottom: 2em;
  display: flex;
  justify-content: space-around;
  width: 100%;
  position: relative;
  background: ${(props) => props.theme.palette.background.dark};
  box-shadow: ${(props) => props.theme.shadow};
`;

const Left = styledComponents.div`
  display: flex;
  align-items: center;
  flex: 2;
  padding-left: 10px;
`;
const CustomizedLocationIcon = styled((props) => <LocationOnIcon {...props} />)`
  color: orange;
  margin: ${(props) => props.theme.margin.icon};
`;

const CurrentLocation = styledComponents.span`
  font-size: 15px;  
  cursor: pointer; 
  text-decoration: none; 
  color: white; 
  background: #FFB76B; 
  background: -webkit-linear-gradient(to right, #FFB76B 13% , #FFA73D 18% , #FF7C00 90% , #FF7F04 40% ); 
  background: -moz-linear-gradient(to right, #FFB76B 13% , #FFA73D 18% , #FF7C00 90% , #FF7F04 40% ); background: linear-gradient(to right, #FFB76B 13% , #FFA73D 18% , #FF7C00 90% , #FF7F04 40% ); 
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  `;

const Right = styledComponents.div`
  flex: 1; 
  display: flex; 
  justify-content: flex-end; 
  position: relative; 
  padding-right: 10px;

  `;

const Button = styledComponents.button`
  background: none; 
  border: none; 
  cursor: pointer;
  `;

const CustomizedMenuIcon = styled((props) => <MenuIcon {...props} />)`
  color: ${(props) => props.theme.palette.primary.main};
  font-size: 35px;
`;

export const CustomizedCancelIcon = styled((props) => <ClearIcon {...props} />)`
  color: ${(props) => props.theme.palette.primary.main};
  font-size: 35px;
`;

const DropdownMenu = styledComponents.div`
  position: absolute; 
  height: calc(100vh - (37px + 1em)); 
  width: 100vw; 
  top: calc(37px + 1em); 
  background: ${(props) => props.theme.palette.background.main};
  transform: ${(props) =>
    props.isClicked ? 'translateX(0vw)' : 'translateX(100vw)'};
  transition: transform ease .5s;
  padding: 5em 0 0 0;
  z-index: 2;
`;

const UnorderedList = styledComponents.ul`
  width: 100% ;
  height: 70% ;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  list-style: none;
`;

const ListItem = styledComponents.li`
  text-align: center;
  width: 100%;
  line-height: 8em;
  & :hover {
    color: ${(props) => props.theme.palette.primary.main};
    background-color: ${(props) => props.theme.palette.background.dark};
  }
`;

const CustomizedNavLink = styledComponents((props) => <NavLink {...props} />)`
  text-decoration: none;
  display: block;
  width: 100%;
  height: 100%;
  color: ${(props) => props.theme.palette.primary.text};
  font-size: 1.2em;
  font-weight: 600;
`;

const Navbar = ({ handleSignOut, user }) => {
  const [isClicked, setIsClicked] = useState(false);

  function handleClick() {
    setIsClicked(!isClicked);
  }

  return (
    <Container>
      <DropdownMenu isClicked={isClicked}>
        <UnorderedList>
          <ListItem>
            <CustomizedNavLink
              onClick={() => {
                setIsClicked(false);
              }}
              to="/"
            >
              Home
            </CustomizedNavLink>
          </ListItem>

          {(user && (
            <>
              <ListItem>
                <CustomizedNavLink
                  onClick={() => {
                    setIsClicked(false);
                  }}
                  to="/profile"
                >
                  Profile
                </CustomizedNavLink>
              </ListItem>
              <ListItem>
                <CustomizedNavLink
                  onClick={() => {
                    setIsClicked(false);
                  }}
                  to="/storage/list"
                >
                  My Storages
                </CustomizedNavLink>
              </ListItem>

              {user.role === 'landlord' && (
                <>
                  <CustomizedNavLink
                    onClick={() => {
                      setIsClicked(false);
                    }}
                    to="/storage/create"
                  >
                    Create storage
                  </CustomizedNavLink>
                </>
              )}
              <ListItem>
                <CustomizedNavLink onClick={handleSignOut} to="/">
                  Sign Out
                </CustomizedNavLink>
              </ListItem>
            </>
          )) || (
            <>
              <ListItem>
                <CustomizedNavLink
                  onClick={() => {
                    setIsClicked(false);
                  }}
                  to="/signUp"
                >
                  Sign Up
                </CustomizedNavLink>
              </ListItem>
              <ListItem>
                <CustomizedNavLink
                  onClick={() => {
                    setIsClicked(false);
                  }}
                  to="/signIn"
                >
                  Sign In
                </CustomizedNavLink>
              </ListItem>
            </>
          )}
        </UnorderedList>
      </DropdownMenu>
      <Left>
        <CustomizedLocationIcon />
        <CurrentLocation as="a" href="#">
          Current User Location
        </CurrentLocation>
      </Left>
      <Right>
        <Button onClick={handleClick}>
          {isClicked ? <CustomizedCancelIcon /> : <CustomizedMenuIcon />}
        </Button>
      </Right>
    </Container>
  );
};

export default Navbar;
