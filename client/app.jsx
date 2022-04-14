import React from 'react';
import Home from './pages/home';
import AppNavbar from './components/navbar';
import EditProfileForm from './pages/edit-profile-form';

export default class App extends React.Component {
  render() {
    return (
      <>
        <AppNavbar />
        <Home />
        <EditProfileForm />
      </>
    );
  }
}
