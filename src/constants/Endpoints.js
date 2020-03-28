export const PokemonEndpoints = {
	getPokemon: function (nameOrId) {
		return `/pokemon/${nameOrId}`
	},
	getAllPokemon: '/pokemon',
	getPokemonSpecies: function (nameOrId) {
		return `/pokemon-species/${nameOrId}`
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

export const MoveEndoints = {
	getMove: function (nameOrId) {
		return `/move/${nameOrId}`
	},
	getAllMoves: '/move'
}