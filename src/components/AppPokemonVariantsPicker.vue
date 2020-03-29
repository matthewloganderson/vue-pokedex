<template>
	<b-row>
		<b-col>
			<b-row align-h="center">
				<b-col class="text-center mb-3" cols="12" md="6" lg="4" xl="3" v-for="(variant, index) in nonDefaultVariants" :key="index">
					<b-card>
						<service-pokemon operation="getPokemon" :pokemonIdentifier="variant.pokemon.name" v-slot="{pokemon: variantPokemonDetails}">
							<b-link @click="selectVariant(variantPokemonDetails)" v-if="nonDefaultVariants.length > 0">
								<b-row>
									<b-col v-if="Object.keys (variantPokemonDetails).length > 0">
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
				<b-modal hide-footer :title="formatText(currentPokemonData.name)" size="xl" centered v-model="showModal">
					<b-container fluid>
						<b-row>
							<b-col>
								<b-row class="mb-3">
									<b-col>
										<h5 class="pb-2 border-bottom">
											{{ formatText(formattedDetails.name) }}'s Appearance
										</h5>
									</b-col>
								</b-row>
								<b-row class="mb-4">
									<b-col>
										<app-pokemon-appearance v-if="formattedDetails" :sprites="formattedDetails.sprites" />
									</b-col>
								</b-row>
								<b-row>
									<b-col>
										<h5 class="pb-2 border-bottom">
											{{ formatText(formattedDetails.name) }}'s Base Stats
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
											{{ formatText(formattedDetails.name) }}'s Abilities
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
											Moves {{ formatText(formattedDetails.name) }} Can Learn
										</h5>
									</b-col>
								</b-row>
								<b-row class="mb-4">
									<b-col>
										<app-pokemon-moves v-if="formattedDetails" :moves="formattedDetails.moves" />
									</b-col>
								</b-row>
							</b-col>
						</b-row>
					</b-container>
				</b-modal>
			</b-row>
		</b-col>
	</b-row>
</template>

<script>
import AppPokemonAppearance from './AppPokemonAppearance'
import AppPokemonMoves from './AppPokemonMoves'
import AppPokemonAbilities from './AppPokemonAbilities'
import AppPokemonStats from './AppPokemonStats'
import {PokemonDetails} from '@/classes/PokemonDetails'
import _ from 'lodash'
import ServicePokemon from './ServicePokemon'
export default {
	name: 'AppPokemonVariantsPicker',
	components: {
		ServicePokemon,
		AppPokemonAppearance,
		AppPokemonMoves,
		AppPokemonAbilities,
		AppPokemonStats
	},
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
			if (this.variants.length > 0) {
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
		formatText(text) {
			return _.capitalize(_.replace (text, '-', ' '))
		},
		selectVariant (pokemonDetails) {
			this.currentPokemonData = pokemonDetails
			this.showModal = true;
		}
	}
}
</script>

<style>

</style>