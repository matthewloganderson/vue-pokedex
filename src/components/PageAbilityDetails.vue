<template>
	<service-pokemon v-slot="{loading}" @success="ability = $event" operation="getAbility" :pokemonAbilityIdentifier="$route.params.ability">
		<b-row v-if="ability && !isEmpty(ability) && !loading" align-h="center">
			<b-col cols="12" md="10" lg="9" xl="8">
				<b-card no-body>
					<b-card-header>
						<h3 class="text-center">
							{{ abilityName }}
						</h3>
					</b-card-header>
					<b-card-body>
						<b-row>
							<b-col>
								<h5 class="border-bottom pb-2">
									About {{ abilityName }}
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
									{{ abilityName }}'s Effects
								</h5>
							</b-col>
						</b-row>
						<b-row class="mb-4 mt-3">
							<b-col>
								<p>
									{{ ability.effect_entries[0].effect }}
								</p>
							</b-col>
						</b-row>
						<b-row class="mb-3">
							<b-col>
								<h5 class="border-bottom pb-2">
									Pokemon with {{ abilityName }}
								</h5>
							</b-col>
						</b-row>
						<b-row>
							<b-col>
								<app-pokemon-list :pokemon="ability.pokemon" />
							</b-col>
						</b-row>
					</b-card-body>
				</b-card>
			</b-col>
		</b-row>
		<app-loading v-else />
	</service-pokemon>
</template>

<script>
import AppLoading from './AppLoading'
import IsEmpty from '@/mixins/IsEmpty'
import AppPokemonList from './AppPokemonList'
import AppPokemonDescriptionPicker from './AppPokemonDescriptionPicker'
import ServicePokemon from './ServicePokemon'
export default {
	name: 'PageAbilityDetails',
	components: {
		ServicePokemon,
		AppPokemonDescriptionPicker,
		AppPokemonList,
		AppLoading
	},
	mixins: [IsEmpty],
	data () {
		return {
			ability: {}
		}
	},
	computed: {
		abilityName () {
			if (this.ability && !this.isEmpty (this.ability)) {
				return this.ability.names.find (
					name => name.language.name === 'en'
				).name
			} else {
				return null
			}
		},
		englishDescriptions () {
			if (this.ability && !this.isEmpty(this.ability)) {
				return this.ability.flavor_text_entries.filter (
					description => description.language.name === 'en'
				)
			} else {
				return []
			}
		}
	}
}
</script>

<style>

</style>