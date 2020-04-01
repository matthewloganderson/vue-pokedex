<template>
	<service-pokemon operation="getAllPokemon" @success="pokedex = $event.pokemon_entries">
		<b-row>
			<b-col>
				<b-row>
					<b-col>
						<b-form-group>
							<b-input-group>
								<b-input-group-prepend>
									<b-form-select class="bg-light" v-model="searchType" :options="searchOptions"></b-form-select>
								</b-input-group-prepend>
								<b-input :placeholder="`Enter ${searchType} name`" v-model="searchTerm"></b-input>
							</b-input-group>
						</b-form-group>
					</b-col>
				</b-row>
				<b-row class="mb-3" v-if="possiblePokemonMatch.length > 0">
					<b-col>
						<b-list-group>
							<b-list-group-item class="text-primary" v-for="(pokemon, index) in possiblePokemonMatch" :key="index" :to="{name: 'PokemonDetails', params: {identifier: pokemon.entry_number}}">
								{{ formatText (pokemon.pokemon_species.name) }}
							</b-list-group-item>
						</b-list-group>
					</b-col>
				</b-row>
			</b-col>
		</b-row>
	</service-pokemon>
</template>

<script>
import _ from 'lodash'
import ServicePokemon from './ServicePokemon'
import SearchTypes from '@/constants/SearchTypes'
export default {
	name: 'AppSearchBar',
	components: {
		ServicePokemon
	},
	data () {
		return {
			searchOptions: SearchTypes,
			searchType: 'pokemon',
			searchTerm: null,
			pokedex: []
		}
	},
	computed: {
		possiblePokemonMatch () {
			if (this.searchTerm && this.pokedex.length > 0) {
				const query = _.snakeCase(this.searchTerm)
				return this.pokedex.filter(pokemon =>
					pokemon.pokemon_species.name.includes(query)
				)
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