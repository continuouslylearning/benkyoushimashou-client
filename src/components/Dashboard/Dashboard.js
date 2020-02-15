import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestion, answeredQuestion } from '../../actions/questions';
import FeedBack from './Feedback';
import AnswerForm from './AnswerForm';
import CharacterBox from './CharacterBox';
import Loading from '../Loading/Loading';
import RequiresLogin from '../RequiresLogin/RequiresLogin';

const Dashboard = () => {
	const dispatch = useDispatch();
	const [ answered, setAnswered ] = useState(false);
	const [ value, setValue ] = useState('');
	const [ answeredCorrectly, setAnsweredCorrectly] = useState(false);
	const character = useSelector(state => state.currentQuestion.character);
	const romaji = useSelector(state => state.currentQuestion.romaji);
	
	useEffect(() => {
		dispatch(fetchQuestion());
	}, [dispatch]);

	const next = () => {
		setAnswered(false);
		setValue('');

		return dispatch(fetchQuestion());
  	}

	const submitAnswer = (event) => {
		event.preventDefault();

		const answeredCorrectly = value.toLowerCase().trim() === romaji;
	
		return dispatch(answeredQuestion(answeredCorrectly))
	  		.then(() => {
		  		setAnswered(true);
				setAnsweredCorrectly(answeredCorrectly);
			});
  	}

	if (character === null) {
		return (
			<Loading/>
		);
	}

	return (
		<div className="dashboard">
		<CharacterBox />
		{
			answered ?
				<FeedBack
					answeredCorrectly={answeredCorrectly}
					next={next}
				/> :
				<AnswerForm
					submitAnswer={submitAnswer}
					value={value}
					onInputChange={(e) => setValue(e.target.value)}
				/>
		}
		</div>
	);
}

export default RequiresLogin()(Dashboard);