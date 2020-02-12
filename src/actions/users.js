import axios from 'axios';
import { SubmissionError } from 'redux-form';
import { API_BASE_URL } from '../config';

export const registerUser = (user) => async (dispatch) => {
	try {
		await axios({
			data: user,
			headers: {
				'content-type': 'application/json'
			},
			method: 'POST',
			url: `${API_BASE_URL}/api/users`
		});
	} catch(err) {
		let message;
		if (!err.response || err.response.status === 500) {
			message = 'Unable to register. Please try again later.';
		} else {
			message = err.response.data.message;
		}

		throw new SubmissionError({
			_error: message
		});
	}
};
