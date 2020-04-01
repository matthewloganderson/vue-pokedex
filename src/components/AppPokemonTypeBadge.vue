<template>
	<b-link v-if="typeDetails" :to="toType" class="mr-2">
		<b-badge :style="`background-color: ${typeDetails.color}`" class="p-2">
			<font-awesome-icon v-if="typeDetails.icon" :icon="typeDetails.icon" class="mr-1" />
			{{ capitalize (typeDetails.name) }}
		</b-badge>
	</b-link>
</template>

<script>
import _ from 'lodash'
import PokemonTypes from '@/constants/PokemonTypes'
export default {
	name: 'AppPokemonTypeBadge',
	props: {
		pokemonType: {
			default: null
		}
	},
	data () {
		return {
			types: PokemonTypes
		}
	},
	computed: {
		typeDetails () {
			const pokemonType = this.pokemonType
			if (pokemonType) {
				return this.types.find (type => type.name == this.pokemonType)
			} else {
				return null
			}
		},
		toType () {
			if (this.typeDetails) {
				return {
					name: 'TypeDetails', 
					params: {
						type: this.typeDetails.name
					}
				}
			} else {
				return null
			}
		}
	},
	methods: {
		capitalize (text) {
			return _.capitalize (text)
		}
	}

}
</script>

<style>

</style>