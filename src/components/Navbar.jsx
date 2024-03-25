import React from 'react';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import Avatar from '@mui/material/Avatar';
import { AccountCircle, Assignment, Settings, ExitToApp, Notifications } from '@mui/icons-material';
import 'bootstrap/dist/css/bootstrap.min.css';

const NavBar = () => {
  return (
    <Navbar bg="light" expand="sm" className="m-0">
      <Navbar.Brand href="#">Brand</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarCollapse" />
      <Navbar.Collapse id="navbarCollapse" className="justify-content-between position-static">
        <Nav className="nortifications">
          <Nav.Link href="#">Home</Nav.Link>
         
        </Nav>
        <Nav className="profile">
        <Nav.Link href="#">
            <Notifications /> Notifications
          </Nav.Link>
          <Dropdown style={{ marginRight: '15px' }}>
            <Dropdown.Toggle
              variant="secondary"
              id="dropdown-basic"
              as={CustomToggle}
            >
              <Avatar>
                {/* <AccountCircle /> */}
              </Avatar>
            </Dropdown.Toggle>

            <Dropdown.Menu
              style={{ transform: 'translateX(-70%)', marginTop: '5px' }}
            >
              <Dropdown.Item href="#">
                <Assignment /> Reports
              </Dropdown.Item>
              <Dropdown.Item href="#">
                <Settings /> Settings
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item style={{ color: 'red' }} href="#">
                <ExitToApp /> Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

// CustomToggle component to match the styling of AccountCircle
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href="#"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </a>
));

export default NavBar;
