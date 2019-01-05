import { API_BASE_URL } from '../config';
import axios from 'axios';
const questionsEndpoint = API_BASE_URL + '/api/questions';
export const FETCH_QUESTION_SUCCESS = 'FETCH_QUESTION_SUCCESS';
export const fetchQuestionSuccess = (question) => ({
  type: FETCH_QUESTION_SUCCESS,
  question,
});


export const fetchQuestion = () => (dispatch, getState) => {
  const token = getState().auth.authToken;

  return axios.get(
    questionsEndpoint,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
  )
    .then(({ data }) => {
      dispatch(fetchQuestionSuccess(data));
    });
};

export const answeredQuestion = (answeredCorrectly) => (dispatch, getState) => {
  const token = getState().auth.authToken;

  return axios.put(
    questionsEndpoint,
    { answeredCorrectly },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
};