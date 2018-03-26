import Vue from 'vue'
import axios from 'axios'
import Vuetify from 'vuetify'
import VueHotkey from 'v-hotkey'

import 'vuetify/dist/vuetify.css'
import 'mdi/css/materialdesignicons.min.css'

import App from './App'
import router from './router'
import store from './store'

Vue.use(Vuetify)
Vue.use(VueHotkey)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
