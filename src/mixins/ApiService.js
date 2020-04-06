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
		if (this.operation) {
			this.performOperation()
		}
	},
	watch: {
		operation: function() {
			this.performOperation()
		}
	},
	methods: {
		handleError(
			error,
			notifyUser = true,
			type = 'modal',
			feedback = 'Sorry, Professor Oak is not familiar with that. Also, are you a boy or a girl?',
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
		},
		async callTheProfessor (
			endpoint,
			dataDestination, 
			type = 'get',

		) {
			try {
				const response = await this.askProfessor (
					type,
					endpoint
				)
				this.setLocalValue (dataDestination, response)
				this.$emit ('success', response)
			} catch (error) {
				this.$emit ('error', error)
				this.handleError()
			}
		},
	}
}
