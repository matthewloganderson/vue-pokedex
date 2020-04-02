import _ from 'lodash'
export const PokemonEndpoints = {
	getPokemon: function (nameOrId) {
		return `/pokemon/${nameOrId}`
	},
	getAllPokemon: '/pokedex/1',
	getPokemonSpecies: function (nameOrId) {
		return `/pokemon-species/${nameOrId}`
	},
	getEvolutionChain: function (url) {
		return `/evolution-chain/${_.replace (url, 'https://pokeapi.co/api/v2/evolution-chain/', '')}`
	}
}

export const PokemonTypeEndpoints = {
	getPokemonType: function (nameOrId) {
		return `/type/${nameOrId}`
	},
	getAllPokemonTypes: '/type'
}

export const PokemonAbilityEndpoints = {
	getAbility: function (nameOrId) {
		return `/ability/${nameOrId}`
	}, 
	getAllAbilities: '/ability'
}

export const MoveEndpoints = {
	getMove: function (nameOrId) {
		return `/move/${nameOrId}`
	},
	getAllMoves: '/move',
	getMoveCategory: function (url) {
		return `/move-category/${_.replace (url, 'https://pokeapi.co/api/v2/move-category/', '')}`
	},
	getMoveTarget: function (url) {
		return `/move-target/${_.replace (url, 'https://pokeapi.co/api/v2/move-target/', '')}`
	},
}