import React from 'react';
import Home from './pages/home';
import AppNavbar from './components/navbar';

export default class App extends React.Component {
  render() {
    return (
      <>
        <AppNavbar />
        <Home />
      </>
    );
  }
}
