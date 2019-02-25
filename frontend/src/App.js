import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Snackbar } from 'react-redux-snackbar';
import NavBar from './ui/components/NavBar';
import CheckInPage from './pages/CheckInPage';
import InsightsPage from './pages/InsightsPage';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <NavBar />
            <div style={{ marginTop: '64px' }}>
              <Switch>
                <Route exact path='/checkin' render={() => <CheckInPage /> } />
                <Route exact path='/insights' render={() => <InsightsPage /> } />
                <Route render={() => <Redirect to='/checkin' /> } />
              </Switch>
            </div>
          </div>
        </Router>
        <Snackbar />
      </div>
    );
  }
}

export default App;
