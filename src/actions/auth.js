import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { SubmissionError } from 'redux-form';
import { API_BASE_URL } from '../config';
import { saveAuthToken, clearAuthToken } from '../local-storage';

export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';
export const setAuthToken = authToken => ({
	type: SET_AUTH_TOKEN,
	authToken
});

export const CLEAR_AUTH = 'CLEAR_AUTH';
export const clearAuth = () => ({
	type: CLEAR_AUTH
});

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const authRequest = () => ({
	type: AUTH_REQUEST
});

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const authSuccess = currentUser => ({
	type: AUTH_SUCCESS,
	currentUser
});

export const AUTH_ERROR = 'AUTH_ERROR';
export const authError = error => ({
	type: AUTH_ERROR,
	error
});

const storeAuthInfo = (authToken, dispatch) => {
	const decodedToken = jwtDecode(authToken);

	dispatch(setAuthToken(authToken));
	dispatch(authSuccess(decodedToken.user));
	saveAuthToken(authToken);
};

export const login = (username, password, fromForm) => async (dispatch) => {
	if (!fromForm) {
		dispatch(authRequest());
	}

	try {
		const res = await axios({
			data: { 
				username, 
				password 
			},
			headers: { 
				'Content-Type': 'application/json' 
			},
			method: 'POST',
			url: `${API_BASE_URL}/auth/login`
		});

		storeAuthInfo(res.data.authToken, dispatch);
	} catch(err) {
		let message;
		if (!err.response || err.response.status === 500) {
			message = 'Unable to login. Please try again later.';
		} else {
			message = err.response.data.message;
		}

		if (fromForm) {
			throw new SubmissionError({
				_error: message
			});
		} 

		dispatch(authError({ message }));
	}
};

export const refreshAuthToken = () => async (dispatch, getState) => {
	dispatch(authRequest());
	const authToken = getState().auth.authToken;

	try {
		const res = await axios({
			headers: { 
				Authorization: `Bearer ${authToken}`
			},
			method: 'POST',
			url: `${API_BASE_URL}/auth/refresh`
		});
		
		storeAuthInfo(res.data.authToken, dispatch);
	} catch(err) {
		let message;
		if (!err.response || err.response.status === 500) {
			message = 'Unable to login. Please try again later.';
		} else {
			message = err.response.data.message;
		}

		dispatch(authError({ message }));
		dispatch(clearAuth());
		clearAuthToken(authToken);
	}
};
