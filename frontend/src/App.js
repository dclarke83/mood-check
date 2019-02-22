import React, { Component } from 'react';
import { Snackbar } from 'react-redux-snackbar';
import CheckInPage from './CheckInPage';

class App extends Component {
  render() {
    return (
      <div>
        <CheckInPage />
        <Snackbar />
      </div>
    );
  }
}

export default App;
