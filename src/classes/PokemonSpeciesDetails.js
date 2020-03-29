export const PokemonSpeciesDetails = class {
		constructor(
			speciesDetails
	) {
		this.description = speciesDetails.genera.find (genera => genera.language.name === 'en').genus
		this.longDescriptions = speciesDetails.flavor_text_entries.filter (entry => entry.language.name === 'en'),
		this.variants = speciesDetails.varieties
	}
}