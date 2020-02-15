import React from 'react';
import { useSelector } from 'react-redux';

export default (props) => {
	const romaji = useSelector(state => state.currentQuestion.romaji);
	const { answeredCorrectly, next } = props;

	return (
		<div className="guess-form">
			<div className={answeredCorrectly ? 'feedback green' : 'feedback red'}> 
				{answeredCorrectly && <p><span className='correct'>Correct!</span></p>}
				{!answeredCorrectly && <p><span className='wrong'>Wrong</span>, the romaji for this character is <span className='correct'><b>{romaji}</b></span>.</p>}
			</div>            
			<button className='next-button' onClick={next}>Next</button>
		</div>
	);
}