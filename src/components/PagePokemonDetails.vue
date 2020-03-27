<template>
	<service-pokemon @success="pokemonDetails = $event" operation="getPokemon" :pokemonIdentifier="$route.params.identifier">
		<b-row align-h="center">
				<b-col cols="12" md="10" lg="9" xl="8" v-if="pokemonDetails">
					<service-pokemon @success="pokemonSpeciesDetails = $event" operation="getPokemonSpecies" :pokemonSpeciesIdentifier="pokemonDetails.name">
						<b-card no-body>
							<b-card-header>
							<b-row align-v="center" align-h="center">
								<b-col cols="auto">
									<b-img :src="pokemonDetails.sprites.front_default" />
								</b-col>
								<b-col cols="auto">
									<h2>
										{{ formattedDetails.name }}
									</h2>
									<h5 v-if="formattedSpeciesDetails" class="text-muted">
										{{ formattedSpeciesDetails.description }}
									</h5>
								</b-col>
							</b-row>
							</b-card-header>
							<b-card-body>
								<b-row align-v="center" v-if="formattedSpeciesDetails">
									<b-col cols="12" md="6" lg="5">
										<b-form-group label="Select Description" label-size="sm">
											<b-form-select v-model="selectedLongDescription">
												<option v-for="(description, index) in formattedSpeciesDetails.longDescriptions" :key="index" :value="index">{{ capitalizeRemoveHyphens(description.version.name) }}</option>
											</b-form-select>
										</b-form-group>
									</b-col>
									<b-col>
										<p>
											{{ formattedSpeciesDetails.longDescriptions[selectedLongDescription].flavor_text }}
										</p>
									</b-col>
								</b-row>
							</b-card-body>
						</b-card>
					</service-pokemon>
				</b-col>
		</b-row>
	</service-pokemon>
</template>

<script>
import _ from 'lodash'
import { PokemonSpeciesDetails } from '@/classes/PokemonSpeciesDetails'
import { PokemonDetails } from '@/classes/PokemonDetails'
import ServicePokemon from './ServicePokemon'
export default {
	name: 'PagePokemonDetails',
	components: {
		ServicePokemon
	},
	data () {
		return {
			pokemonDetails: null,
			pokemonSpeciesDetails: null,
			selectedLongDescription: 0
		}
	},
	computed: {
		formattedDetails () {
			if (this.pokemonDetails) {
				return new PokemonDetails (this.pokemonDetails)
			} else {
				return null
			}
		},
		formattedSpeciesDetails () {
			if (this.pokemonSpeciesDetails) {
				return new PokemonSpeciesDetails (this.pokemonSpeciesDetails)
			} else {
				return null
			}
		}
	},
	methods: {
		capitalizeRemoveHyphens (text) {
			return _.capitalize (_.replace (text, '-', ' '))
		}
	}
}
</script>

<style>

</style>