import React from 'react';
import { Field, reduxForm, focus, clearSubmitErrors } from 'redux-form';
import Input from '../Input/Input';
import { login } from '../../actions/auth';

export class LoginForm extends React.Component {
	onSubmit = (values) => {
		return this.props.dispatch(login(values.username, values.password, true));
	}

	render = () => {
		const { pristine, submitting } = this.props;
		const disable = pristine || submitting;
		const error = this.props.error && (
			<div className="form-error" aria-live="polite">
				{this.props.error}
			</div>
		);

		return (
			<>
				{error}
				<form
					className="login-form"
					onSubmit={this.props.handleSubmit(values =>
						this.onSubmit(values)
					)}>
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
