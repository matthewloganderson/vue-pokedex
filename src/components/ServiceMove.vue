<script>
import { MoveEndpoints } from '@/constants/Endpoints'
import ApiService from '@/mixins/ApiService'
export default {
	name: 'ServiceMove',
	mixins: [ApiService],
	props: {
		moveIdentifier: {
			type: [String, Number],
			default: null
		},
	},
	data() {
		return {
			moveEndpoints: MoveEndpoints,
			move: {},
			moves: []
		}
	},
	watch: {
		moveIdentifier: {
			handler: 'getMove'
		},
	},
	methods: {
		async getMove () {
			if (this.moveIdentifier) {
				try {
					const response = await this.askProfessor(
						'get',
						this.moveEndpoints.getMove(this.moveIdentifier)
					)
					this.setLocalValue('move', response)
					this.$emit ('success', response)
				} catch (error) {
					this.$emit ('error', error)
					this.handleFeedback()
				}
			} else {
				this.handleError('Professor Oak does not know about this pokemon yet!')
			}
		},
		async getAllMoves () {
			try {
				const response = await this.askProfessor (
					'get',
					this.moveEndpoints.getAllMoves
				)
				this.setLocalValue ('moves', response)
				this.$emit ('success', resonse)
			} catch (error) {
				this.$emit ('error', error)
				this.handleError()
			}
		}
	},
	render() {
		return this.$scopedSlots.default(this)
	}
}
</script>
