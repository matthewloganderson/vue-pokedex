<script>
import { PokemonEndpoints, PokemonAbilityEndpoints } from '@/constants/Endpoints'
import ApiService from '@/mixins/ApiService'
export default {
	name: 'ServicePokemon',
	mixins: [ApiService],
	props: {
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
		}

	},
	data() {
		return {
			pokemonEndpoints: PokemonEndpoints,
			abilityEndpoints: PokemonAbilityEndpoints,
			pokemon: {}, 
			pokemonSpecies: {},
			ability: {}
		}
	},
	watch: {
		pokemonIdentifier: {
			handler: 'getPokemon'
		},
		pokemonSpeciesIdentifier: {
			handler: 'getPokemonSpecies'
		},
		pokemonAbilityIdentifier: {
			handler: 'getAbility'
		}
	},
	computed: {

	},
	methods: {
		async getPokemon () {
			if (this.pokemonIdentifier) {
				try {
				const response = await this.askProfessor(
					'get',
					this.pokemonEndpoints.getPokemon(this.pokemonIdentifier)
				)
				this.setLocalValue('pokemon', response)
				this.$emit ('success', response)
				} catch (error) {
					this.$emit ('error', error)
					this.handleFeedback()
				}
			} else {
				this.handleError('Professor Oak does not know about this pokemon yet!')
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
					this.handleFeedback()
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
					this.handleFeedback()
				}
			}
		}
	},
	render() {
		return this.$scopedSlots.default(this)
	}
}
</script>
