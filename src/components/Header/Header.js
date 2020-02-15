import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { clearAuth } from '../../actions/auth';
import { clearAuthToken } from '../../local-storage';
import './Header.css';
import signoutIcon from '../../images/sign-out.svg';

export default () => {
	const loggedIn = useSelector(state => state.auth.currentUser != null);

	const logOut = () => {
		dispatch(clearAuth());
		clearAuthToken();
	}

	let logOutButton = (
		<div className='logout'>
			<b>
				<button className="logout-button" onClick={() => logOut()}>
					<img src={signoutIcon} alt='sign out'/>
					<span>Logout</span>
				</button>
			</b>
		</div>
	);

	return (
		<header className="header-bar">
				<h1><Link to='/'>勉強しましょう!</Link></h1>
			{loggedIn && logOutButton}
		</header>
	);
}