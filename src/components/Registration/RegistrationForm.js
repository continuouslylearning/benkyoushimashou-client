import React from 'react';
import { useDispatch } from 'react-redux';
import { Field, reduxForm, focus, clearSubmitErrors } from 'redux-form';
import { registerUser } from '../../actions/users';
import { login } from '../../actions/auth';
import Input from '../Input/Input';

const RegistrationForm = (props) => {
	const dispatch = useDispatch();

	const onSubmit = (values) => {
		const { username, password } = values;
		const user = { username, password };

		return props
			.dispatch(registerUser(user))
			.then(() => dispatch(login(username, password)));
	}

	const { pristine, submitting } = props;
	const disable = pristine || submitting;

	const error = props.error && (
		<div className="form-error" aria-live="polite">
			{props.error}
		</div>
	);

	return (
		<>
			{error}
			<form
				className="registration-form"
				onSubmit={props.handleSubmit(values =>
					onSubmit(values)
				)}>
				<label htmlFor="username">Username</label>
				<Field
					component={Input}
					type="text"
					name="username"
				/>
				<label htmlFor="password">Password</label>
				<Field
					component={Input}
					type="password"
					name="password"
				/>
				<button
					className='form-button'
					type="submit"
					disabled={disable}
				>
					Register
				</button>
			</form>
		</>
	);
}

export default reduxForm({
	form: 'registration',
	onSubmitFail: (errors, dispatch) =>
		dispatch(focus('registration', Object.keys(errors)[0])),
	onChange: (values, dispatch, props) => {
		if (props.error) {
			dispatch(clearSubmitErrors('registration'));
		}
	}
})(RegistrationForm);
