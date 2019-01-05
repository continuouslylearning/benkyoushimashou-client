import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import LoginForm from './LoginForm';

export const LoginPage = (props) => {
	if (props.loggedIn) {
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

const mapStateToProps = state => ({
	loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LoginPage);
