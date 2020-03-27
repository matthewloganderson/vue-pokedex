<template>
	<b-row>
		<b-col v-for="(ability, index) in abilities" :key="index">
			<service-pokemon v-slot="{ability: abilityDetails}" operation="getAbility" :pokemonAbilityIdentifier="ability.ability.name">
				{{abilityDetails.effect_entries[0].effect}}
			</service-pokemon>
		</b-col>
	</b-row>
</template>

<script>
import ServicePokemon from './ServicePokemon'
export default {
	name: 'AppPokemonAbilities',
	components: {
		ServicePokemon
	},
	props: {
		abilities: {
			type: Array,
			default: () => {
				return []
			},
		}
	},
}
</script>

<style>

</style>