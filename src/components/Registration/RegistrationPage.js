import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';
import '../Form.css';

export const RegistrationPage = (props) => {
	if (props.loggedIn) {
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

const mapStateToProps = (state) => ({
	loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(RegistrationPage);
