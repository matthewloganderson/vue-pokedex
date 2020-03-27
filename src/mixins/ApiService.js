import _ from 'lodash'
export default {
	props: {
		operation: {
			type: String,
			default: null
		}
	},
	data() {
		return {
			response: null,
			loading: false
		}
	},
	mounted() {
		if (!this.requiresUserInput()) {
			this.performOperation()
		}
	},
	watch: {
		operation: function() {
			if (!this.requiresUserInput()) {
				this.performOperation()
			}
		}
	},
	methods: {
		requiresUserInput() {
			if (!_.startsWith(this.operation, 'get')) {
				return true
			} else {
				return false
			}
		},
		handleError(
			error,
			notifyUser = true,
			type = 'modal',
			feedback = 'There was a problem loading the details you requested, please try again. If the problem persists, please contact customer support.',
			parameters = {
				title: 'Something went wrong',
				centered: true,
				headerClass: 'border-danger',
				footerClass: 'border-danger'
			}
		) {
			//eslint-disable-next-line
			console.error(error)
			if (notifyUser) {
				this.provideFeedback(type, feedback, parameters)
			}
		},
		provideFeedback(type, feedback, parameters) {
			switch (type) {
				case 'modal':
					this.$bvModal.msgBoxOk(feedback, parameters)
					break
				case 'toast':
					this.$bvToast.toast(feedback, parameters)
					break
			}
		},
		setLocalValue(destination, data) {
			this[destination] = data
		},
		performOperation() {
			this[this.operation]()
		},
		async askProfessor(type, ...parameters) {
			if (!this.loading) {
				this.loading = true
				try {
					const response = await this.$http[type](...parameters)
					this.loading = false
					return response.data
				} catch (error) {
					this.handleError(error.message, true, 'toast')
					this.loading = false
				}
			}
		}
	}
}
