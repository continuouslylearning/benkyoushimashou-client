import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions/auth';
import Loading from '../Loading/Loading';

export default () => {
	const dispatch = useDispatch();
	const loggedIn = useSelector(state => state.auth.currentUser !== null);
	const error = useSelector(state => state.auth.error);

	useEffect(() => {
		dispatch(login('demouser', 'password'));
	}, [dispatch]);

	if (error !== null) {
		return <Redirect to='/' />
	}

	if (loggedIn) {
		return <Redirect to='/dashboard' />;
	}

	return (
		<div className='landing'>
			<div className='landing-content'>
				<Loading/>
			</div>
		</div>
	);
}
