export const PokemonSpeciesDetails = class {
		constructor(
			speciesDetails
	) {
		this.description = speciesDetails.genera.find (genera => genera.language.name === 'en').genus
	}
}