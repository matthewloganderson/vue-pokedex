<template>
	<b-row>
		<b-col cols="12" md="6" lg="4" class="mb-3" v-for="(stat, index) in stats" :key="index"> 
			<b-card class="h-100 text-center">
				{{ capitalize(stat.stat.name) }}: <span class="font-weight-bold">{{ stat.base_stat }}</span>
			</b-card>
		</b-col>
	</b-row>
</template>

<script>
import _ from 'lodash'
export default {
	name: 'AppPokemonStats',
	props: {
		stats: {
			type: Array,
			default: () => {
				return []
			}
		}
	},
	methods: {
		capitalize (text) {
			return _.capitalize (text)
		}
	}
}
</script>

<style>

</style>