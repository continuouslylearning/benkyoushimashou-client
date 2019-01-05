import React from 'react';

export default class AnswerForm extends React.Component {

  render() {
    const { submitAnswer, value, onInputChange } = this.props;
    return (
      <form className="guess-form" onSubmit={submitAnswer}>
        <input
          className='answer'
          type="text"
          placeholder='Enter your answer'
          onChange={onInputChange}
          value={value}
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}