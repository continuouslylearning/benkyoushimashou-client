import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../Loading/Loading';
import { connect } from 'react-redux';

class CharacterBox extends React.Component {
	static propTypes = {
		character: PropTypes.string.isRequired,
		loading: PropTypes.bool.isRequired,
		system: PropTypes.string.isRequired
	};

	render = () => {
		const { character, loading, system } = this.props;

		return (
			<>
				<div className='question'>
					<h3>What is the romaji for this <span style={{color: '#e44d4d'}}>{system}</span> character?</h3>
				</div>
				<div className="character-box">
					<h2 className='character'>{ loading ? <Loading margin={'px'} /> : character}</h2>
				</div>
			</>
		);
  }
}

const mapStateToProps = (state) => {
	const { character, loading, system } = state.currentQuestion;
	
	return {
		character,
		loading,
		system
	};
};

export default connect(mapStateToProps)(CharacterBox);