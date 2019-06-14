import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false

import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)

import { CollapsePlugin } from 'bootstrap-vue'
Vue.use(CollapsePlugin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
