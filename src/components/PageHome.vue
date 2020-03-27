<template>
	<service-pokemon operation="getPokemon" pokemonIdentifier="mewtwo" v-slot="{pokemon}">
		<b-row v-if="Object.keys (pokemon).length > 0">
			<b-col cols="3">
				<b-img :src="pokemon.sprites.front_default" />
			</b-col>
		</b-row>
	</service-pokemon>
</template>

<script>
import ServicePokemon from './ServicePokemon'
export default {
	name: 'PageHome',
	components: {
		ServicePokemon
	}
}
</script>

<style>

</style>