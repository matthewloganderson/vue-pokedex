<template>
	<service-pokemon @success="type = $event" operation="getType" :typeIdentifier="$route.params.type">
		<b-row align-h="center">
			<b-col v-if="Object.keys (type).length > 0" cols="12" md="10" lg="9" xl="8">
				<b-card no-body>
					<b-card-header>
						<h3 class="text-center">
							<span :style="`color: ${currentTypeData.color}`">
								<font-awesome-icon v-if="currentTypeData && currentTypeData.icon" class="mr-2" :icon="currentTypeData.icon" />
							</span>
							{{ formatText (type.name) }}
						</h3>
					</b-card-header>
					<b-card-body>
						<b-row>
							<b-col>
								<h5 class="pb-2 border-bottom">
									{{ formatText (type.name) }} Type Pokemon
								</h5>
							</b-col>
						</b-row>
						<b-row class="mt-2 mb-4">
							<b-col>
								<app-pokemon-list :pokemon="type.pokemon" />
							</b-col>
						</b-row>
						<b-row>
							<b-col>
								<h5 class="pb-2 border-bottom">
									{{ formatText (type.name) }} Type Moves
								</h5>
							</b-col>
						</b-row>
						<b-row class="mt-2 mb-4">
							<b-col>
								<app-pokemon-moves :relatedToPokemon="false" :moves="type.moves" />
							</b-col>
						</b-row>
						<b-row>
							<b-col>
								<h5 class="pb-2 border-bottom">
									{{ formatText (type.name) }} Type Weaknesses & Resistances
								</h5>
							</b-col>
						</b-row>
						<b-row  v-if="type && Object.keys (type).length > 0" class="mt-2">
							<b-col>
								<app-pokemon-damage-classes :relatedToPokemon="false" :types="[type]" />
							</b-col>
						</b-row>
					</b-card-body>
				</b-card>
			</b-col>
		</b-row>
	</service-pokemon>
</template>

<script>
import AppPokemonDamageClasses from './AppPokemonDamageClasses'
import AppPokemonMoves from './AppPokemonMoves'
import AppPokemonList from './AppPokemonList'
import _ from 'lodash'
import PokemonTypes from '@/constants/PokemonTypes'
import ServicePokemon from './ServicePokemon'
export default {
	name: 'PageTypeDetails',
	components: {
		ServicePokemon,
		AppPokemonList,
		AppPokemonMoves,
		AppPokemonDamageClasses
	},
	data () {
		return {
			type: {},
			typesData: PokemonTypes
		}
	},
	computed:{
		currentTypeData () {
			if (Object.keys(this.type).length > 0) {
				return this.typesData.find (type => type.name === this.type.name)
			} else {
				return {}
			}
		}
	},
	methods: {
		formatText (text) {
			return _.capitalize(_.replace (text, '-', ' '))
		}
	}
}
</script>

<style>

</style>