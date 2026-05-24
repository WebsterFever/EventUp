import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import {
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { auth } from "../service/firebase";

function Navbar() {
  const [open, setOpen] = useState(false);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <Nav>
      <Logo to="/">
        EventUp
      </Logo>

      <Burger onClick={() => setOpen(!open)}>
        ☰
      </Burger>

      <Menu open={open}>
        <StyledLink to="/">
          Home
        </StyledLink>

        {!user && (
          <>
            <StyledLink to="/cadastro">
              Cadastro
            </StyledLink>

            <StyledLink to="/login">
              Login
            </StyledLink>
          </>
        )}

        {user && (
          <LogoutButton onClick={handleLogout}>
            Logout
          </LogoutButton>
        )}
      </Menu>
    </Nav>
  );
}

export default Navbar;

const Nav = styled.nav`
  background: black;
  color: white;

  padding: 15px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  position: relative;
`;

const Burger = styled.div`
  font-size: 24px;

  cursor: pointer;

  display: block;

  @media (min-width: 768px) {
    display: none;
  }
`;

const Menu = styled.div`
  position: absolute;

  top: 60px;
  left: 0;

  width: 100%;

  background: black;

  display: ${({ open }) =>
    open ? "flex" : "none"};

  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    display: flex;

    position: static;

    flex-direction: row;

    gap: 20px;

    width: auto;
  }
`;

const StyledLink = styled(Link)`
  padding: 10px;

  color: white;

  text-decoration: none;

  font-size: 16px;

  &:hover {
    color: #00bcd4;
  }
`;

const LogoutButton = styled.button`
  background: transparent;

  border: none;

  color: white;

  cursor: pointer;

  font-size: 16px;

  padding: 10px;

  &:hover {
    color: #00bcd4;
  }
`;

const Logo = styled(Link)`
  color: white;

  text-decoration: none;

  font-size: 20px;

  font-weight: bold;
`;