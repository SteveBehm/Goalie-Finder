import React from 'react';
import Home from './pages/home';
// import AppNavbar from './components/navbar';
import EditProfileForm from './pages/edit-profile-form';
import SignIn from './pages/SignIn';
import parseRoute from './lib/parse-route';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    // listen for hash change events and update state accordingly
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('react-context-jwt', token);
    this.setState({
      user
    });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <Home />;
    }
    if (route.path === 'edit-profile') {
      const editId = route.params.get('userId');
      return <EditProfileForm editId={editId} />;
    }
  }

  // <AppNavbar />
  // { this.renderPage() } don't forget to put this back
  render() {
    return (
      <>
        <SignIn />
      </>
    );
  }
}
