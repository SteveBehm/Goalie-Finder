import React from 'react';
import Home from './pages/home';
import AppNavbar from './components/navbar';
import EditProfileForm from './pages/edit-profile-form';
import SignIn from './pages/SignIn';
import Chat from './pages/chat';
import decodeToken from './lib/decode-token';
import parseRoute from './lib/parse-route';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuthorizing: true,
      route: parseRoute(window.location.hash)
    };
    this.handleSignIn = this.handleSignIn.bind(this);
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
  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('react-context-jwt', token);
    this.setState({
      user,
      route: parseRoute('#home')
    });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <SignIn handleSignIn={this.handleSignIn} />;
    }
    if (route.path === 'home') {
      return (
      <>
      <AppNavbar />
      <Home />);
      </>
      );
    }
    if (route.path === 'edit-profile') {
      const editId = route.params.get('userId');
      const userId = this.state.user.userId;
      return (
        <>
          <AppNavbar />
          <EditProfileForm editId={editId} userId={userId} />
        </>
      );
    }
    if (route.path === 'chat') {
      const userId = this.state.user.userId;
      return (
        <Chat userId={userId}/>
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
