<script>
import { PokemonEndpoints, PokemonAbilityEndpoints, PokemonTypeEndpoints } from '@/constants/Endpoints'
import ApiService from '@/mixins/ApiService'
export default {
	name: 'ServicePokemon',
	mixins: [ApiService],
	props: {
		typeIdentifier: {
			type: [String, Number],
			default: null,
		},
		pokemonIdentifier: {
			type: [String, Number],
			default: null
		},
		pokemonSpeciesIdentifier: {
			type: [String, Number],
			default: null
		},
		pokemonAbilityIdentifier: {
			type: [String, Number],
			default: null
		},
		evolutionChainUrl: {
			type: String,
			default: null,
		},
		pokemonGenerationId: {
			type: [String, Number],
			default: null
		}
	},
	data() {
		return {
			typeEndpoints: PokemonTypeEndpoints,
			pokemonEndpoints: PokemonEndpoints,
			abilityEndpoints: PokemonAbilityEndpoints,
			pokemon: {}, 
			pokemonSpecies: {},
			ability: {},
			evolutionChain: {},
			type: {},
			pokedex: {},
			generation: {}
		}
	},
	watch: {
		pokemonGenerationId: {
			hander: 'getPokemonGeneration'
		},
		pokemonIdentifier: {
			handler: 'getPokemon', 
		},
		pokemonSpeciesIdentifier: {
			handler: 'getPokemonSpecies'
		},
		pokemonAbilityIdentifier: {
			handler: 'getAbility'
		},
		evolutionChainUrl: {
			handler: 'getEvolutionChain'
		},
		typeIdentifier: {
			handler: 'getType'
		}
	},
	methods: {
		async getPokemonGeneration () {
			if (this.pokemonGenerationId) {
				this.callTheProfessor (
					this.pokemonEndpoints.getPokemonGeneration (this.pokemonGenerationId),
					'generation'
				)
			}
		},
		async getAllPokemon () {
			this.callTheProfessor (
				this.pokemonEndpoints.getAllPokemon,
				'pokedex'
			)
		},
		async getEvolutionChain () {
			if (this.evolutionChainUrl) {
				this.callTheProfessor (
					this.pokemonEndpoints.getEvolutionChain (this.evolutionChainUrl), 
					'evolutionChain'
				)
			} else {
				this.handleError ()
			}
		},
		async getPokemon () {
			if (this.pokemonIdentifier) {
				this.pokemon = {}
				this.callTheProfessor (
					this.pokemonEndpoints.getPokemon(this.pokemonIdentifier),
					'pokemon'
				)
			}
		},
		async getPokemonSpecies () {
			if (this.pokemonSpeciesIdentifier) {
				this.callTheProfessor (
					this.pokemonEndpoints.getPokemonSpecies (this.pokemonSpeciesIdentifier),
					'pokemonSpecies'
				)
			}
		},
		async getAbility () {
			if (this.pokemonAbilityIdentifier) {
				this.callTheProfessor (
					this.abilityEndpoints.getAbility(this.pokemonAbilityIdentifier),
					'ability'
				)
			}
		},
		async getType() {
			if (this.typeIdentifier) {
				this.callTheProfessor (
					this.typeEndpoints.getPokemonType (this.typeIdentifier),
					'type'
				)
			}
		}
	},
	render() {
		return this.$scopedSlots.default(this)
	}
}
</script>
