import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth';
import questionReducer from './question';

export default combineReducers({
	auth: authReducer,
	currentQuestion: questionReducer,
	form: formReducer
});