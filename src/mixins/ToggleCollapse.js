export default {
	methods: {
		toggleCollapse (collapseId) {
			this.$root.$emit('bv::toggle::collapse', collapseId)
		}
	}
}