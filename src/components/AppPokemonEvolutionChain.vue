<template>
	<b-row>
		<b-col>
			<service-pokemon v-slot @success="evolutionChain = $event" operation="getEvolutionChain" :evolutionChainUrl="evolutionChainUrl">
				<b-row class="mb-4" v-if="prettyEvolutionChain">
					<b-col>
						<b-row class="mb-2">
							<b-col>
								<h5 class="pb-2 border-bottom">
									{{ formatText(prettyEvolutionChain.currentPokemon)}}'s Evolution Chain
								</h5>
							</b-col>
						</b-row>
						<b-row align-h="center" align-v="center">
							<b-col class="mb-3 mb-md-0" cols="12" md="auto" v-if="prettyEvolutionChain.chain.base">
								<service-pokemon operation="getPokemon" :pokemonIdentifier="prettyEvolutionChain.chain.base" v-slot="{pokemon}">
									<b-link :to="{name: 'PokemonDetails', params: {identifier: prettyEvolutionChain.chain.base}}">
										<b-card v-if="pokemon && Object.keys(pokemon).length > 0">
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
							<b-col class="mb-3 mb-md-0 text-center" cols="12" md="auto" v-if="prettyEvolutionChain && prettyEvolutionChain.chain.second.length > 0">
								<h3 class="text-center">
									<font-awesome-icon class="d-none d-md-inline" icon="arrow-circle-right" />
									<font-awesome-icon class="d-md-none d-inline"  icon="arrow-circle-down" />
								</h3>
							</b-col>
							<b-col class="mb-3 mb-md-0" cols="12" md="auto" v-if="prettyEvolutionChain && prettyEvolutionChain.chain.second.length > 0">
								<b-card>
									<b-row v-for="(pokemon, index) in prettyEvolutionChain.chain.second" :key="index">
											<b-col class="text-center">
												<b-link :to="{name: 'PokemonDetails', params: {identifier: pokemon}}">
													<service-pokemon operation="getPokemon" :pokemonIdentifier="pokemon" v-slot="{pokemon:secondPokemon}">
														
														<b-row v-if="secondPokemon && Object.keys (secondPokemon).length > 0">
															<b-col>
																<b-row>
																	<b-col>
																		<b-img v-if="secondPokemon && Object.keys (secondPokemon).length > 0" :src="secondPokemon.sprites.front_default" />
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
							<b-col class="mb-3 mb-md-0 text-center" cols="12" md="auto" v-if="prettyEvolutionChain && prettyEvolutionChain.chain.third.length > 0">
								<h3 class="text-center">
									<font-awesome-icon class="d-none d-md-inline" icon="arrow-circle-right" />
									<font-awesome-icon class="d-md-none d-inline"  icon="arrow-circle-down" />
								</h3>
							</b-col>
							<b-col class="mb-3 mb-md-0" cols="12" md="auto" v-if="prettyEvolutionChain && prettyEvolutionChain.chain.third.length > 0">
								<b-card>
									<b-row v-for="(pokemon, index) in prettyEvolutionChain.chain.third" :key="index">
										<b-col class="text-center">
											<b-link :to="{name: 'PokemonDetails', params: {identifier: pokemon}}">
												<service-pokemon operation="getPokemon" :pokemonIdentifier="pokemon" v-slot="{pokemon:thirdPokemon}">
													<b-row v-if="thirdPokemon && Object.keys (thirdPokemon).length > 0">
														<b-col>
															<b-row>
																<b-col>
																	<b-img v-if="thirdPokemon && Object.keys (thirdPokemon).length > 0" :src="thirdPokemon.sprites.front_default" />
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
import _ from 'lodash'
import ServicePokemon from './ServicePokemon'
export default {
	name: 'AppPokemonEvolutionChain',
	components: {
		ServicePokemon
	},
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
				if (chain.evolves_to.length > 0) {
					evolutionChain.chain.base = this.evolutionChain.chain.species.name
					if (this.evolutionChain.chain.evolves_to.length > 0) {
						const second = this.evolutionChain.chain.evolves_to
						second.forEach (species => evolutionChain.chain.second.push (species.species.name))
						if (second[0].evolves_to.length > 0) {
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
	methods: {
		formatText (text) {
			return _.capitalize (_.replace (text, '-', ' '))
		}
	}
}
</script>

<style>

</style>