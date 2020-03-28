<template>
	<service-pokemon @success="pokemonDetails = $event" operation="getPokemon" :pokemonIdentifier="$route.params.identifier">
		<b-row align-h="center">
				<b-col cols="12" md="10" lg="9" xl="8" v-if="pokemonDetails">
					<service-pokemon @success="pokemonSpeciesDetails = $event" operation="getPokemonSpecies" :pokemonSpeciesIdentifier="pokemonDetails.name">
						<div :style="typeBorderStyle" class="p-1 rounded">
							<b-card class="border-0 bg-white" no-body>
								<b-card-header>
									<app-pokemon-basic-details v-if="formattedDetails && formattedSpeciesDetails" :pokemon="formattedDetails" :species="formattedSpeciesDetails" />
								</b-card-header>
								<b-card-body>
									<b-row>
										<b-col>
											<h5 class="pb-2 border-bottom">
												About {{ formattedDetails.name }}
											</h5>
										</b-col>
									</b-row>
									<b-row class="mb-4">
										<b-col>
											<app-pokemon-description-picker v-if="formattedSpeciesDetails" :descriptions="formattedSpeciesDetails.longDescriptions" />
										</b-col>
									</b-row>
									<b-row>
										<b-col>
											<h5 class="pb-2 border-bottom">
												{{ formattedDetails.name }}'s Base Stats
											</h5>
										</b-col>
									</b-row>
									<b-row class="mb-4 mt-1">
										<b-col>
											<app-pokemon-stats v-if="formattedDetails" :stats="formattedDetails.stats" />
										</b-col>
									</b-row>
									<b-row>
										<b-col>
											<h5 class="pb-2 border-bottom">
												{{ formattedDetails.name }}'s Abilities
											</h5>
										</b-col>
									</b-row>
									<b-row class="mb-4">
										<b-col>
											<app-pokemon-abilities v-if="formattedDetails" :abilities="formattedDetails.abilities" />
										</b-col>
									</b-row>
									<b-row class="mb-3">
										<b-col>
											<h5 class="pb-2 border-bottom">
												Moves {{ formattedDetails.name }} Can Learn
											</h5>
										</b-col>
									</b-row>
									<b-row class="mb-4">
										<b-col>
											<app-pokemon-moves v-if="formattedDetails" :moves="formattedDetails.moves" />
										</b-col>
									</b-row>
								</b-card-body>
							</b-card>
						</div>
					</service-pokemon>
				</b-col>
		</b-row>
	</service-pokemon>
</template>

<script>
import AppPokemonMoves from './AppPokemonMoves'
import AppPokemonAbilities from './AppPokemonAbilities'
import AppPokemonStats from './AppPokemonStats'
import PokemonTypes from '@/constants/PokemonTypes'
import AppPokemonBasicDetails from './AppPokemonBasicDetails'
import AppPokemonDescriptionPicker from './AppPokemonDescriptionPicker'
import { PokemonSpeciesDetails } from '@/classes/PokemonSpeciesDetails'
import { PokemonDetails } from '@/classes/PokemonDetails'
import ServicePokemon from './ServicePokemon'
export default {
	name: 'PagePokemonDetails',
	components: {
		ServicePokemon, 
		AppPokemonDescriptionPicker,
		AppPokemonBasicDetails,
		AppPokemonStats,
		AppPokemonAbilities,
		AppPokemonMoves
	},
	data () {
		return {
			pokemonDetails: null,
			pokemonSpeciesDetails: null,
			selectedLongDescription: 0,
			pokemonTypes: PokemonTypes
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
		},
		typeBorderStyle () {
			if (this.formattedDetails) {
				if (this.formattedDetails.types.length > 1) {
					const typeColor1 = this.pokemonTypes.find (type => type.name === this.formattedDetails.types[0].type.name).color
					const typeColor2 = this.pokemonTypes.find (type => type.name === this.formattedDetails.types[1].type.name).color
				return `
					background: linear-gradient(90deg, ${typeColor1} 0%, ${typeColor2} 100%);
				`
				} else {
					const typeColor = this.pokemonTypes.find (type => type.name === this.formattedDetails.types[0].type.name).color
					return `background-color: ${typeColor}`
				}
			} else {
				return null
			}
		}
	},
}
</script>

<style>

</style>