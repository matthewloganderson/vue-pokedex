<template>
	<b-row>
		<b-col>
			<b-row align-v="center">
				<b-col cols="12" md="6" lg="5">
					<b-form-group label="Select Description" label-size="sm">
						<b-form-select v-model="selectedDescription">
							<option v-for="(description, index) in descriptions" :key="index" :value="index">
								{{ formatText(relatedToPokemon ? description.version.name : description.version_group.name) }}
							</option>
						</b-form-select>
					</b-form-group>
				</b-col>
				<b-col>
					<p>
						{{ descriptions[selectedDescription].flavor_text }}
					</p>
				</b-col>
			</b-row>
		</b-col>
	</b-row>
</template>

<script>
import FormatText from '@/mixins/FormatText'
export default {
	name: 'AppPokemonDescriptionPicker',
	props: {
		relatedToPokemon: {
			type: Boolean,
			default: true,
		},
		descriptions: {
			type: Array,
			default: () => {
				return []
			}
		},
	},
	mixins: [FormatText],
	data () {
		return {
			selectedDescription: 0
		}
	},
	watch: {
		descriptions: {
			handler: 'resetSelection'
		}
	},
	methods: {
		resetSelection () {
			this.selectedDescription = 0
		}
	}
}
</script>

<style>

</style>