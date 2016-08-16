import React, { Component } from 'react';

import styles from './Pokemon.css';

import Avatar from 'material-ui/Avatar';

export default class Pokemon extends React.Component {
	render() {
		const { data } = this.props;
		const { currCP, minCP, maxCP } = data;
		const { individual_attack, individual_defense, individual_stamina } = data;

		//const percentMaxCp = Math.floor(((currCP - minCP) / (maxCP - minCP)) * 100);
		const percentMaxIv = Math.floor(((individual_attack || 0) + (individual_defense || 0) + (individual_stamina || 0)) / 45 * 100);

		return (
			<div className={styles.container}>
				<div>
					<span className={styles.label}>
						CP
					</span>
					<span>
						{data.currCP} (Max: {data.maxCP}) {data.favorite ? '\u2605' : ''}
					</span>
				</div>
				<Avatar
					backgroundColor="white"
					size={50}
					src={`./images/${data.num}.png`}
				/>
				<div>
					{data.name} {data.nickname ? `(${data.nickname})` : ''}
				</div>
				<div>
					<span className={styles.label}>
						IV
					</span>
					<span>
						{data.individual_attack || 0}/{data.individual_defense || 0}/{data.individual_stamina || 0} ({percentMaxIv}%)
					</span>
				</div>
				<div>
					height: {data.height_m.toFixed(2)}m/weight: {data.weight_kg.toFixed(2)}kg
				</div>
			</div>
		);
	}
}
