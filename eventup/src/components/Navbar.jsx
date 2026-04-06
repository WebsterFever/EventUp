import { useState } from "react";
import styled from "styled-components";

function Navbar({ onNavigate }) {
  const [open, setOpen] = useState(false);

  return (
    <Nav>
      <Logo>EventUp</Logo>

    
      <Burger onClick={() => setOpen(!open)}>
        ☰
      </Burger>

  
      <Menu open={open}>
        <NavItem onClick={() => onNavigate("home")}>Home</NavItem>
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

const Logo = styled.h2`
  font-size: 18px;
`;


const Burger = styled.div`
  font-size: 24px;
  cursor: pointer;

  display: block;

  /* desktop escondido */
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

  display: ${({ open }) => (open ? "flex" : "none")};
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

const NavItem = styled.p`
  padding: 10px;
  cursor: pointer;

  &:hover {
    color: #00bcd4;
  }
`;