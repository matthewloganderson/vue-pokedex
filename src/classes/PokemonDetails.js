import _ from 'lodash'
export const PokemonDetails = class {
		constructor(
			pokemonDetails
	) {
		this.name = _.capitalize (pokemonDetails.name)
		
	}
}