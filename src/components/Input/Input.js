import React from 'react';

export default (props) => {
	let errorMessage;
	let warningMessage;
	const { error, touched, submitting, type, warning } = props.meta;

	if (touched && error) {
		errorMessage = <div className="form-error">{error}</div>;
	}

	if (touched && warning) {
		warningMessage = (
			<div className="form-warning">{warning}</div>
		);
	}

	return (
		<div className="form-input">
			<label htmlFor={props.input.name}>
				{props.label}
				{errorMessage}
				{warningMessage}
			</label>
			<input
				{...props.input}
				id={props.input.name}
				disabled={submitting}
				type={type}
			/>
		</div>
	);
}
