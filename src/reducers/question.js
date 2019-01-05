import { FETCH_QUESTION_SUCCESS } from '../actions/questions';

const initialState = {
  character: null,
  romaji: null,
  system: null
};

const questionsReducer = (state = initialState, action) => {
  if(action.type === FETCH_QUESTION_SUCCESS) {
    const { character, system, romaji } = action.question;
    return {
      ...state,
      system,
      character,
      romaji
    };   
  } else {
    return state;
  }
};

export default questionsReducer;

