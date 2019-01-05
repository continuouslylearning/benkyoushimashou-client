import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearAuth } from '../../actions/auth';
import { clearAuthToken } from '../../local-storage';
import './Header.css';
import signoutIcon from '../../images/sign-out.svg';

export class Header extends React.Component {
	static propTypes = {
		loggedIn: PropTypes.bool.isRequired
	};

	logOut = () => {
		this.props.dispatch(clearAuth());
		clearAuthToken();
	}
 
	render = () => {
		let logOutButton = (
			<div className='logout'>
				<b>
					<button className="logout-button" onClick={() => this.logOut()}>
						<img src={signoutIcon} alt='sign out'/>
						<span>Logout</span>
					</button>
				</b>
			</div>
		);

		return (
			<header className="header-bar">
					<h1><Link to='/'>勉強しましょう!</Link></h1>
				{this.props.loggedIn && logOutButton}
			</header>
		);
	}
}

const mapStateToProps = (state) => ({
	loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(Header);
