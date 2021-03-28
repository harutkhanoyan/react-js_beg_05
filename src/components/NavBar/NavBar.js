import { Nav } from "react-bootstrap";
import { NavLink, } from 'react-router-dom';

const navbarItems = [
  {
    to: "/",
    value: "Home"
  },
  {
    to: "/contact",
    value: "Contact"
  },
  {
    to: "/about",
    value: "About Us"
  }
]

const NavBar = () => {
  const navbarList = navbarItems.map((item, index)=>{
    return (
      <Nav.Item key={index}>
        <NavLink
          to={item.to}
          exact
          activeStyle={{color: "#acacac"}}
        >
          {item.value}
        </NavLink>
      </Nav.Item>
    )
  })
  return (
      <Nav activeKey="/home">
        {navbarList}
      </Nav>
    );
};

export default NavBar;
