<template>
	<b-row>
		<b-col>
			<b-row v-if="Object.keys (pokemon).length > 0" align-v="center" align-h="center">
				<b-col class="text-center text-md-left" cols="12" md="auto" lg="auto" xl="auto">
					<b-badge variant="dark" class="rounded mb-0 pb-0">
						<h6 class="mb-1">
							#{{ pokemon.number }}
						</h6>
					</b-badge>
				</b-col>
				<b-col class="text-center" cols="4" md="2">
					<b-img fluid :src="pokemon.sprites.front_default" />
				</b-col>
				<b-col class="text-center text-md-left" cols="12" md="4">
					<h2 class="text-center text-md-left">
						{{ pokemon.name }}
					</h2>
					<h5 v-if="Object.keys (species).length > 0" class="text-muted text-center text-md-left">
						{{ species.description }}
					</h5>
					<h6>
					<b-badge class="mr-2" variant="primary">
						{{ pokemon.weight }}
					</b-badge>
					<b-badge variant="primary">
						{{ pokemon.height }}
					</b-badge>
					</h6>
				</b-col>
				<b-col cols="12" md="auto" lg="auto" xl="auto" class="text-center text-md-left">
					<app-pokemon-type-badge :pokemonType="type.type.name" v-for="(type, index) in pokemon.types" :key="index" :class="pokemon.types.length > 1 ? 'mb-2' : null" />
				</b-col>
			</b-row>
		</b-col>
	</b-row>
</template>

<script>
import AppPokemonTypeBadge from './AppPokemonTypeBadge'
export default {
	name: 'AppPokemonBasicDetails',
	components: {
		AppPokemonTypeBadge
	},
	props: {
		pokemon: {
			type: Object, 
			default: () => {
				return {}
			},
		},
		species: {
			type: Object,
			default: () => {
				return {}
			}
		}
	}

}
</script>

<style>

</style>