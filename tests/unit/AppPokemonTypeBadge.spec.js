import { shallowMount, createLocalVue } from '@vue/test-utils'
import AppPokemonTypeBadge from '@/components/AppPokemonTypeBadge'
import { BootstrapVue} from 'bootstrap-vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


const localVue = createLocalVue()

localVue.use (BootstrapVue)
localVue.component('font-awesome-icon', FontAwesomeIcon)

describe ('AppPokemonTypeBadge', () => {
	test ('Component does not render if the pokemonType prop is undefined.', () => {
		const wrapper = shallowMount (AppPokemonTypeBadge, {localVue,
			propsData: {
				pokemonType: null
			}
		})
		expect(wrapper.isEmpty()).toBe(true)
	})

	test ('Component renders proper text for a given prop', () => {
		const wrapper = shallowMount (AppPokemonTypeBadge, {localVue,
			propsData: {
				pokemonType: 'dragon'
			}
		})
		expect(wrapper.text()).toContain('Dragon')
	})
})