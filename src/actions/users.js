import axios from 'axios';
import { SubmissionError } from 'redux-form';

import { API_BASE_URL } from '../config';
import { authError, authRequest } from './auth';

export const registerUser = user => dispatch => {
  dispatch(authRequest());
  return axios({
    method: 'post',
    url: `${API_BASE_URL}/api/users`,
    data: user,
    headers: {
      'content-type': 'application/json'
    }
  })
    .catch(err => {
      dispatch(authError(err));
      let message;
      if (!err.response || err.response.status === 500) {
        message = 'Unable to register. Please try again later.';
      } else {
        message = err.response.data.message;
      }
      return Promise.reject(
        new SubmissionError({
          _error: message
        })
      );
    });
};
