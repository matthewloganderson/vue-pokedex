<template>
	<div id="app">
		<b-container class="ml-0 mr-0 pl-0 pr-0" fluid>
			<b-row no-gutters>
				<b-col>
					<app-header />
				</b-col>
			</b-row>
			<b-row class="ml-3 mr-3">
				<b-col>
					<router-view></router-view>
				</b-col>
			</b-row>
		</b-container>
	</div>
</template>

<script>
import AppHeader from './components/AppHeader'

export default {
  name: 'App',
  components: {
    AppHeader,
  }
}
</script>

<style>

</style>
