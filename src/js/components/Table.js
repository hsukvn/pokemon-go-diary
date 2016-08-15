import React from "react";

import Pokemon from "./component/Pokemon";
import Sort from './api/sort';

import styles from './Table.css';

export default class Table extends React.Component {
	render() {
		const sorter = Sort[this.props.sort];
		const pokemonSort = sorter(this.props.pokemonData);
		const PokemonList = pokemonSort.map(
			(pokemon, i) => <Pokemon key={i} data={pokemon}/>
		);

		return (
			<div className={styles.container}>{PokemonList}</div>
		);
	}
}
