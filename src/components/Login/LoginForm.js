import React from 'react';
import { getDispatch } from 'react-redux';
import { Field, reduxForm, focus, clearSubmitErrors } from 'redux-form';
import Input from '../Input/Input';
import { login } from '../../actions/auth';

const LoginForm = (props) => {
	const dispatch = getDispatch();

	const onSubmit = (values) => {
		return dispatch(login(values.username, values.password, true));
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
				className="login-form"
				onSubmit={props.handleSubmit(onSubmit)}
			>
				<label htmlFor="username">Username</label>
				<Field
					component={Input}
					type="text"
					name="username"
					id="username"
				/>
				<label htmlFor="password">Password</label>
				<Field
					component={Input}
					type="password"
					name="password"
					id="password"
				/>
				<button
					className='form-button' 
					disabled={disable}>
					Login
				</button>
			</form>
		</>
	);

}

export default reduxForm({
	form: 'login',
	onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username')),
	onChange: (values, dispatch, props) => {
		if (props.error) {
			dispatch(clearSubmitErrors('login'));
		}
	}
})(LoginForm);
