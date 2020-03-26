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


Vue.config.productionTip = false
const axios = Axios.create({
	baseUrl: 'https://pokeapi.co/api/v2/'
})
Vue.prototype.$http = axios
Vue.use(BootstrapVue)
Vue.use (VueRouter)
new Vue({
	render: h => h(App),
}).$mount('#app')
