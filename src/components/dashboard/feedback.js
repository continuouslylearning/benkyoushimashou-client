import React from 'react';
import { connect } from 'react-redux';

class Feedback extends React.Component {
  
  render(){

    const { answeredCorrectly, next, romaji } = this.props;

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
}

const mapStateToProps = state => ({
  romaji: state.currentQuestion.romaji
});

export default connect(mapStateToProps)(Feedback);