import React from 'react';
import { connect } from 'react-redux';
import { clearAuth } from '../actions/auth';
import { clearAuthToken } from '../local-storage';
import './header.css';

export class HeaderBar extends React.Component {
  logOut() {
    this.props.dispatch(clearAuth());
    clearAuthToken();
  }

  render() {
    let logOutButton = <button className="logout-button" onClick={() => this.logOut()}>Log out</button>;

    return (
      <header className="header-bar">
        <h1>勉強しましょう!</h1>
        {this.props.loggedIn && logOutButton}
      </header>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
  username: state.auth.currentUser ? state.auth.currentUser.username : null,
});

export default connect(mapStateToProps)(HeaderBar);
