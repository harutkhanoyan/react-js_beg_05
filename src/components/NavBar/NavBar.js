import { Nav } from "react-bootstrap";
import { NavLink, } from 'react-router-dom';

const NavBar = () => {
  return (
    <Nav
      activeKey="/home"
    >
      <Nav.Item>
        <NavLink to="/"  activeStyle={{color: "red"}} exact >Home</NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink to="/contact"activeStyle={{color: "red"}} exact >Contact</NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink to="/about"activeStyle={{color: "red"}} exact >About Us</NavLink>
      </Nav.Item>
    </Nav>
  );
};

export default NavBar;
