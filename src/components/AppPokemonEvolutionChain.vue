<template>
	<b-row>
		<b-col>
			<service-pokemon v-slot="{evolutionChain}" operation="getEvolutionChain" :evolutionChainUrl="evolutionChainUrl">
				<b-row>
					<b-col>
						{{ evolutionChain }}
					</b-col>
				</b-row>
			</service-pokemon>
		</b-col>
	</b-row>
</template>

<script>
import ServicePokemon from './ServicePokemon'
export default {
	name: 'AppPokemonEvolutionChain',
	components: {
		ServicePokemon
	},
	props: {
		evolutionChainUrl: {
			type: String,
			default: null,
		}
	},

}
</script>

<style>

</style>