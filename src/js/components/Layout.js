import React from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Header from "./Header";
import Account from "./Account";
import Table from "./Table";

export default class Layout extends React.Component {
	constructor() {
		super();
		this.state = {
			provider: "google",
			username: "",
			password: "",
			loading: false,
			pokemonData: [],
			sort: 'cp',
			error: {},
		}
	}

	changeState(key, val) {
		var state = {};
		state[key] = val;
		this.setState(state);
	}

	render() {
		return (
			<MuiThemeProvider>
				<div>
					<Header title="Pokemon Diary" />
					<Account changeState={this.changeState.bind(this)} provider={this.state.provider} username={this.state.username} password={this.state.password} loading={this.state.loading} />
					<Table pokemonData={this.state.pokemonData} sort={this.state.sort} />
				</div>
			</MuiThemeProvider>
		);
	}
}
