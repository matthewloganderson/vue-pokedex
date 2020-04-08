<template>
	<b-row class="mt-2" v-if="!isEmpty (move)">
		<b-col data-testid="power" class="mb-3" cols="12" md="4" xl="3" v-if="move.power">
			<b-card class="text-center h-100">
				<h6>
					Power
				</h6>
				<span>
					{{ move.power }}
				</span>
			</b-card>
		</b-col>
		<b-col data-testid="pp" class="mb-3" cols="12" md="4" xl="3" v-if="move.pp">
			<b-card class="text-center h-100">
				<h6>
					PP
				</h6>
				<span>
					{{ move.pp }}
				</span>
			</b-card>
		</b-col>
		<b-col data-testid="accuracy" class="mb-3" cols="12" md="4" xl="3" v-if="move.accuracy">
			<b-card class="text-center h-100">
				<h6>
					Accuracy
				</h6>
				<span>
					{{ move.accuracy }}%
				</span>
			</b-card>
		</b-col>
		<b-col data-testid="damage_type" class="mb-3" cols="12" md="4" xl="3" v-if="move.damage_class.name">
			<b-card class="text-center h-100">
				<h6>
					Damage Type
				</h6>
				<span>
					{{ formatText(move.damage_class.name) }}
				</span>
			</b-card>
		</b-col>
		<service-move v-if="move && !isEmpty(move)" operation="getMoveCategory" :moveCategoryUrl="move.meta.category.url" v-slot="{ moveCategory }" >
			<b-col class="mb-3" cols="12" md="4" xl="3">
				<b-card class="text-center h-100">
					<h6>
						Move Category
					</h6>
					<span v-if="moveCategory && !isEmpty (moveCategory)">
						{{ findEnglishDescription(moveCategory.descriptions) }}
					</span>
				</b-card>
			</b-col>
		</service-move>
		<b-col data-testid="ailments" class="mb-3" cols="12" md="4" xl="3">
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
import FormatText from '@/mixins/FormatText'
import IsEmpty from '@/mixins/IsEmpty'
import ServiceMove from './ServiceMove'
export default {
	name: 'AppMoveStats',
	components: {
		ServiceMove
	},
	mixins: [
		IsEmpty, FormatText
	],
	props: {
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
		}
	}
}
</script>

<style>

</style>