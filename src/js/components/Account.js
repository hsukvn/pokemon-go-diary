import React from "react";
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MenuItem from 'material-ui/MenuItem';

export default class Account extends React.Component {
	getChildContext() {
		return { muiTheme: getMuiTheme(baseTheme) };
	}

	handleChange(e) {
		this.props.changeState(e.target.name, e.target.value);
	}

	handleSelect(e, index, value) {
		this.props.changeState('provider', value);
	}

	handleSubmit(e) {
		e.preventDefault();
		// call api
		$.ajax({
			url: '/pokemon/list',
			dataType: "json",
			type: 'POST',
			data: {
				username: this.props.username,
				password: this.props.password,
			},
			success: function(data) {
				this.props.changeState('pokemonData', data);
			}.bind(this),
			error: function(xhr, status, err) {
				// FIXME: do handler
				console.log(err);
			}.bind(this)
		})
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit.bind(this)}>
				<div>
					<SelectField
						value={this.props.provider}
						onChange={this.handleSelect.bind(this)}
						autowidth
					>
						<MenuItem
							value="google"
							primaryText="Google"
						/>

						<MenuItem
							value="ptc"
							primaryText="Pokemon Trainer Club"
						/>
					</SelectField>
				</div>

				<div>
					<TextField
						hintText="Username"
						onChange={this.handleChange.bind(this)}
						value={this.props.username}
						name="username"
						floatingLabelText="Username"
					/>
				</div>

				<div>
					<TextField
						hintText="Password"
						onChange={this.handleChange.bind(this)}
						value={this.props.password}
						name="password"
						floatingLabelText="Password"
						type="password"
					/>
				</div>

				<RaisedButton
					type="submit"
					label="Login"
					primary
				/>
			</form>
		);
	}
}

Account.childContextTypes = {
	muiTheme: React.PropTypes.object.isRequired,
};
