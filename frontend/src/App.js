import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Snackbar } from 'react-redux-snackbar';
import NavBar from './NavBar';
import CheckInPage from './CheckInPage';

class App extends Component {
  render() {
    return (
      // <div style={{backgroundColor: '#eee', height: '100%', position: 'absolute', top: '0', bottom: '0', right: '0', left: '0' }}>
      <div>
        <Router>
          <div>
            <NavBar />
            <div style={{ marginTop: '64px' }}>
              <Route exact path='/checkin' render={() => <CheckInPage /> } />
            </div>
          </div>
        </Router>
        <Snackbar />
      </div>
    );
  }
}

export default App;
