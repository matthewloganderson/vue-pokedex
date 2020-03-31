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
			type: {}
		}
	},
	watch: {
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
		async getEvolutionChain () {
			if (this.evolutionChainUrl) {
				try {
					const response = await this.askProfessor (
						'get',
						this.pokemonEndpoints.getEvolutionChain (this.evolutionChainUrl)
					)
					this.setLocalValue ('evolutionChain', response)
					this.$emit ('success', response)
				} catch (error) {
					this.$emit ('error', error)
					this.handleError()
				}
			} else {
				this.handleError ()
			}
		},
		async getPokemon () {
			if (this.pokemonIdentifier) {
				this.pokemon = {}
				try {
					const response = await this.askProfessor(
						'get',
						this.pokemonEndpoints.getPokemon(this.pokemonIdentifier)
				)
				this.setLocalValue('pokemon', response)
				this.$emit ('success', response)
				} catch (error) {
					this.$emit ('error', error)
					this.handleError()
				}
			}
		},
		async getPokemonSpecies () {
			if (this.pokemonSpeciesIdentifier) {
				try {
					const response = await this.askProfessor (
						'get', 
						this.pokemonEndpoints.getPokemonSpecies (this.pokemonSpeciesIdentifier)
					)
					this.setLocalValue ('pokemonSpecies', response)
					this.$emit ('success', response)
				} catch (error) {
					this.$emit ('error', error)
					this.handleError()
				}
			}
		},
		async getAbility () {
			if (this.pokemonAbilityIdentifier) {
				try {
					const response = await this.askProfessor (
						'get', 
						this.abilityEndpoints.getAbility(this.pokemonAbilityIdentifier)
					)
					this.setLocalValue ('ability', response)
					this.$emit ('success', response)
				} catch (error) {
					this.$emit ('error', error)
					this.handleError()
				}
			}
		},
		async getType() {
			if (this.typeIdentifier) {
				try {
					const response = await this.askProfessor (
						'get',
						this.typeEndpoints.getPokemonType (this.typeIdentifier)
					)
					this.setLocalValue ('type', response)
					this.$emit ('success', response)
				} catch (error) {
					this.$emit ('error', error)
					this.handleError()
				}
			}
		}
	},
	render() {
		return this.$scopedSlots.default(this)
	}
}
</script>
