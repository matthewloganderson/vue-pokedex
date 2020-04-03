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
				<b-row class="mb-3" v-if="searchType === 'pokemon' && possiblePokemonMatch.length > 0">
					<b-col>
						<b-list-group>
							<b-list-group-item @click="searchTerm = null; $emit ('close_collapse')" class="text-primary" v-for="(pokemon, index) in possiblePokemonMatch" :key="index" :to="{name: 'PokemonDetails', params: {identifier: pokemon.entry_number}}">
								{{ formatText (pokemon.pokemon_species.name) }}
							</b-list-group-item>
						</b-list-group>
					</b-col>
				</b-row>
				<b-row class="mb-3" v-if="searchType === 'type' && possibleTypeMatch.length > 0">
					<b-col>
						<b-list-group>
							<b-list-group-item @click="searchTerm = null; $emit ('close_collapse')" class="text-primary" v-for="(type, index) in possibleTypeMatch" :key="index" :to="{name: 'TypeDetails', params: {type: type.name}}">
								{{ formatText (type.name) }}
							</b-list-group-item>
						</b-list-group>
					</b-col>
				</b-row>
				<b-row v-if="searchTerm && possiblePokemonMatch.length < 1 && possibleTypeMatch.length < 1">
					<b-col>
						<b-alert show variant="light">
							Professor Oak hasn't researched any {{searchType}} by that name.  
						</b-alert>
					</b-col>
				</b-row>
			</b-col>
		</b-row>
	</service-pokemon>
</template>

<script>
import PokemonTypes from '@/constants/PokemonTypes'
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
			pokedex: [],
			types: PokemonTypes
		}
	},
	computed: {
		possiblePokemonMatch () {
			if (this.searchTerm && this.pokedex.length > 0 && this.searchType === 'pokemon') {
				const query = _.snakeCase(this.searchTerm)
				return this.pokedex.filter(pokemon =>
					_.snakeCase (pokemon.pokemon_species.name).includes(query)
				)
			} else {
				return []
			}
		},
		possibleTypeMatch () {
			if (this.searchTerm && this.searchType === 'type') {
				const query = _.snakeCase (this.searchTerm)
				return this.types.filter (
					type => _.snakeCase (type.name).includes (query)
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