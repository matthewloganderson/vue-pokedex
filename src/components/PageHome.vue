<template>
		<b-row>
			<b-col>
				<b-row>
					<b-col>
						<b-jumbotron bg-variant="dark" text-variant="light" header="Vue Pokedex" lead="A pokedex application built using Vue.js, Bootstrap-Vue, and PokeAPI.">
							<hr />
							<b-row>
								<b-col>
									<h5>
										Find a Pokemon or Pokemon Type
									</h5>
								</b-col>
							</b-row>
							<b-row>
								<b-col>
									<app-search-bar />
								</b-col>
							</b-row>
						</b-jumbotron>
					</b-col>
				</b-row>
				<h4>
					Browse Pokemon by Generation
				</h4>
				<b-row class="mb-4" v-for="(gen, index) in [1,2,3,4,5]" :key="index">
					<b-col>
						<service-pokemon v-slot="{generation, loading}" operation="getPokemonGeneration" :pokemonGenerationId="gen">
							<b-card v-if="generation && !isEmpty (generation) && !loading" no-body>
								<b-card-header>
									<h6>
										{{formatText(generation.main_region.name)}}
									</h6>
								</b-card-header>
								<b-card-body>
									<app-pokemon-list :pokemon="generation.pokemon_species" />
								</b-card-body>
							</b-card>
							<app-loading v-else />
						</service-pokemon>
					</b-col>
				</b-row>
			</b-col>
		</b-row>
</template>

<script>
import AppLoading from './AppLoading'
import IsEmpty from '@/mixins/IsEmpty'
import FormatText from '@/mixins/FormatText'
import AppPokemonList from './AppPokemonList'
import ServicePokemon from './ServicePokemon'
import AppSearchBar from './AppSearchBar'
export default {
	name: 'PageHome',
	components: {
		AppSearchBar,
		ServicePokemon,
		AppPokemonList,
		AppLoading
	},
	mixins: [FormatText, IsEmpty],
}
</script>

<style>

</style>