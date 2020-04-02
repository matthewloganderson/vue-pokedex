<template>
	<b-row class="mt-2">
		<b-col class="mb-3" cols="12" md="4" xl="3" v-if="move.power">
			<b-card class="text-center h-100">
				<h6>
					Power
				</h6>
				<span>
					{{ move.power }}
				</span>
			</b-card>
		</b-col>
		<b-col class="mb-3" cols="12" md="4" xl="3" v-if="move.pp">
			<b-card class="text-center h-100">
				<h6>
					PP
				</h6>
				<span>
					{{ move.pp }}
				</span>
			</b-card>
		</b-col>
		<b-col class="mb-3" cols="12" md="4" xl="3" v-if="move.accuracy">
			<b-card class="text-center h-100">
				<h6>
					Accuracy
				</h6>
				<span>
					{{ move.accuracy }}%
				</span>
			</b-card>
		</b-col>
		<b-col class="mb-3" cols="12" md="4" xl="3" v-if="move.accuracy">
			<b-card class="text-center h-100">
				<h6>
					Damage Type
				</h6>
				<span>
					{{ formatText(move.damage_class.name) }}
				</span>
			</b-card>
		</b-col>
		<service-move v-if="move && Object.keys (move).length > 0" operation="getMoveCategory" :moveCategoryUrl="move.meta.category.url" v-slot="{ moveCategory }" >
			<b-col class="mb-3" cols="12" md="4" xl="3">
				<b-card class="text-center h-100">
					<h6>
						Move Category
					</h6>
					<span v-if="moveCategory && Object.keys (moveCategory).length > 0">
						{{ findEnglishDescription(moveCategory.descriptions) }}
					</span>
				</b-card>
			</b-col>
		</service-move>
		<b-col class="mb-3" cols="12" md="4" xl="3">
			<b-card class="text-center h-100">
				<h6>
					Inflicted Ailments
				</h6>
				<span v-if="move.meta.ailment.name != 'none'">
					{{ move.meta.ailment_chance }}% chance of inflicting
				</span>
				<span>
					{{ formatText(move.meta.ailment.name) }}
				</span>
			</b-card>
		</b-col>
	</b-row>
</template>

<script>
import _ from 'lodash'
import ServiceMove from './ServiceMove'
export default {
	name: 'AppMoveStats',
	components: {
		ServiceMove
	},
	props: {
		move: {
			type: Object, 
			default: () => {
				return {}
			}
		}
	},
	methods: {
		formatText (text) {
			return _.capitalize (_.replace (text, '-', ' '))
		},
		findEnglishDescription (descriptions) {
			return descriptions.find (description => description.language.name === 'en').description
		}
	}
}
</script>

<style>

</style>