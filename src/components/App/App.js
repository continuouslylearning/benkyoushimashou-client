import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, withRouter, Switch } from 'react-router-dom';
import HeaderBar from '../Header/Header';
import Demo from '../Demo/Demo';
import Landing from '../Landing/Landing';
import LoginPage from '../Login/LoginPage';
import Dashboard from '../Dashboard/Dashboard';
import RegistrationPage from '../Registration/RegistrationPage';
import { refreshAuthToken } from '../../actions/auth';
import './App.css';

export class App extends React.Component {
	static propTypes = {
		loggedIn: PropTypes.bool.isRequired
	};

	componentDidUpdate = (prevProps) => {
		if (!prevProps.loggedIn && this.props.loggedIn) {
			this.startPeriodicRefresh();
		} else if (prevProps.loggedIn && !this.props.loggedIn) {
			this.stopPeriodicRefresh();
		}
	}

	componentWillUnmount = () => {
		this.stopPeriodicRefresh();
	}

	startPeriodicRefresh = () => {
		this.refreshInterval = setInterval(
			() => this.props.dispatch(refreshAuthToken()),
			60 * 60 * 1000
		);
	}

	stopPeriodicRefresh = () => {
		if (this.refreshInterval) {
			clearInterval(this.refreshInterval);
		}
	}

	render = () => {
		return (
			<>
				<HeaderBar />
				<Switch>
					<Route exact path='/' component={Landing} />
					<Route exact path='/login' component={LoginPage} />
					<Route exact path='/demo' component={Demo} />
					<Route exact path="/dashboard" component={Dashboard} />
					<Route exact path="/register" component={RegistrationPage} />
					<Route path='/' component={LoginPage} />
				</Switch>
			</>
		);
	}
}

const mapStateToProps = state => ({
	loggedIn: state.auth.currentUser !== null
});

export default withRouter(connect(mapStateToProps)(App));
