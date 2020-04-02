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
		moveCategoryUrl: {
			type: String,
			default: null,
		},
		moveTargetUrl: {
			type: String,
			default: null,
		}
	},
	data() {
		return {
			moveEndpoints: MoveEndpoints,
			move: {},
			moves: [],
			moveCategory: {},
			moveTarget: {}
		}
	},
	watch: {
		moveIdentifier: {
			handler: 'getMove'
		},
		moveCategoryUrl: {
			handler: 'getMoveCategory'
		},
		moveTargetUrl: {
			handler: 'getMoveTarget'
		}
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
		},
		async getMoveCategory () {
			if (this.moveCategoryUrl) {
				this.callTheProfessor (
					this.moveEndpoints.getMoveCategory (this.moveCategoryUrl), 
					'moveCategory'
				)
			}
		},
		async getMoveTarget () {
			if (this.moveTargetUrl) {
				this.callTheProfessor (
					this.moveEndpoints.getMoveTarget (this.moveTargetUrl),
					'moveTarget'
				)
			}
		}
	},
	render() {
		return this.$scopedSlots.default(this)
	}
}
</script>
