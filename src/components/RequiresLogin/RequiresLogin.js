import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Loading from '../Loading/Loading';

export default () => (Component) => {
	function RequiresLogin(props) {
		const authenticating = useSelector(state => state.auth.loading);
		const loggedIn = useSelector(state => state.auth.currentUser !== null);
		const error = useSelector(state => state.auth.error);
		const { ...passThroughProps } = props;
		
		if (authenticating) {
			return <Loading/>;
		} else if (!loggedIn || error) {
			return <Redirect to="/" />;
		}

		return <Component {...passThroughProps} />;
	}

	const displayName = Component.displayName || Component.name || 'Component';
	RequiresLogin.displayName = `RequiresLogin(${displayName})`;

	return RequiresLogin;
};
