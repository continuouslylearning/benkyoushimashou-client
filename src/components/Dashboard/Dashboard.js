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
	const answeredCorrectly = useState(false);
	const character = useSelector(state => state.currentQuestion.character);
	
	useEffect(() => {
		dispatch(fetchQuestion());
	}, []);

	const next = () => {
		setAnswered(false);
		setValue('');

		return dispatch(fetchQuestion());
  	}

	const submitAnswer = (event) => {
		event.preventDefault();

		const { romaji } = this.props;
		const answeredCorrectly = this.state.value.toLowerCase().trim() === romaji;
	
		return this.props.dispatch(answeredQuestion(answeredCorrectly))
	  		.then(() => {
		  		this.setState({
					answered: true,
					answeredCorrectly
		  		});
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