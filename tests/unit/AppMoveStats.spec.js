import {shallowMount, createLocalVue} from '@vue/test-utils'
import AppMoveStats from '@/components/AppMoveStats'
import { BootstrapVue} from 'bootstrap-vue'
import ServiceMove from '@/components/ServiceMove'

const localVue = createLocalVue()

localVue.use (BootstrapVue)

const wrapper = shallowMount (AppMoveStats, {localVue})

const moveData = {
	name: 'slam',
	power: null,
	accuracy: null,
	pp: null,
	damage_class: {
		name: null
	},
	meta: {
		ailment: {
			name: null,
		},
		ailment_chance: null,
		category: {
			url: 'https://pokeapi.co/api/v2/move-category/0/'
		}
	}
}

describe ('AppMoveStats', () => {
	test ('If move is empty object, do not render component', async () => {
		wrapper.setProps ({move: {}})
		await wrapper.vm.$nextTick()
		expect (wrapper.isEmpty()).toBe(true)
	})

	test ('If move is not empty object, render component', async () => {
		wrapper.setProps ({
			move: moveData
		})
		await wrapper.vm.$nextTick()
		expect (wrapper.isEmpty()).toBe(false)
	})

	test ('If move.power falsy, do not render the move power section', () => {
		expect (wrapper.find('[data-testid="power"]').exists()).toBe(false)
	})
	
	test ('If move.power contains value, render value', async () => {
		moveData.power = 100
		await wrapper.vm.$nextTick()
		expect (wrapper.find ('[data-testid="power"]').text()).toContain(100)
	})
})