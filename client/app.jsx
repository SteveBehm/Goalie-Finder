import React from 'react';
import Home from './pages/home';
import AppNavbar from './components/navbar';
import EditProfileForm from './pages/edit-profile-form';
import parseRoute from './lib/parse-route';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

  render() {
    return (
      <>
        <AppNavbar />
        {this.renderPage()}
      </>
    );
  }
}
