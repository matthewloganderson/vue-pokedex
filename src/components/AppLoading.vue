<template functional>
	<b-row>
		<b-col>
			<b-alert variant="secondary" show>
				<h6 class="text-center">
					<b-spinner type="grow" />
					Please wait while Professor Oak retrieves your data.
				</h6>
			</b-alert>
		</b-col>
	</b-row>
</template>

<script>
export default {
	name: 'AppLoading'
}
</script>

<style>

</style>