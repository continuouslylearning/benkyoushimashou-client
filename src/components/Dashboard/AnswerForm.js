import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class AnswerForm extends React.Component {	
	static propTypes = {
		loading: PropTypes.bool.isRequired,
		onInputChange: PropTypes.func.isRequired,	
		submitAnswer: PropTypes.func.isRequired,
		submitting: PropTypes.bool.isRequired,
		value: PropTypes.string.isRequired
	}

	render = () => {
		const { loading, onInputChange, submitAnswer, submitting, value } = this.props;
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
}

const mapStateToProps = (state) => ({
	loading: state.currentQuestion.loading,
	submitting: state.currentQuestion.submitting
});

export default connect(mapStateToProps)(AnswerForm);