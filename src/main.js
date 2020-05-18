import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'normalize.css/normalize.css'

Vue.use(Vuex)
Vue.use(ElementUI, {
  size: 'mini'
})

Vue.config.productionTip = false

// const store = new Vuex.Store({
// 	state: {
// 		token: ''
// 	}
// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
