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
		this.abilities = _.sortBy(pokemonDetails.abilities, 'slot'),
		this.moves = pokemonDetails.moves,
		this.weight = `${_.round (pokemonDetails.weight * 0.220462, 2)} lbs`
		this.height = `${_.round (pokemonDetails.height * 0.328084, 2)} ft`
	}
}