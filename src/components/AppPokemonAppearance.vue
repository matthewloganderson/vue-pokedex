<template>
	<b-row>
		<b-col cols="6" md="4" lg="3" class="mb-3 text-center" v-for="(value, name) in sprites" :key="name">
			<b-img fluid :src="value" />
			<h6 class="text-center">
				{{ formatText (name, /_/g) }}
			</h6>
		</b-col>
	</b-row>
</template>

<script>
import FormatText from '@/mixins/FormatText'
export default {
	name: 'AppPokemonAppearance',
	mixins: [FormatText],
	props: {
		sprites: {
			type: Object,
			default: () => {
				return {}
			}
		}
	},
}
</script>

<style>

</style>