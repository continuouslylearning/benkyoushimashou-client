import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import Loading from '../Loading/Loading';

class Demo extends React.Component {
	static propTypes = {
		error: PropTypes.object,
		loggedIn: PropTypes.bool.isRequired
	};

	componentDidMount = () => {
		return this.props.dispatch(login('demouser', 'password'));
	}

	render = () => {
		const { error, loggedIn } = this.props;

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
}

const mapStateToProps = state => ({
	loggedIn: state.auth.currentUser !== null,
	error: state.auth.error
});

export default connect(mapStateToProps)(Demo);