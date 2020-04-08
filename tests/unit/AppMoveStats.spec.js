import {shallowMount, createLocalVue} from '@vue/test-utils'
import AppMoveStats from '@/components/AppMoveStats'
import { BootstrapVue} from 'bootstrap-vue'
import FormatText from '@/mixins/FormatText'

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
			name: 'none',
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

	test ('If accuracy is not set, do not render accuracy section', () => {
		expect (wrapper.find ('[data-testid="accuracy"]').exists()).toBe(false)
	})
	
	test ('If accuracy has a value, render that value in accuracy section', async () => {
		moveData.accuracy = 100
		await wrapper.vm.$nextTick()
		expect (wrapper.find ('[data-testid="accuracy"]').text()).toContain ('100%')
	})

	test ('If move.pp is falsy, do not render pp section', () => {
		expect (wrapper.find ('[data-testid="pp"]').exists()).toBe(false)
	})

	test ('If move.pp contains a value, render that value in the pp section', async () => {
		moveData.pp = 35
		await wrapper.vm.$nextTick()
		expect (wrapper.find ('[data-testid="pp"]').text()).toContain (35)
	})

	test ('If move.meta.ailment.name is "none" do not render ailments section header', () => {
		expect (wrapper.find ('[data-testid="ailments-header"]').exists()).toBe(false)
	})

	test ('If move.meta.ailment.name is not "none", render ailments section header', async () => {
		moveData.meta.ailment.name = 'confusion'
		await wrapper.vm.$nextTick()
		expect (wrapper.find('[data-testid="ailments-header"]').exists()).toBe(true)
	})

	test ('If move.meta.ailment.name is not "none", render the name in the ailment-name section', () => {
		expect (wrapper.find ('[data-testid="ailments-name"]').text()).toContain (FormatText.methods.formatText(moveData.meta.ailment.name))
	})
})