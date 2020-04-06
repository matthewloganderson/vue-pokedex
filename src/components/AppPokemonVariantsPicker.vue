<template>
	<b-row>
		<b-col>
			<b-row align-h="center">
				<b-col class="text-center mb-3" cols="12" md="6" lg="4" xl="3" v-for="(variant, index) in nonDefaultVariants" :key="index">
					<b-card>
						<service-pokemon operation="getPokemon" :pokemonIdentifier="variant.pokemon.name" v-slot="{pokemon: variantPokemonDetails}">
							<b-link @click="selectVariant(variantPokemonDetails)" v-if="!isEmpty(nonDefaultVariants)">
								<b-row>
									<b-col v-if="!isEmpty (variantPokemonDetails)">
										<b-img fluid :src="variantPokemonDetails.sprites.front_default" />
									</b-col>
								</b-row>
								<b-row>
									<b-col>
										<span v-if="variantPokemonDetails.name">
											{{formatText(variantPokemonDetails.name)}}
										</span>
									</b-col>
								</b-row>
							</b-link>
						</service-pokemon>
					</b-card>
				</b-col>
			</b-row>
			<b-row v-if="currentPokemonData">
				<b-modal ok-only size="xl" centered v-model="showModal">
					<template v-slot:modal-title>
						<b-row>
							<b-col>
								{{ formatText(currentPokemonData.name) }}
							</b-col>
						</b-row>
						<b-row>
							<b-col>
								<span class="small">
									<app-pokemon-type-badge v-for="(type, index) in formattedDetails.types" :key="index" :pokemonType="type.type.name" />
								</span>
							</b-col>
						</b-row>
					</template>
					<b-container fluid>
						<b-row>
							<b-col>
								<app-section-heading>
									{{ formatText(formattedDetails.name) }}'s Appearance
								</app-section-heading>
								<app-pokemon-appearance class="mb-4" v-if="formattedDetails" :sprites="formattedDetails.sprites" />
								<app-section-heading>
									{{ formatText(formattedDetails.name) }}'s Base Stats
								</app-section-heading>
								<app-pokemon-stats class="mb-4 mt-1" v-if="formattedDetails" :stats="formattedDetails.stats" />
								<app-section-heading>
									{{ formatText(formattedDetails.name) }}'s Abilities
								</app-section-heading>
								<app-pokemon-abilities class="mb-4" v-if="formattedDetails" :abilities="formattedDetails.abilities" />
								<app-section-heading class="mb-3">
									Moves {{ formatText(formattedDetails.name) }} Can Learn
								</app-section-heading>
								<app-pokemon-moves class="mb-4" v-if="formattedDetails" :moves="formattedDetails.moves" />
								<app-section-heading class="mb-3">
									{{ formatText(formattedDetails.name) }}'s Weaknesses & Resistances
								</app-section-heading>
								<app-pokemon-damage-classes :types="formattedDetails.types" />
							</b-col>
						</b-row>
					</b-container>
				</b-modal>
			</b-row>
		</b-col>
	</b-row>
</template>

<script>
import AppPokemonDamageClasses from './AppPokemonDamageClasses'
import AppPokemonTypeBadge from './AppPokemonTypeBadge'
import AppSectionHeading from './AppSectionHeading'
import FormatText from '@/mixins/FormatText'
import IsEmpty from '@/mixins/IsEmpty'
import AppPokemonAppearance from './AppPokemonAppearance'
import AppPokemonMoves from './AppPokemonMoves'
import AppPokemonAbilities from './AppPokemonAbilities'
import AppPokemonStats from './AppPokemonStats'
import {PokemonDetails} from '@/classes/PokemonDetails'
import ServicePokemon from './ServicePokemon'
export default {
	name: 'AppPokemonVariantsPicker',
	components: {
		ServicePokemon,
		AppPokemonAppearance,
		AppPokemonMoves,
		AppPokemonAbilities,
		AppPokemonStats,
		AppSectionHeading,
		AppPokemonTypeBadge,
		AppPokemonDamageClasses
	},
	mixins: [IsEmpty, FormatText],
	props: {
		variants: {
			type: Array,
			default: () => {
				return []
			}
		}
	},
	data () {
		return {
			showModal: false,
			selectedVariant: null,
			currentPokemonData: null
		}
	},
	computed: {
		nonDefaultVariants () {
			if (!this.isEmpty(this.variants)) {
				return this.variants.filter (variant => !variant.is_default)
			} else {
				return []
			}
		},
		formattedDetails () {
			if (this.currentPokemonData) {
				return new PokemonDetails (this.currentPokemonData)
			} else {
				return null
			}
		},
	},
	methods: {
		selectVariant (pokemonDetails) {
			this.currentPokemonData = pokemonDetails
			this.showModal = true;
		}
	}
}
</script>

<style>

</style>