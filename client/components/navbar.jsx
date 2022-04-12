import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

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
              <Nav.Link href="#edit-profile">Edit Profile</Nav.Link>
              <Nav.Link href="#sign-out">Sign Out</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}
