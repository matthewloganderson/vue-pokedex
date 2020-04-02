<template>
	<service-move v-slot @success="move = $event" :moveIdentifier="$route.params.move" operation="getMove">
		<b-row v-if="move && Object.keys (move).length > 0" align-h="center">
			<b-col cols="12" md="10" lg="9" xl="8">
				<b-card no-body>
					<b-card-header>
						<b-row align-v="center" align-h="center">
							<b-col cols="auto">
								<h3 class="text-center">
									{{ moveName }}
								</h3>
							</b-col>
							<b-col cols="auto">
								<app-pokemon-type-badge :pokemonType="move.type.name" />
							</b-col>
						</b-row>
					</b-card-header>
					<b-card-body>
						<b-row>
							<b-col>
								<h5 class="border-bottom pb-2">
									About {{ moveName }}
								</h5>
							</b-col>
						</b-row>
						<b-row class="mb-4">
							<b-col>
								<app-pokemon-description-picker :relatedToPokemon="false" :descriptions="englishDescriptions" />
							</b-col>
						</b-row>
						<b-row>
							<b-col>
								<h5 class="border-bottom pb-2">
									{{ moveName }}'s Stats
								</h5>
							</b-col>
						</b-row>
						<b-row>
							<b-col>
								<b-row class="mt-2">
									<b-col v-if="move.power">
										<b-card class="text-center">
											<h6>
												Power
											</h6>
											<span>
												{{ move.power }}
											</span>
										</b-card>
									</b-col>
									<b-col v-if="move.pp">
										<b-card class="text-center">
											<h6>
												PP
											</h6>
											<span>
												{{ move.pp }}
											</span>
										</b-card>
									</b-col>
									<b-col v-if="move.accuracy">
										<b-card class="text-center">
											<h6>
												Accuracy
											</h6>
											<span>
												{{ move.accuracy }}%
											</span>
										</b-card>
									</b-col>
									<b-col v-if="move.accuracy">
										<b-card class="text-center">
											<h6>
												Damage Type
											</h6>
											<span>
												{{ formatText(move.damage_class.name) }}
											</span>
										</b-card>
									</b-col>
								</b-row>
							</b-col>
						</b-row>
					</b-card-body>
				</b-card>
			</b-col>
		</b-row>
	</service-move>
</template>

<script>
import _ from 'lodash'
import AppPokemonTypeBadge from './AppPokemonTypeBadge'
import AppPokemonDescriptionPicker from './AppPokemonDescriptionPicker'
import ServiceMove from './ServiceMove'
export default {
	name: 'PageMoveDetails',
	components: {
		ServiceMove,
		AppPokemonDescriptionPicker,
		AppPokemonTypeBadge
	},
	data () {
		return {
			move: {}
		}
	},
	computed: {
		moveName () {
			if (this.move && Object.keys (this.move).length > 0) {
				return this.move.names.find (move => move.language.name === 'en').name
			} else {
				return null
			}
		},
		englishDescriptions () {
			if (this.move && Object.keys (this.move).length > 0) {
				return this.move.flavor_text_entries.filter (text => text.language.name === 'en')
			} else {	
				return []
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