<template>
	<b-row>
		<b-col>
			<b-form-group>
				<b-input-group>
					<b-input-group-prepend>
						<b-form-select class="bg-light" v-model="searchType" :options="searchOptions"></b-form-select>
					</b-input-group-prepend>
					<b-input :placeholder="`Enter ${searchType} name`" v-model="searchTerm"></b-input>
					<b-input-group-append>
						<b-btn variant="info">
							<font-awesome-icon icon="search" class="mr-2" />
							Search
						</b-btn>
					</b-input-group-append>
				</b-input-group>
			</b-form-group>
		</b-col>
	</b-row>
</template>

<script>
import SearchTypes from '@/constants/SearchTypes'
export default {
	name: 'AppSearchBar',
	data () {
		return {
			searchOptions: SearchTypes,
			searchType: 'pokemon',
			searchTerm: null
		}
	},
	computed: {}
}
</script>

<style>

</style>