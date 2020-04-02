<template>
	<b-row>
		<b-col>
			<b-row>
				<b-col class="mb-3 mb-md-0" cols="12" md="4" xl="3">
					<service-move v-slot="{moveTarget}" :moveTargetUrl="move.target.url" operation="getMoveTarget">
						<b-card class="h-100">
							<h6>
								Move Target
							</h6>
							<span v-if="moveTarget && Object.keys (moveTarget).length > 0">
								{{ findEnglishDescription(moveTarget.descriptions) }}
							</span>
						</b-card>
					</service-move>
				</b-col>
				<b-col>
					<b-card class="h-100">
						<h6>
							{{moveName}}'s Effects
						</h6>
						<b-row v-for="(effect, index) in move.effect_entries" :key="index">
							<b-col>
								<p>
									{{ formatEffectEntry(effect.short_effect) }}
								</p>
								<b-link @click="toggleCollapse (`move_effect_collapse__${index}`)">
									More
									<font-awesome-icon class="ml-2" icon="chevron-down" />
								</b-link>
								<b-collapse :id="`move_effect_collapse__${index}`">
									<b-row class="mt-3">
										<b-col>
											<p>
												{{ formatEffectEntry(effect.effect) }}					
											</p>
										</b-col>
									</b-row>
								</b-collapse>
							</b-col>
						</b-row>
					</b-card>
				</b-col>
			</b-row>
		</b-col>
	</b-row>
</template>

<script>
import _ from 'lodash'
import ServiceMove from './ServiceMove'
export default {
	name: 'AppMoveEffects',
	components: {
		ServiceMove
	},
	props: {
		moveName: {
			type: String,
			default: null,
		},
		move: {
			type: Object,
			default: () => {
				return {}
			}
		}
	},
	methods: {
		findEnglishDescription (descriptions) {
			return descriptions.find (description => description.language.name === 'en').description
		},
		formatEffectEntry (effect) {
			return _.replace(effect, '$effect_chance', this.move.effect_chance)
		},
		toggleCollapse (collapseId) {
			this.$root.$emit('bv::toggle::collapse', collapseId)
		}
	}
}
</script>

<style>

</style>