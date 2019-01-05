import { 
	FETCH_QUESTION_SUCCESS,
	FETCH_QUESTION_REQUEST,
	ANSWER_QUESTION_REQUEST, 
	ANSWER_QUESTION_SUCCESS,
	FETCH_QUESTION_ERROR,
	ANSWER_QUESTION_ERROR
} from '../actions/questions';

const initialState = {
	character: null,
	romaji: null,
	system: null, 
	loading: false, 
	error: null,
	submitting: false
};

export default (state = initialState, action) => {
	if (action.type === FETCH_QUESTION_SUCCESS) {
		const { character, system, romaji } = action.question;
		return {
			...state,
			loading: false,
			system,
			character,
			romaji
		};   
	} else if (action.type === FETCH_QUESTION_REQUEST) {
		return {
			...state, 
			loading: true
		};
	} else if (action.type === FETCH_QUESTION_ERROR) {
		return {
			...state, 
			loading: false,
			error: action.error
		};
	} else if (action.type === ANSWER_QUESTION_REQUEST) {
		return {
			...state,
			submitting: true
		};
	} else if (action.type === ANSWER_QUESTION_SUCCESS) {
		return {
			...state,
			submitting: false
		};
	} else if (action.type === ANSWER_QUESTION_ERROR) {
		return {
			...state,
			submitting: false,
			error: action.error
		};
	}
	return state;
};