import React from 'react';
import { connect } from  'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Error from '../Error/Error';
import './Landing.css';

const Landing = (props) => {
	if (props.error !== null) {
		return <Error />;
	}

	if (props.loggedIn) {
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

const mapStateToProps = (state) => {
	return {
		error: state.auth.error,
		loggedIn: state.auth.currentUser !== null
	};
};

export default connect(mapStateToProps)(Landing);
