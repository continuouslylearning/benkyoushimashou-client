import React from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import HeaderBar from '../Header/Header';
import Demo from '../Demo/Demo';
import Landing from '../Landing/Landing';
import LoginPage from '../Login/LoginPage';
import Dashboard from '../Dashboard/Dashboard';
import RegistrationPage from '../Registration/RegistrationPage';
import './App.css';

const App = () => {
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

export default withRouter(App);