import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import mainPage from './components/mainPage.vue';
import login from './components/login.vue';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleDown, faAngleUp, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


library.add(faAngleDown, faAngleUp, fab, faMagnifyingGlass)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(VueRouter)

Vue.use(Vuex)

const routes = [
	{ path: '/', component: login },
	{ path: '/main', component: mainPage }
]

const router = new VueRouter({
	mode: "history",
	routes // short for `routes: routes`
  })


new Vue({
	router,
	render: h => h(App),
}).$mount('#app')
