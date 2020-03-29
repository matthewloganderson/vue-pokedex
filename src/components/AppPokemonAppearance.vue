<template>
	<b-row>
		<b-col v-for="(value, name) in sprites" :key="name">
			<b-img fluid :src="value" />
		</b-col>
	</b-row>
</template>

<script>
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
}
</script>

<style>

</style>