<template>
	<div id="app">
		<b-container class="ml-0 mr-0 pl-0 pr-0" fluid>
			<b-row no-gutters>
				<b-col>
					<page-header />
				</b-col>
			</b-row>
			<router-view />
			<b-row>
				<b-col>
					<page-footer />
				</b-col>
			</b-row>
		</b-container>
	</div>
</template>

<script>
import PageHeader from './components/PageHeader'

export default {
  name: 'App',
  components: {
    PageHeader
  }
}
</script>

<style>

</style>
