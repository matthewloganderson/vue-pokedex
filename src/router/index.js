import Vue from 'vue'
import Router from 'vue-router'
import PageHome from '@/components/PageHome'
import PagePokemonDetails from '@/components/PagePokemonDetails'
import PageTypeDetails from '@/components/PageTypeDetails'

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
		}
	]
})
