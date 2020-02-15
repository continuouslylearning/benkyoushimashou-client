import React from 'react';
import { useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';
import '../Form.css';

export default (props) => {
	const loggedIn = useSelector(state => state.auth.currentUser !== null);
	if (loggedIn) {
		return <Redirect to="/dashboard" />;
	}

	return (
		<div className="landing">
			<div className="form-container">
				<h3 className="form-header">Sign up</h3>
				<RegistrationForm className="signup-form" />
				<span className="form-button">Already have an account? <Link to="/login">Login</Link></span>
			</div>
		</div>
	);
}
