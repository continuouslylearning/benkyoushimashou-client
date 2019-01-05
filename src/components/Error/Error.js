import React from 'react';
import { connect } from 'react-redux';

const Error = (props) => {
	return (
		<div className='landing'>			
			<div className='landing-content'>
				<h2 className='landing-header'>
					The server is currently unavailable. Try again later.
				</h2> 
			</div>
		</div>
	);
}

export default connect()(Error);