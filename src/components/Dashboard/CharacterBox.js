import React from 'react';
import Loading from '../Loading/Loading';
import { useSelector } from 'react-redux';

export default () => {
	const character = useSelector(state => state.currentQuestion.character);
	const loading = useSelector(state => state.currentQuestion.loading);
	const system = useSelector(state => state.currentQuestion.system);

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