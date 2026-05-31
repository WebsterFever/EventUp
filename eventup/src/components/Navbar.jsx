import { useState } from "react";
import styled from "styled-components";

import {
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { auth } from "../service/firebase";

function Navbar({ user, onNavigate, onLogout }) {
  const [open, setOpen] = useState(false);

  const handleNavigation = (target) => {
    setOpen(false);
    onNavigate(target);
  };

  return (
    <Nav>
      <Logo type="button" onClick={() => handleNavigation("home")}>
        EventUp
      </Logo>

      <Burger onClick={() => setOpen(!open)}>
        ☰
      </Burger>

      <Menu open={open}>
        <NavButton type="button" onClick={() => handleNavigation("home")}>
          Home
        </NavButton>

        {!user && (
          <>
            <NavButton type="button" onClick={() => handleNavigation("cadastro")}>
              Cadastro
            </NavButton>

            <NavButton type="button" onClick={() => handleNavigation("login")}>
              Login
            </NavButton>
          </>
        )}

        {user && (
          <LogoutButton type="button" onClick={onLogout}>
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

const NavButton = styled.button`
  padding: 10px;

  color: white;

  text-decoration: none;

  font-size: 16px;

  border: none;
  background: none;
  cursor: pointer;

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

const Logo = styled.button`
  color: white;

  text-decoration: none;

  font-size: 20px;

  font-weight: bold;
`;