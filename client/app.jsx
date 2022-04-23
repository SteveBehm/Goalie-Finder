import React from 'react';
import Home from './pages/home';
import AppNavbar from './components/navbar';
import EditProfileForm from './pages/edit-profile-form';
import SignIn from './pages/SignIn';
import Chat from './pages/chat';
import decodeToken from './lib/decode-token';
import parseRoute from './lib/parse-route';
import { io } from 'socket.io-client';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuthorizing: true,
      notifications: [],
      route: parseRoute(window.location.hash)
    };
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleUsernameClick = this.handleUsernameClick.bind(this);
  }

  componentDidMount() {
    // listen for hash change events and update state accordingly
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
    const token = window.localStorage.getItem('react-context-jwt');
    const user = token ? decodeToken(token) : null;
    this.setState({ user, isAuthorizing: false });

    this.socket = io.connect('/notifications', {
      auth: {
        token: window.localStorage.getItem('react-context-jwt')
      }
    });

    const { socket } = this;

    socket.on('notification', data => {
      this.setState({
        notifications: this.state.notifications.concat(data)
      });
    });
  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('react-context-jwt', token);
    this.setState({
      user,
      route: parseRoute('#home')
    });
    // get request for notifications
    fetch(`api/notifications/${user.userId}`, {
      method: 'GET',
      headers: {
        'X-Access-Token': window.localStorage.getItem('react-context-jwt')
      }
    })
      .then(res => res.json())
      .then(notifications => this.setState({
        notifications
      }));
  }

  handleUsernameClick(event) {
    const senderId = event.target.getAttribute('data-id');
    fetch(`/api/notifications/${senderId}`, {
      method: 'DELETE',
      headers: {
        'X-Access-Token': window.localStorage.getItem('react-context-jwt')
      }
    });

    /*
    loop through the notifications array
    if the senderId of an array element is equal to senderId
    take it out of the array
    */
    const notificationsArr = this.state.notifications;
    for (let i = 0; i < notificationsArr.length; i++) {
      if (notificationsArr[i].senderId === parseInt(senderId)) {
        const targetIndex = notificationsArr.indexOf(notificationsArr.i);
        notificationsArr.splice(targetIndex, 1);
      }
    }
    this.setState({
      notifications: notificationsArr
    });
  }

  renderPage() {
    const { route, notifications } = this.state;
    const to = route.params.get('to');

    if (route.path === '') {
      return <SignIn handleSignIn={this.handleSignIn} />;
    }
    if (route.path === 'home') {
      return (
      <>
      <AppNavbar notifications={notifications} to={to} handleClick={this.handleUsernameClick}/>
      <Home />);
      </>
      );
    }
    if (route.path === 'edit-profile') {
      const editId = route.params.get('userId');
      const userId = this.state.user.userId;
      return (
        <>
          <AppNavbar notifications={notifications} to={to} handleClick={this.handleUsernameClick}/>
          <EditProfileForm editId={editId} userId={userId} />
        </>
      );
    }
    if (route.path === 'chat') {
      const userId = this.state.user.userId;
      return (
        <Chat userId={userId} to={to}/>
      );
    }
  }

  // { this.renderPage() }
  render() {
    if (this.state.isAuthorizing) return null;
    return (
      <>
      { this.renderPage() }
      </>
    );
  }
}
