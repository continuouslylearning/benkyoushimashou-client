import { API_BASE_URL } from '../config';
import axios from 'axios';
const questionsEndpoint = API_BASE_URL + '/api/questions';

export const FETCH_QUESTION_SUCCESS = 'FETCH_QUESTION_SUCCESS';
export const fetchQuestionSuccess = (question) => ({
	type: FETCH_QUESTION_SUCCESS,
	question,
});

export const FETCH_QUESTION_REQUEST = 'QUESTION_REQUEST';
export const fetchQuestionRequest = () => ({
	type: FETCH_QUESTION_REQUEST
});

export const FETCH_QUESTION_ERROR = 'FETCH_QUESTION_ERROR';
export const fetchQuestionError = error => ({
	type: FETCH_QUESTION_ERROR,
	error
});

export const ANSWER_QUESTION_REQUEST = 'ANSWER_QUESTION_REQUEST';
export const answerQuestionRequest = () => ({
	type: ANSWER_QUESTION_REQUEST
});

export const ANSWER_QUESTION_SUCCESS = 'ANSWER_QUESTION_SUCCESS';
export const answerQuestionSuccess = () => ({
	type: ANSWER_QUESTION_SUCCESS
});

export const ANSWER_QUESTION_ERROR = 'ANSWER_QUESTION_ERROR';
export const answerQuestionError = error => ({
	type: ANSWER_QUESTION_ERROR,
	error
});

export const fetchQuestion = () => (dispatch, getState) => {
	const token = getState().auth.authToken;

	dispatch(fetchQuestionRequest());

	return axios.get(
		questionsEndpoint,
		{
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			}
		})
		.then(({ data }) => {
			dispatch(fetchQuestionSuccess(data));
		})
		.catch(err => dispatch(fetchQuestionError(err)));
};

export const answeredQuestion = (answeredCorrectly) => (dispatch, getState) => {
	const token = getState().auth.authToken;
	dispatch(answerQuestionRequest());
	return axios.put(
		questionsEndpoint,
		{ answeredCorrectly },
		{
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			}
		})
		.then(() => {
			dispatch(answerQuestionSuccess());
		})
		.catch(err => dispatch(answerQuestionError(err)));
};