<template>
	<b-row class="bg-dark pl-3 pr-3 mb-5">
		<b-col>
			<b-row align-v="center">
				<b-col>
					<b-btn @click="$router.go (-1)" variant="outline-light">
						<font-awesome-icon icon="chevron-left" class="mr-2" />
						Back
					</b-btn>
				</b-col>
				<b-col class="bg-dark p-4 text-center">
					<b-link to="/">
						<b-img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png" />
						<h4 class="text-center text-light d-inline">
							Ask Professor Oak
						</h4>
					</b-link>
				</b-col>
				<b-col class="text-right">
					<b-btn @click="showSearch = !showSearch" variant="outline-light">
						<font-awesome-icon icon="search" class="mr-2" />
						Search
						<font-awesome-icon v-if="showSearch" icon="chevron-up" class="ml-2" />
					</b-btn>
				</b-col>
			</b-row>
			<b-collapse v-model="showSearch">
				<app-search-bar />
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