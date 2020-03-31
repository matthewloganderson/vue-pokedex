<template>
	<b-row>
		<b-col>
		</b-col>
	</b-row>
</template>

<script>
import _ from 'lodash'
import { PokemonTypeEndpoints } from '@/constants/Endpoints'
import ApiService from '@/mixins/ApiService'
import PokemonTypes from '@/constants/PokemonTypes'
export default {
	name: 'AppPokemonDamageClasses',
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
				const nonRepresentedTypes = _.difference (type1.double_damage_from.concat (type1.half_damage_from, type1.no_damage_from))
				return {
					weakTo: type1.double_damage_from,
					resistantTo: type1.half_damage_from.concat (type1.no_damage_from),
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