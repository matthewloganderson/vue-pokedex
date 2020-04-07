<template>
	<service-pokemon @success="pokemonDetails = $event" operation="getPokemon" :pokemonIdentifier="$route.params.identifier">
		<b-row align-h="center">
			<b-col cols="12" md="10" lg="9" xl="8" v-if="pokemonDetails">
				<service-pokemon @success="pokemonSpeciesDetails = $event" operation="getPokemonSpecies" :pokemonSpeciesIdentifier="pokemonDetails.species.name">
					<div :style="typeBorderStyle" class="p-1 rounded">
						<b-card v-if="formattedDetails && formattedSpeciesDetails" class="border-0 bg-white" no-body>
							<b-card-header>
								<app-pokemon-basic-details v-if="formattedDetails && formattedSpeciesDetails" :pokemon="formattedDetails" :species="formattedSpeciesDetails" />
							</b-card-header>
							<b-card-body>
								<app-section-heading>
									About {{ formattedDetails.name }}
								</app-section-heading>
								<app-pokemon-description-picker class="mb-4" v-if="formattedSpeciesDetails" :descriptions="formattedSpeciesDetails.longDescriptions" />
								<app-pokemon-evolution-chain class="mb-4" :currentPokemon="pokemonDetails.species.name" :evolutionChainUrl="formattedSpeciesDetails.evolutionChain" />
								<app-section-heading>
									{{ formattedDetails.name }}'s Base Stats
								</app-section-heading>
								<app-pokemon-stats class="mb-4 mt-1" v-if="formattedDetails" :stats="formattedDetails.stats" />
								<app-section-heading>
									{{ formattedDetails.name }}'s Abilities
								</app-section-heading>
								<app-pokemon-abilities class="mb-4" v-if="formattedDetails" :abilities="formattedDetails.abilities" />
								<app-section-heading class="mb-3">
									Moves {{ formattedDetails.name }} Can Learn
								</app-section-heading>
								<app-pokemon-moves class="mb-4" v-if="formattedDetails" :moves="formattedDetails.moves" />
								<app-section-heading class="mb-3">
											{{ formattedDetails.name }}'s Appearance
								</app-section-heading>
								<app-pokemon-appearance class="mb-4" v-if="formattedDetails" :sprites="formattedDetails.sprites" />
								<app-section-heading v-if="formattedSpeciesDetails && formattedSpeciesDetails.variants.length > 1">
									{{ formattedDetails.name }}'s Forms
								</app-section-heading>
								<app-pokemon-variants-picker class="mb-4" v-if="formattedSpeciesDetails && formattedSpeciesDetails.variants.length > 1" :variants="formattedSpeciesDetails.variants" />
								<app-section-heading>
									{{ formattedDetails.name }}'s Weaknesses & Resistances
								</app-section-heading>
								<app-pokemon-damage-classes class="mb-4" v-if="formattedDetails && !isEmpty (formattedDetails.types)" :types="formattedDetails.types" />
							</b-card-body>
						</b-card>
					</div>
				</service-pokemon>
			</b-col>
		</b-row>
	</service-pokemon>
</template>

<script>
import IsEmpty from '@/mixins/IsEmpty'
import AppSectionHeading from './AppSectionHeading'
import AppPokemonDamageClasses from './AppPokemonDamageClasses'
import AppPokemonEvolutionChain from './AppPokemonEvolutionChain'
import AppPokemonVariantsPicker from './AppPokemonVariantsPicker'
import AppPokemonAppearance from './AppPokemonAppearance'
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
		AppPokemonMoves,
		AppPokemonAppearance,
		AppPokemonVariantsPicker,
		AppPokemonEvolutionChain,
		AppPokemonDamageClasses,
		AppSectionHeading,
	},
	mixins: [
		IsEmpty
	],
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