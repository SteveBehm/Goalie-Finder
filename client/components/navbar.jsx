import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { OverlayTrigger, Popover } from 'react-bootstrap';

// This is the class that will generate the method to create the Nabar
// the navbar is a bootstrap react component
// it has a logo and two links when seen on a desktop
// it has a logo and hamburger menu when seen in mobile few
// the hamburger menu drops down to see the two links
export default class AppNavbar extends React.Component {

  render() {
    const usernameClick = this.props.handleClick;
    const popover = (
      <Popover id='popover-basic'>
        {
          this.props.notifications.map(notification => (
            <Popover.Header key={notification.senderId}>
              <a onClick={usernameClick} data-id={notification.senderId} href={`#chat?to=${notification.senderId}`} className='text-dark usernames'>{notification.username}</a>
            </Popover.Header>
          ))
        }
      </Popover>
    );

    return (
      <Navbar collapseOnSelect className="dark-color" expand="lg" variant="dark">
        <Container>
          <Navbar.Brand href="#home" className='logo'>Goalie Finder</Navbar.Brand>
          <OverlayTrigger trigger="click" placement="right" overlay={popover}>
            <a className='notification-popover'>
              <i className="text-light fa-regular fa-bell"></i>
              <div className={(this.props.notifications.length > 0) ? 'notification-circle' : 'd-none'}></div>
            </a>
          </OverlayTrigger>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
            </Nav>
            <Nav>
              <Nav.Link className='edit-profile' href="#edit-profile">Edit Profile</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}
