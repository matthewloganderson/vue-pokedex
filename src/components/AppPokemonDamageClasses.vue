<template>
	<b-row v-if="type1 && Object.keys (type1).length > 0">
		<b-col class="mb-3 mb-md-0" cols="12" md="4" v-if="damageClasses.resistantTo.length > 0">
			<b-card class="h-100" border-variant="success" no-body>
				<b-card-header>
					<h6 class="font-weight-bold">
						Resistant To
					</h6>
				</b-card-header>
				<b-card-body>
					<app-pokemon-type-badge class="mb-2 d-inline-block" v-for="(type, index) in damageClasses.resistantTo" :key="index" :pokemonType="type" />	
				</b-card-body>
			</b-card>
		</b-col>
		<b-col class="mb-3 mb-md-0" cols="12" md="4" v-if="damageClasses.neutralTo.length > 0">
			<b-card class="h-100" border-variant="warning" no-body>
				<b-card-header>
					<h6 class="font-weight-bold">
						Neutral To
					</h6>
				</b-card-header>
				<b-card-body>
					<app-pokemon-type-badge class="mb-2 d-inline-block" v-for="(type, index) in damageClasses.neutralTo" :key="index" :pokemonType="type" />	
				</b-card-body>
			</b-card>		
		</b-col>
		<b-col class="mb-3 mb-md-0" cols="12" md="4" v-if="damageClasses.weakTo.length > 0">
			<b-card class="h-100" border-variant="danger" no-body>
				<b-card-header>
					<h6 class="font-weight-bold">
						Weak To
					</h6>
				</b-card-header>
				<b-card-body>
					<app-pokemon-type-badge class="mb-2 d-inline-block" v-for="(type, index) in damageClasses.weakTo" :key="index" :pokemonType="type" />	
				</b-card-body>
			</b-card>
		</b-col>
	</b-row>
</template>

<script>
import AppPokemonTypeBadge from './AppPokemonTypeBadge'
import _ from 'lodash'
import { PokemonTypeEndpoints } from '@/constants/Endpoints'
import ApiService from '@/mixins/ApiService'
import PokemonTypes from '@/constants/PokemonTypes'
export default {
	name: 'AppPokemonDamageClasses',
	components: {
		AppPokemonTypeBadge
	},
	props: {
		types: {
			type: Array,
			default: () => {
				return []
			}
		},
		relatedToPokemon: {
			type: Boolean,
			default: true
		}
	},
	mixins: [ApiService],
	data () {
		return {
			typeData: PokemonTypes,
			type1: {},
			type2: {},
			typeEndpoints: PokemonTypeEndpoints
		}
	},
	watch: {
		types: {
			handler: 'getTypeData',
			deep: true,
		}
	},
	mounted () {
		this.getTypeData()
	},
	computed: {
		formatAllTypes () {
			return _.map (_.cloneDeep (this.typeData), 'name')
		},
		typesQty () {
			if (!_.isEmpty (this.type1) && !_.isEmpty (this.type2)) {
				return 2
			} else if (!_.isEmpty (this.type1) && _.isEmpty (this.type2)) {
				return 1
			} else {
				return 0
			}
		},
		damageClasses () {
			const allTypes = this.formatAllTypes;
			if (this.typesQty > 1) {
				const neutralTo = []
				const type1 = this.type1.damage_relations
				const type2 = this.type2.damage_relations
				//combine weaknesses from each type
				const weakTo = this.mapTypeData (type1.double_damage_from, type2.double_damage_from)
				//combine resistances from each type
				const resistantTo = this.mapTypeData (
					type1.half_damage_from, type1.no_damage_from, type2.half_damage_from, type2.no_damage_from
				)
				//find overlap between each type's weaknesses and resistances, add to neutralTo
				weakTo.forEach (
					weakness => {
						if (resistantTo.find (resistance => resistance === weakness)) {
							neutralTo.push (weakness)
						}
					}
				)
				const nonRepresentedTypes = _.difference (allTypes, weakTo.concat (neutralTo, resistantTo))
				return {
					//return only weaknesses
					weakTo: _.difference (weakTo, neutralTo),
					//return only resistances
					resistantTo: _.difference (resistantTo, neutralTo),
					//combine existing neutralTo types (those types where one of the pokemon's types is resistant and the other is weak) with types that were not represented in either resistances or weaknesses
					neutralTo: neutralTo.concat (nonRepresentedTypes)
				}
			} else if (this.typesQty === 1) {
				const type1 = this.type1.damage_relations
				const weakTo = this.mapTypeData (type1.double_damage_from)
				const resistantTo = this.mapTypeData (type1.no_damage_from, type1.half_damage_from)
				const nonRepresentedTypes = _.difference (allTypes, resistantTo.concat (weakTo))
				return {
					weakTo: weakTo,
					resistantTo: resistantTo,
					neutralTo: nonRepresentedTypes
				}
			} else {
				return {}
			}
		}
	},
	methods: {
		async getType (typeIdentifier, dataDestination) {
			await this.callTheProfessor (
				this.typeEndpoints.getPokemonType (typeIdentifier),
				dataDestination
			)
		},
		async getTypeData () {
			this.type1 = {}
			this.type2 = {}
			if (this.types.length > 0) {
				await this.getType (this.relatedToPokemon ? this.types[0].type.name : this.types[0], 'type1')
				if (this.types.length > 1) {
					await this.getType (this.relatedToPokemon ? this.types[1].type.name : this.types[1], 'type2')
				}
			}
		},
		mapTypeData (...types) {
			const combined = _.concat (...types)
			const mapped = _.map (combined, 'name')
			return _.uniq (mapped)
		}
	}
}
</script>

<style>

</style>