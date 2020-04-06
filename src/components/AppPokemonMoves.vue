<template>
	<b-row>
		<b-col>
			<b-row v-if="relatedToPokemon" align-h="center" align-v="center" class="mb-3">
				<b-col cols="12" md="auto" >
					<h6>
						Filter By:
					</h6>
				</b-col>
				<b-col cols="12" md="4" >
					<b-form-group v-if="moves" label="By Game" label-size="sm">
						<b-form-select v-model="selectedGame">
							<option :value="null">
								All Games
							</option>
							<option v-for="(game, index) in availableGames" :key="index" :value="game">
								{{ formatText(game) }}
							</option>
						</b-form-select>
					</b-form-group>
				</b-col>
				<b-col cols="12" md="4">
					<b-form-group v-if="moves" label-size="sm" label="By Learning Method">
						<b-form-select v-model="selectedLearnMethod">
							<option :value="null">
								All Methods
							</option>
							<option :value="method" v-for="(method, index) in availableLearnMethods" :key="index">
								{{ formatText(method) }}
							</option>
						</b-form-select>
					</b-form-group>
				</b-col>
			</b-row>
			<b-row>
				<b-col>
					<b-list-group class="mb-3" v-if="!isEmpty(moveChunks)">
						<b-list-group-item class="d-none d-md-block">
							<b-row align-h="center">
								<b-col cols="12" md="2" v-for="(heading, index) in ['Move Name', 'Accuracy', 'PP', 'Power', 'Move Type']" :key="index" :class="index + 1 < 5 ? 'border-right text-center' : 'text-center'">
									<h6>
										{{heading}}
									</h6>
								</b-col>
								<b-col class="text-center border-left d-none d-md-inline" v-if="selectedLearnMethod === 'level-up' && selectedGame">
									<h6>
										Level
									</h6>
								</b-col>
							</b-row>
						</b-list-group-item>
						<b-list-group-item v-for="(move, index) in moveChunks[currentMoveChunk]" :key="index"> 
							<service-move v-slot="{ move: moveDetails }" operation="getMove" :moveIdentifier="relatedToPokemon ? move.move.name : move.name">
								<b-row align-h="center">
									<b-col cols="12" md="2" class="border-right text-center">
										<b-link :to="{name: 'MoveDetails', params: {move: relatedToPokemon ? move.move.name : move.name}}">
											<span class="font-weight-bold">
												{{ formatText(relatedToPokemon ? move.move.name : move.name) }}
											</span>
										</b-link>
									</b-col>
									<b-col cols="12" md="2" class="border-right text-center pb-2 pb-md-0">
										<span v-if="moveDetails.accuracy" class="d-inline d-md-none font-weight-bold">
											Accuracy: 
										</span>
										<span v-if="moveDetails.accuracy">
											{{ moveDetails.accuracy }}%
										</span>
									</b-col>
									<b-col cols="12" md="2" class="border-right text-center pb-2 pb-md-0">
										<span v-if="moveDetails.pp" class="d-inline d-md-none font-weight-bold">
											PP: 
										</span>
										<span v-if="moveDetails.pp">
											{{ moveDetails.pp }}
										</span>
									</b-col>
									<b-col cols="12" md="2" class="border-right text-center pb-2 pb-md-0">
										<span v-if="moveDetails.power" class="d-inline d-md-none font-weight-bold">
											Power: 
										</span>
										<span v-if="moveDetails.power">
											{{ moveDetails.power }}
										</span>
									</b-col>
									<b-col cols="12" md="2" class="text-center pb-2 pb-md-0">
										<app-pokemon-type-badge v-if="moveDetails.type" :pokemonType="moveDetails.type.name" />
									</b-col>
									<b-col cols="12" md="2" class="text-center border-left pb-2 pb-md-0" v-if="selectedGame && selectedLearnMethod === 'level-up'">
										<span class="d-inline d-md-none font-weight-bold">
											Level: 
										</span>
										<span>
											{{ levelUpInfo(move.move.name) }}
										</span>
									</b-col>
								</b-row>
							</service-move>
						</b-list-group-item>
					</b-list-group>
				</b-col>
			</b-row>
			<b-row>
				<b-col>
					<b-btn variant="info" class="w-100" :disabled="!canRecede" @click="previousMoveChunk()">
						<font-awesome-icon icon="chevron-left" class="mr-2" />
						Previous
					</b-btn>
				</b-col>
				<b-col>
					<b-btn variant="info" class="w-100" :disabled="!canProceed" @click="nextMoveChunk()">
						Next
						<font-awesome-icon icon="chevron-right" class="ml-2" />
					</b-btn>
				</b-col>
			</b-row>
		</b-col>
	</b-row>
</template>

<script>
import FormatText from '@/mixins/FormatText'
import IsEmpty from '@/mixins/IsEmpty'
import AppPokemonTypeBadge from './AppPokemonTypeBadge'
import _ from 'lodash'
import ServiceMove from './ServiceMove'
export default {
	name: 'AppPokemonMoves',
	components: {
		ServiceMove,
		AppPokemonTypeBadge
	},
	props: {
		moves: {
			type: Array,
			default: () => {
				return []
			}
		},
		relatedToPokemon: {
			type: Boolean,
			default: true
		}
	},
	mixins: [IsEmpty, FormatText],
	data () {
		return {
			currentMoveChunk: 0,
			selectedGame: null,
			selectedLearnMethod: 'level-up'
		}
	},
	computed: {
		canRecede () {
			if (this.currentMoveChunk - 1 >= 0 ) {
				return true
			} else {
				return false
			}
		},
		canProceed () {
			const totalMoveChunks = this.moveChunks.length
			if (this.currentMoveChunk + 1 < totalMoveChunks) {
				return true
			} else {
				return false
			}
		},
		availableLearnMethods () {
			if (!this.isEmpty(this.moves) && this.relatedToPokemon) {
				const learnMethods = []
				this.moves.forEach (
					move => {
						move.version_group_details.forEach (
							versionGroup => {
								if (!learnMethods.find (learnMethod => learnMethod === versionGroup.move_learn_method.name)) {
									learnMethods.push (versionGroup.move_learn_method.name)
								}
							}
						)
					}
				)
				return learnMethods
			} else {
				return []
			}
		},
		availableGames () {
			if (!this.isEmpty(this.moves) && this.relatedToPokemon) {
				const games = []
				this.moves.forEach (
					move => {
						move.version_group_details.forEach (
							versionGroup => {
								if (!games.find (game => game === versionGroup.version_group.name)) {
									games.push (versionGroup.version_group.name)
								}
							}
						)
					}
				)
				return games
			} else {
				return []
			}
		},
		filteredMoves () {
			if (!this.isEmpty (this.moves) && this.relatedToPokemon) {
				if (this.selectedGame && !this.selectedLearnMethod) {
					return this.moves.filter (
						move => move.version_group_details.find (
							versionGroup => versionGroup.version_group.name === this.selectedGame
						)
					)
				} else if (this.selectedLearnMethod && !this.selectedGame) {
					return this.moves.filter (
						move => move.version_group_details.find (
							versionGroup => versionGroup.move_learn_method.name === this.selectedLearnMethod
						)
					)
				} else if (this.selectedGame && this.selectedLearnMethod) {
					return this.moves.filter (
						move => move.version_group_details.find (
							versionGroup => versionGroup.version_group.name === this.selectedGame 
							&& versionGroup.move_learn_method.name === this.selectedLearnMethod
						)
					)
				} else {
					return this.moves
				}
			} else if (!this.isEmpty (this.moves) && !this.relatedToPokemon){
				return this.moves
			} else {
				return []
			}
		},
		moveChunks () {
			if (!this.isEmpty(this.filteredMoves)) {
				return _.chunk (this.filteredMoves, 5)
			} else {
				return []
			}
		}
	},
	methods: {
		nextMoveChunk () {
			if (this.canProceed) {
				this.currentMoveChunk++
			}
		},
		previousMoveChunk () {
			if (this.canRecede) {
				this.currentMoveChunk--
			}
		},
		levelUpInfo (moveName) {
			const move = this.moves.find (move => move.move.name === moveName)
			const game = move.version_group_details.find (versionGroup => versionGroup.version_group.name === this.selectedGame)
			return game.level_learned_at
		}
	}
}
</script>

<style>

</style>