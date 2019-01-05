import React from 'react';
import PropTypes from 'prop-types';
import './Dashboard.css';
import { connect } from 'react-redux';
import requiresLogin from '../RequiresLogin/RequiresLogin';
import { fetchQuestion, answeredQuestion } from '../../actions/questions';
import FeedBack from './Feedback';
import AnswerForm from './AnswerForm';
import CharacterBox from './CharacterBox';
import Loading from '../Loading/Loading';

export class Dashboard extends React.Component {
  	constructor(props) {
		super(props);

		this.state = {
			answered: false,
			value: ''
		};
	}

	static propTypes = {
		character: PropTypes.string,
		romaji: PropTypes.string
	};

	componentDidMount = () => {
		this.props.dispatch(fetchQuestion());
  	}

	next = () => {
		this.setState({
	  		answered: false,
			value: ''
		});

		return this.props.dispatch(fetchQuestion());
  	}

  	onInputChange = (e) => {
		this.setState({
	  		value: e.target.value
		});
  	}

	submitAnswer = (event) => {
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

	render = () => {
		const { answered, answeredCorrectly, value } = this.state;
		const { character } = this.props;

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
						next={this.next}
					/> :
					<AnswerForm
						submitAnswer={this.submitAnswer}
						value={value}
						onInputChange={this.onInputChange}
					/>
			}
	  		</div>
		);
  	}
}

const mapStateToProps = (state) => {
	const { character, romaji } = state.currentQuestion;

	return {
		romaji,
		character
	};
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));