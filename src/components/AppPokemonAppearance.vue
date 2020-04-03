<template>
	<b-row>
		<b-col cols="6" md="4" lg="3" class="mb-3 text-center" v-for="(value, name) in sprites" :key="name">
			<b-img fluid :src="value" />
			<h6 class="text-center">
				{{ formatName (name) }}
			</h6>
		</b-col>
	</b-row>
</template>

<script>
import _ from 'lodash'
export default {
	name: 'AppPokemonAppearance',
	props: {
		sprites: {
			type: Object,
			default: () => {
				return {}
			}
		}
	},
	methods: {
		formatName (name) {
			const formattedName =  _.capitalize(_.replace (name, '_', ' '))
			if (formattedName.includes ('_')) {
				return  _.capitalize(_.replace (formattedName, '_', ' '))
			} else {
				return formattedName
			}
			
		} 
	}
	
}
</script>

<style>

</style>