<template>
	<b-row class="mt-1">
		<b-col class="mb-4" cols="12" md="6" v-for="(ability, index) in abilities" :key="index">
			<service-pokemon v-slot="{ability: abilityDetails}" operation="getAbility" :pokemonAbilityIdentifier="ability.ability.name">
				<b-card class="h-100">
					<b-row class="mb-4">
						<b-col>
							<b-link :to="{name: 'AbilityDetails', params: {ability: ability.ability.name}}">
								<h6 class="font-weight-bold">
									{{ removeHyphenCapitalize(ability.ability.name) }}
								</h6>
							</b-link>
							<p v-if="!isEmpty(abilityDetails)">
								{{abilityDetails.effect_entries[0].short_effect}}
							</p>
							<b-link @click="toggleCollapse(`${ability.ability.name}__collapse`)">
								More 
								<font-awesome-icon icon="chevron-down" class="ml-2" />
							</b-link>
							<b-collapse :id="`${ability.ability.name}__collapse`">
								<b-row class="mt-2">
									<b-col>
										<h6>
											Detailed Info
										</h6>
										<p v-if="!isEmpty(abilityDetails)">
											{{abilityDetails.effect_entries[0].effect}}
										</p>
									</b-col>
								</b-row>
							</b-collapse>
						</b-col>
					</b-row>
				</b-card>
			</service-pokemon>
		</b-col>
	</b-row>
</template>

<script>
import ToggleCollapse from '@/mixins/ToggleCollapse'
import IsEmpty from '@/mixins/IsEmpty'
import _ from 'lodash'
import ServicePokemon from './ServicePokemon'
export default {
	name: 'AppPokemonAbilities',
	components: {
		ServicePokemon
	},
	mixins: [IsEmpty, ToggleCollapse],
	props: {
		abilities: {
			type: Array,
			default: () => {
				return []
			},
		}
	},
	methods: {
		removeHyphenCapitalize (text) {
			return _.capitalize (_.replace (text, '-', ' '))
		},
	}
}
</script>

<style>

</style>