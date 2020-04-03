import Vue from 'vue'
import Router from 'vue-router'
import PageHome from '@/components/PageHome'
import PagePokemonDetails from '@/components/PagePokemonDetails'
import PageTypeDetails from '@/components/PageTypeDetails'
import PageMoveDetails from '@/components/PageMoveDetails'
import PageAbilityDetails from '@/components/PageAbilityDetails'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'PageHome',
			component: PageHome,
		},
		{
			path: '/pokemon/details/:identifier',
			name: 'PokemonDetails',
			component: PagePokemonDetails,
			props: true
		},
		{
			path: '/type/details/:type',
			name: 'TypeDetails',
			component: PageTypeDetails,
			props: true
		},
		{
			path: '/move/details/:move',
			name: 'MoveDetails',
			component: PageMoveDetails,
			props: true,
		},
		{
			path: '/ability/details/:ability',
			name: 'AbilityDetails',
			component: PageAbilityDetails,
			props: true
		}
	]
})
