import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, Switch } from 'react-router-dom';

import HeaderBar from './header-bar';
import Demo from './demo';
import LandingPage from './landing-page';
import Dashboard from './dashboard/index';
import RegistrationPage from './registration-page';
import { refreshAuthToken } from '../actions/auth';
import './app.css';

export class App extends React.Component {
  componentDidUpdate(prevProps) {
    if (!prevProps.loggedIn && this.props.loggedIn) {
      this.startPeriodicRefresh();
    } else if (prevProps.loggedIn && !this.props.loggedIn) {
      this.stopPeriodicRefresh();
    }
  }

  componentWillUnmount() {
    this.stopPeriodicRefresh();
  }

  startPeriodicRefresh() {
    this.refreshInterval = setInterval(
      () => this.props.dispatch(refreshAuthToken()),
      60 * 60 * 1000
    );
  }

  stopPeriodicRefresh() {
    if (!this.refreshInterval) return;
    clearInterval(this.refreshInterval);
  }

  render() {
    return (
      <>
        <HeaderBar />
        <Switch>
          <Route exact path='/demo' component={Demo} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/register" component={RegistrationPage} />
          <Route path='/' component={LandingPage} />
        </Switch>

      </>
    );
  }
}

const mapStateToProps = state => ({
  hasAuthToken: state.auth.authToken !== null,
  loggedIn: state.auth.currentUser !== null
});

export default withRouter(connect(mapStateToProps)(App));
