import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

// This is the class that will generate the method to create the Nabar
// the navbar is a bootstrap react component
// it has a logo and two links when seen on a desktop
// it has a logo and hamburger menu when seen in mobile few
// the hamburger menu drops down to see the two links
export default class AppNavbar extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect className="dark-color" expand="lg" variant="dark">
        <Container>
          <Navbar.Brand href="#home" className='logo'>Goalie Finder</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
            </Nav>
            <Nav>
              <Nav.Link className='edit-profile' href="#edit-profile">Edit Profile</Nav.Link>
              <Nav.Link className='sign-out' href="#sign-out">Sign Out</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}
