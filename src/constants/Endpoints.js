export const PokemonEndpoints = {
	getPokemon: function (nameOrId) {
		return `/pokemon/${nameOrId}`
	},
	getAllPokemon: '/pokemon'
}

export const PokemonTypeEndpoints ={
	getPokemonType: function (nameOrId) {
		return `/type/${nameOrId}`
	},
	getAllPokemonTypes: '/type'
}