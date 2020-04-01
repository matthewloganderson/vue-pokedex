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
				this.callTheProfessor (
					this.moveEndpoints.getMove(this.moveIdentifier),
					'move'
				)
			} else {
				this.handleError('Professor Oak does not know about this pokemon yet!')
			}
		},
		async getAllMoves () {
			this.callTheProfessor (
				this.moveEndpoints.getAllMoves,
				'moves'
			)
		}
	},
	render() {
		return this.$scopedSlots.default(this)
	}
}
</script>
