import React from "react";

export default class Account extends React.Component {
	handleChange(e) {
		this.props.changeState(e.target.name, e.target.value);
	}

	handleSubmit(e) {
		e.preventDefault();
		// call api
		$.ajax({
			url: '/pokemon/list',
			dataType: "json",
			type: 'POST',
			data: {
				username: this.props.email,
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
			<div>
				<form className="accForm" onSubmit={this.handleSubmit.bind(this)}>
					<div>
						<label>Email</label>
					</div>
					<div>
						<input name="email" value={this.props.email} onChange={this.handleChange.bind(this)} type="email" placeholder="Gmail" required />
					</div>

					<div>
						<label>Password</label>
					</div>
					<div>
						<input name="password" value={this.props.password} onChange={this.handleChange.bind(this)} type="password" placeholder="Password" required />
					</div>

					<div>
						<button type="submit">Sign in</button>
					</div>
				</form>
			</div>
		);
	}
}
