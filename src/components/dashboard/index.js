import React from 'react';
import './dashboard.css';
import { connect } from 'react-redux';
import requiresLogin from '../requires-login';
import { fetchQuestion, answeredQuestion } from '../../actions/questions';

import FeedBack from './feedback';
import AnswerForm from './answer-form';
import CharacterBox from './character-box';

export class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      answered: false,
      feedback: null,
      value: ''
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchQuestion());
  }

  next = () => {
    this.setState({
      answered: false,
      feedback: null,
      value: ''
    });
    this.props.dispatch(fetchQuestion());
  }

  onInputChange = e => {
    this.setState({
      value: e.target.value
    });
  }

  submitAnswer = event => {
    event.preventDefault();
    const { romaji } = this.props;
    const answeredCorrectly = this.state.value.toLowerCase().trim() === romaji;
    this.props.dispatch(answeredQuestion(answeredCorrectly));
    this.setState({
      answered: true,
      answeredCorrectly
    });
  }

  render() {
    const { answered, answeredCorrectly, value } = this.state;
    const { character } = this.props;

    if (!character) {
      return (
        <div>
          <h1>Waiting</h1>
        </div>
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

const mapStateToProps = state => {
  const { character, romaji } = state.currentQuestion;

  return {
    romaji,
    character
  };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));