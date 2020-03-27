import _ from 'lodash'
export const PokemonDetails = class {
		constructor(
			pokemonDetails,
	) {
		this.name = _.capitalize (pokemonDetails.name)
		this.number = pokemonDetails.id
		this.sprites = _.omitBy (pokemonDetails.sprites, _.isEmpty)
		this.types = _.sortBy (pokemonDetails.types, 'slot')
		this.stats = pokemonDetails.stats
		this.abilities = _.sortBy(pokemonDetails.abilities, 'slot')
	}
}