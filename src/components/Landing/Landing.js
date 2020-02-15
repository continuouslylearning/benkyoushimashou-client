import React from 'react';
import { useSelector } from  'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Error from '../Error/Error';
import './Landing.css';

export default () => {
	const error = useSelector(state => state.auth.error);
	const loggedIn = useSelector(state => state.auth.currentUser != null);

	if (error !== null) {
		return <Error />;
	}

	if (loggedIn) {
		return <Redirect to='/dashboard'/>;
	}

	return (
		<div className='landing'>
			<div className='landing-content'>
				<h2 className='landing-header'>
					Toss away your flash cards. 
					Master hiragana and katakana with spaced repetition!
				</h2>
				<div className='landing-buttons'>
					<Link to="/register"><button>SIGN UP</button></Link>
					<Link to="/demo"><button>TRY A DEMO</button></Link>
				</div>
			</div>
		</div>
	);
}
