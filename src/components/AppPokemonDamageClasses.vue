<template>
	<b-row v-if="Object.keys (type1).length > 0">
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
			handler: 'getTypeData'
		}
	},
	mounted () {
		if (this.types.length > 0) {
			this.getTypeData()
		}
	},
	computed: {
		damageClasses () {
			const allTypes = _.map (_.cloneDeep (this.typeData), 'name')
			const damageClasses = {
				weakTo: [],
				resistantTo: [], 
				neutralTo: []
			}
			if (Object.keys (this.type1).length > 0 && Object.keys (this.type2).length > 0) {
				const type1 = this.type1.damage_relations
				const type2 = this.type2.damage_relations
				damageClasses.weakTo = _.uniq(_.map(type1.double_damage_from.concat(type2.double_damage_from), 'name'))
				damageClasses.resistantTo = _.uniq(_.map (type1.half_damage_from.concat (type1.no_damage_from, type2.half_damage_from, type2.no_damage_from), 'name'))
				damageClasses.weakTo.forEach (
					weakness => {
						if (damageClasses.resistantTo.find (resistance => resistance === weakness)) {
							damageClasses.neutralTo.push (weakness)
						}
					}
				)
				const nonRepresentedTypes = _.difference (allTypes, damageClasses.weakTo.concat (damageClasses.neutralTo, damageClasses.resistantTo))
				return {
					weakTo: _.difference (damageClasses.weakTo, damageClasses.neutralTo),
					resistantTo: _.difference (damageClasses.resistantTo, damageClasses.neutralTo),
					neutralTo: damageClasses.neutralTo.concat (nonRepresentedTypes)
				}
			} else if (Object.keys (this.type1).length > 0 && Object.keys (this.type2).length < 1) {
				const type1 = this.type1.damage_relations
				const weakTo = _.map (type1.double_damage_from, 'name')
				const resistantTo = _.map(type1.half_damage_from.concat (type1.no_damage_from), 'name')
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
			try {
				const response = await this.askProfessor (
					'get',
					this.typeEndpoints.getPokemonType (typeIdentifier)
				)
				this.setLocalValue (dataDestination, response)
			} catch (error) {
				this.$emit ("error", error)
				this.handleError()
			}
		},
		async getTypeData () {
			this.type1 = {}
			this.type2 = {}
			if (this.types.length > 0) {
				await this.getType (this.types[0].type.name, 'type1')
				if (this.types.length > 1) {
					await this.getType (this.types[1].type.name, 'type2')
				}
			}
		}
	}
}
</script>

<style>

</style>