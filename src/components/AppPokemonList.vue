<template>
	<b-row v-if="!isEmpty(pokemon)">
		<b-col>
			<b-row>
				<b-col class="mb-3" cols="6" md="3" v-for="(pokemon, index) in chunkedPokemon[currentChunk]" :key="index">
					<service-pokemon v-slot="{pokemon: pokemonDetails}" operation="getPokemon" :pokemonIdentifier="pokemon.pokemon ? pokemon.pokemon.name : pokemon.name">
						<b-link v-if="pokemonDetails && !isEmpty(pokemonDetails)" :to="{name: 'PokemonDetails', params: {identifier: pokemonDetails.id}}">
							<b-card class="h-100">
								<b-row>
									<b-col class="text-center">
										<b-img :alt="pokemonDetails.name" fluid :src="pokemonDetails.sprites.front_default" />
									</b-col>
								</b-row>
								<b-row>
									<b-col class="text-center">
										<h6>
											{{ formatText (pokemonDetails.name) }}
										</h6>
									</b-col>
								</b-row>
							</b-card>
						</b-link>
					</service-pokemon>
				</b-col>
			</b-row>
			<b-row>
				<b-col>
					<b-btn variant="info" @click="currentChunk--" :disabled="!canRecede" class="w-100">
						<font-awesome-icon icon="chevron-left" class="mr-2" />
						Previous
					</b-btn>
				</b-col>
				<b-col>
					<b-btn variant="info" @click="currentChunk++" :disabled="!canProceed" class="w-100">
						Next
						<font-awesome-icon icon="chevron-right" class="ml-2" />
					</b-btn>
				</b-col>
			</b-row>
		</b-col>
	</b-row>
</template>

<script>
import _ from 'lodash'
import FormatText from '@/mixins/FormatText'
import IsEmpty from '@/mixins/IsEmpty'
import ServicePokemon from './ServicePokemon'
export default {
	name: 'AppPokemonList',
	components: {
		ServicePokemon
	},
	mixins: [IsEmpty, FormatText],
	props: {
		pokemon: {
			type: Array,
			default: () => {
				return []
			}
		}
	},
	data () {
		return {
			currentChunk: 0
		}
	},
	computed: {
		canProceed () {
			if (this.currentChunk + 1 < this.chunkedPokemon.length - 1) {
				return true
			} else {
				return false
			}
		},
		canRecede () {
			if (this.currentChunk - 1 >= 0) {
				return true
			} else {
				return false
			}
		},
		chunkedPokemon () {
			if (!this.isEmpty(this.pokemon)) {
				return _.chunk (this.pokemon, 4)
			} else {
				return []
			}
		}
	},
}
</script>

<style>

</style>