<template>
	<b-row>
		<b-col>
			<service-pokemon v-slot @success="evolutionChain = $event" operation="getEvolutionChain" :evolutionChainUrl="evolutionChainUrl">
				<b-row class="mb-4" v-if="prettyEvolutionChain">
					<b-col>
						<app-section-heading class="mb-2">
							{{ formatText(prettyEvolutionChain.currentPokemon)}}'s Evolution Chain
						</app-section-heading>
						<b-row align-h="center" align-v="center">
							<b-col class="mb-3 mb-md-0" cols="12" md="auto" v-if="prettyEvolutionChain.chain.base">
								<service-pokemon operation="getPokemon" :pokemonIdentifier="prettyEvolutionChain.chain.base" v-slot="{pokemon}">
									<b-link :to="{name: 'PokemonDetails', params: {identifier: prettyEvolutionChain.chain.base}}">
										<b-card v-if="pokemon && !isEmpty(pokemon)">
											<b-row>
												<b-col class="text-center">
														<b-img :src="pokemon.sprites.front_default" />
												</b-col>
											</b-row>
											<b-row>
												<b-col class="text-center">
													<span>
														{{ formatText(prettyEvolutionChain.chain.base) }}
													</span>
												</b-col>
											</b-row>
										</b-card>
									</b-link>
								</service-pokemon>
							</b-col>
							<b-col class="mb-3 mb-md-0 text-center" cols="12" md="auto" v-if="prettyEvolutionChain && !isEmpty(prettyEvolutionChain.chain.second)">
								<h3 class="text-center">
									<font-awesome-icon class="d-none d-md-inline" icon="arrow-circle-right" />
									<font-awesome-icon class="d-md-none d-inline"  icon="arrow-circle-down" />
								</h3>
							</b-col>
							<b-col class="mb-3 mb-md-0" cols="12" md="auto" v-if="prettyEvolutionChain && !isEmpty(prettyEvolutionChain.chain.second)">
								<b-card>
									<b-row v-for="(pokemon, index) in prettyEvolutionChain.chain.second" :key="index">
											<b-col class="text-center">
												<b-link :to="{name: 'PokemonDetails', params: {identifier: pokemon}}">
													<service-pokemon operation="getPokemon" :pokemonIdentifier="pokemon" v-slot="{pokemon:secondPokemon}">
														
														<b-row v-if="secondPokemon && !isEmpty(secondPokemon)">
															<b-col>
																<b-row>
																	<b-col>
																		<b-img v-if="secondPokemon && !isEmpty(secondPokemon)" :src="secondPokemon.sprites.front_default" />
																	</b-col>
																</b-row>
																<b-row>
																	<b-col class="text-center">
																		<span>
																			{{ formatText(pokemon) }}
																		</span>
																	</b-col>
																</b-row>
															</b-col>
														</b-row>
													</service-pokemon>
												</b-link>
											</b-col>
									</b-row>
								</b-card>
							</b-col>
							<b-col class="mb-3 mb-md-0 text-center" cols="12" md="auto" v-if="prettyEvolutionChain && !isEmpty(prettyEvolutionChain.chain.third)">
								<h3 class="text-center">
									<font-awesome-icon class="d-none d-md-inline" icon="arrow-circle-right" />
									<font-awesome-icon class="d-md-none d-inline"  icon="arrow-circle-down" />
								</h3>
							</b-col>
							<b-col class="mb-3 mb-md-0" cols="12" md="auto" v-if="prettyEvolutionChain && !isEmpty(prettyEvolutionChain.chain.third)">
								<b-card>
									<b-row v-for="(pokemon, index) in prettyEvolutionChain.chain.third" :key="index">
										<b-col class="text-center">
											<b-link :to="{name: 'PokemonDetails', params: {identifier: pokemon}}">
												<service-pokemon operation="getPokemon" :pokemonIdentifier="pokemon" v-slot="{pokemon:thirdPokemon}">
													<b-row v-if="thirdPokemon && !isEmpty(thirdPokemon)">
														<b-col>
															<b-row>
																<b-col>
																	<b-img v-if="thirdPokemon && !isEmpty(thirdPokemon)" :src="thirdPokemon.sprites.front_default" />
																</b-col>
															</b-row>
															<b-row>
																<b-col class="text-center">
																	<span>
																		{{ formatText(pokemon) }}
																	</span>
																</b-col>
															</b-row>
														</b-col>
													</b-row>
												</service-pokemon>
											</b-link>
										</b-col>
									</b-row>
								</b-card>
							</b-col>
						</b-row>
					</b-col>
				</b-row>
			</service-pokemon>
		</b-col>
	</b-row>
</template>

<script>
import IsEmpty from '@/mixins/IsEmpty'
import FormatText from '@/mixins/FormatText'
import AppSectionHeading from './AppSectionHeading'
import _ from 'lodash'
import ServicePokemon from './ServicePokemon'
export default {
	name: 'AppPokemonEvolutionChain',
	components: {
		ServicePokemon,
		AppSectionHeading
	},
	mixins: [FormatText, IsEmpty],
	props: {
		currentPokemon: {
			type: String,
			default: null,
		},
		evolutionChainUrl: {
			type: String,
			default: null,
		}
	},
	data () {
		return {
			evolutionChain: null
		}
	},
	computed: {
		prettyEvolutionChain () {
			if (!_.isEmpty (this.evolutionChain) && this.currentPokemon) {
				const evolutionChain = {
					chain: {
						base: null,
						second: [],
						third: []
					},
					currentPokemon: this.currentPokemon,
					positionInChain: null
				}
				const chain = this.evolutionChain.chain
				if (!this.isEmpty(chain.evolves_to)) {
					evolutionChain.chain.base = this.evolutionChain.chain.species.name
					if (!this.isEmpty(this.evolutionChain.chain.evolves_to)) {
						const second = this.evolutionChain.chain.evolves_to
						second.forEach (species => evolutionChain.chain.second.push (species.species.name))
						if (!this.isEmpty(second[0].evolves_to)) {
							const third = second[0].evolves_to
							third.forEach (species => evolutionChain.chain.third.push (species.species.name))
						}
					}
					if (evolutionChain.currentPokemon === evolutionChain.chain.base) {
						evolutionChain.positionInChain = 'base'
					} else if (evolutionChain.chain.second.find (pokemon => pokemon === evolutionChain.currentPokemon)) {
						evolutionChain.chain.second = [evolutionChain.currentPokemon]
						evolutionChain.positionInChain = 'second'
					} else if (evolutionChain.chain.third.find (pokemon => pokemon === evolutionChain.currentPokemon)) {
						evolutionChain.chain.third = [evolutionChain.currentPokemon]
						evolutionChain.positionInChain = 'third'
					}
					return evolutionChain
				} else {
					return false
				}
			} else {
				return false
			}
		}
	},
}
</script>

<style>

</style>