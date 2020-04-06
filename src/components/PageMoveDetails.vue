<template>
	<service-move v-slot @success="move = $event" :moveIdentifier="$route.params.move" operation="getMove">
		<b-row v-if="move && !isEmpty (move)" align-h="center">
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
						<b-row class="mb-2">
							<b-col>
								<h5 class="border-bottom pb-2">
									{{ moveName }}'s Effects & Targets
								</h5>
							</b-col>
						</b-row>
						<b-row class="mb-4">
							<b-col>
								<app-move-effects :moveName="moveName" :move="move" />
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
								<app-move-stats :move="move" />
							</b-col>
						</b-row>
					</b-card-body>
				</b-card>
			</b-col>
		</b-row>
	</service-move>
</template>

<script>
import FormatText from '@/mixins/FormatText'
import IsEmpty from '@/mixins/IsEmpty'
import AppMoveEffects from './AppMoveEffects'
import AppMoveStats from './AppMoveStats'
import AppPokemonTypeBadge from './AppPokemonTypeBadge'
import AppPokemonDescriptionPicker from './AppPokemonDescriptionPicker'
import ServiceMove from './ServiceMove'
export default {
	name: 'PageMoveDetails',
	components: {
		ServiceMove,
		AppPokemonDescriptionPicker,
		AppPokemonTypeBadge,
		AppMoveStats,
		AppMoveEffects
	},
	mixins: [FormatText, IsEmpty],
	data () {
		return {
			move: {}
		}
	},
	computed: {
		moveName () {
			if (this.move && !this.isEmpty(this.move)) {
				return this.move.names.find (move => move.language.name === 'en').name
			} else {
				return null
			}
		},
		englishDescriptions () {
			if (this.move && !this.isEmpty (this.move)) {
				return this.move.flavor_text_entries.filter (text => text.language.name === 'en')
			} else {	
				return []
			}
		}
	},
}
</script>

<style>

</style>