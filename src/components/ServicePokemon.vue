<script>
import { PokemonEndpoints } from '@/constants/Endpoints'
import ApiService from '@/mixins/ApiService'
export default {
	name: 'ServicePokemon',
	mixins: [ApiService],
	props: {
		pokemonIdentifier: {
			type: [String, Number],
			default: null
		},

	},
	data() {
		return {
			pokemonEndpoints: PokemonEndpoints,
			pokemon: {}
		}
	},
	watch: {
		pokemonIdentifier: {
			handler: 'getPokemon'
		}
	},
	computed: {

	},
	methods: {
		async getPokemon () {
			if (this.pokemonIdentifier) {
				const response = await this.askProfessor(
					'get',
					this.pokemonEndpoints.getPokemon(this.pokemonIdentifier)
				)
				this.setLocalValue('pokemon', response)
			} else {
				this.handleError('Professor Oak does not know about this pokemon yet!')
			}
		}
	},
	render() {
		return this.$scopedSlots.default(this)
	}
}
</script>
