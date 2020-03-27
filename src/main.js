//eslint-ignore-all
import Vue from 'vue'
import {
	BootstrapVue,
} from 'bootstrap-vue'
import App from './App.vue'
import Axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueRouter from 'vue-router'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add (fas)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
const axios = Axios.create({
	baseURL: 'https://pokeapi.co/api/v2/'
})
Vue.prototype.$http = axios
Vue.use(BootstrapVue)
Vue.use (VueRouter)
new Vue({
	render: h => h(App),
	router
}).$mount('#app')
