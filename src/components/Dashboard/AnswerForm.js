import React from 'react';
import { useSelector } from 'react-redux';

export default (props) => {	
	const loading = useSelector(state => state.currentQuestion.loading);
	const submitting = useSelector(state => state.currentQuestion.submitting);
	const {  onInputChange, submitAnswer, value } = props;
	const disable = loading || submitting;

	return (
		<form className="guess-form" onSubmit={submitAnswer}>
			<input
				className='answer'
				disabled={disable}
				type="text"
				placeholder='Enter your answer'
				onChange={onInputChange}
				value={value}
			/>
			<button disabled={disable} type="submit">Submit</button>
		</form>
	);
}