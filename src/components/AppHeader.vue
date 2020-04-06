<template>
	<b-row class="bg-dark pl-3 pr-3 mb-5">
		<b-col>
			<b-row align-v="center">
				<b-col cols="2">
					<b-btn @click="$router.go (-1)" variant="outline-light">
						<font-awesome-icon icon="chevron-left" class="mr-md-2" />
						<span class="d-none d-md-inline">
							Back
						</span>
					</b-btn>
				</b-col>
				<b-col class="bg-dark p-4 text-center">
					<b-link to="/">
						<b-img class="pb-2" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png" />
						<h4 class="text-center text-light d-inline mb-0 pb-0">
							Vue Pokedex
						</h4>
					</b-link>
				</b-col>
				<b-col cols="2" class="text-right">
					<b-btn @click="showSearch = !showSearch" variant="outline-light">
						<font-awesome-icon icon="search" class="mr-md-2" />
						<span class="d-none d-md-inline">
							Search
						</span>
						<font-awesome-icon v-if="showSearch" icon="chevron-up" class="ml-2" />
					</b-btn>
				</b-col>
			</b-row>
			<b-collapse v-model="showSearch">
				<app-search-bar @close_collapse="showSearch = false" />
			</b-collapse>
		</b-col>
	</b-row>
</template>

<script>
import AppSearchBar from './AppSearchBar'
export default {
	name: 'AppHeader',
	components: {
		AppSearchBar
	},
	data () {
		return {
			showSearch: false,
		}
	}
}
</script>

<style>

</style>