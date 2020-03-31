<template>
	<b-row>
		<b-col>
		</b-col>
	</b-row>
</template>

<script>
import { PokemonTypeEndpoints } from '@/constants/Endpoints'
import ApiService from '@/mixins/ApiService'
import PokemonTypes from '@/constants/PokemonTypes'
export default {
	name: 'AppPokemonDamageClasses',
	props: {
		types: {
			type: Array,
			default: () => {
				return []
			}
		}
	},
	mixins: [ApiService],
	data () {
		return {
			typeData: PokemonTypes,
			type1: {},
			type2: {},
			typeEndpoints: PokemonTypeEndpoints
		}
	},
	watch: {
		types: {
			handler: 'getTypeData'
		}
	},
	mounted () {
		if (this.types.length > 0) {
			this.getTypeData()
		}
	},
	computed: {
		damageClasses () {
			const damageClasses = {
				weakTo: [],
				resistantTo: [], 
				neutralTo: []
			}
			if (Object.keys (this.type1).length > 0 && Object.keys (this.type2).length > 0) {
				const type1DamageClasses = this.type1.damage_relations
				const type2DamgeClasses = this.type2.damage_relations
				return damageClasses
			} else if (Object.keys (this.type1).length > 0 && Object.keys (this.type2).length < 1) {
				return damageClasses
			} else {
				return damageClasses
			}
		}
	},
	methods: {
		async getType (typeIdentifier, dataDestination) {
			try {
				const response = await this.askProfessor (
					'get',
					this.typeEndpoints.getPokemonType (typeIdentifier)
				)
				this.setLocalValue (dataDestination, response)
			} catch (error) {
				this.$emit ("error", error)
				this.handleError()
			}
		},
		async getTypeData () {
			if (this.types.length > 0) {
				await this.getType (this.types[0].type.name, 'type1')
				if (this.types.length > 1) {
					await this.getType (this.types[1].type.name, 'type2')
				}
			}
		}
	}
}
</script>

<style>

</style>