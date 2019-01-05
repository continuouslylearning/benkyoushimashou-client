import React from 'react';
import { connect } from 'react-redux';

class CharacterBox extends React.Component {
  render(){

    const { system, character } = this.props;

    return (
      <>
        <div className='question'>
          <h3>
            What is the romaji for this <span style={{color: '#e44d4d'}}>{system}</span> character?
          </h3>
        </div>
        <div className="character-box">
          <h2 className='character'>{character}</h2>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  system: state.currentQuestion.system,
  character: state.currentQuestion.character
});

export default connect(mapStateToProps)(CharacterBox);