import React from 'react';
import { useSelector} from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import LoginForm from './LoginForm';

export default () => {
	const loggedIn = useSelector(state => state.auth.currentUser !== null);

	if (loggedIn) {
		return <Redirect to="/dashboard" />;
	}

	return (
		<div className="landing">
			<div className="form-container">
				<h3 className="form-header">
					Login
				</h3>
				<LoginForm className="login-form" />
				<span className="form-button">Don't have an account? <Link to="/register">Sign Up</Link></span>
			</div>
		</div>
	);
}