<template>
	<b-link v-if="typeDetails" :to="{name: 'TypeDetails', params: {type: typeDetails.name}}" class="mr-2">
		<b-badge :style="`background-color: ${typeDetails.color}`" class="p-2">
			<font-awesome-icon v-if="typeDetails.icon" :icon="typeDetails.icon" class="mr-1" />
			{{ formatText (typeDetails.name) }}
		</b-badge>
	</b-link>
</template>

<script>
import FormatText from '@/mixins/FormatText'
import PokemonTypes from '@/constants/PokemonTypes'
export default {
	name: 'AppPokemonTypeBadge',
	props: {
		pokemonType: {
			default: null
		}
	},
	mixins: [FormatText],
	data () {
		return {
			types: PokemonTypes
		}
	},
	computed: {
		typeDetails () {
			if (this.pokemonType) {
				return this.types.find (type => type.name == this.pokemonType)
			} else {
				return null
			}
		},
	},
}
</script>

<style>

</style>