'use strict';

require('babel-register')({
	ignore: false,
	only: /pokemon-go-diary\/backend/
});

const _ = require('lodash');
const Pokemon = require('./backend/main').default;
const Sort = require('./backend/sort').default;

var express = require("express");
var bodyParser = require("body-parser");
var app = express();

var sort = 'recent';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
		res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
		res.setHeader('Access-Control-Allow-Credentials', true);
		next();
});

app.use('/', express.static(__dirname + '/public'));

app.post("/pokemon/list", function(req, res) {
	if (!req.body.username || !req.body.password) {
		res.status(401);
	}

	const username = req.body.username;
	const password = req.body.password;
	if (req.body.sort) {
		sort = req.body.sort;
	}
	const provider = req.body.provider ? req.body.provider : 'google';

	const pokemon = new Pokemon({
		username, password, provider,
	});

	pokemon.getInventory().then((items) => {
		const FIELDS = [
			'name',
			'nickname',
			'favorite',
			'num',
			'pokemon_id',
			'cp',
			'minCP',
			'currCP',
			'maxCP',
			'stamina',
			'maxCP',
			'height_m',
			'weight_kg',
			'individual_attack',
			'individual_defense',
			'individual_stamina',
		];

		let sorter;
		if (Sort[sort]) {
			sorter = Sort[sort];
		} else {
			sorter = Sort.recent;
		}

		const sortedItems = Sort[sort](items);

		var pokemons = sortedItems.map((item) => _.pick(item, FIELDS));
		res.status(200).json(pokemons);
	}).catch((err) => {
		res.status(500).json(err);
	})
});

var server = app.listen(8887, function () {
	console.log("Listening on port %s...", server.address().port);
});

