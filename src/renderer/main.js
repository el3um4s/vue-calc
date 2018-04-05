import Vue from 'vue'
import axios from 'axios'
import Vuetify from 'vuetify'
import Inter from 'vue-inter'
// import VueHotkey from 'v-hotkey'

import 'vuetify/dist/vuetify.css'
import 'mdi/css/materialdesignicons.min.css'

import App from './App'
import router from './router'
import store from './store'

Vue.use(Vuetify)
// Vue.use(VueHotkey)
Vue.use(require('vue-shortkey'))
Vue.use(Inter)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

const inter = new Inter({
  locale: 'Italiano',
  messages: {
    English: {
      toolbar: {
        standard: 'Standard',
        impostazioni: 'Settings',
        informazioni: 'Info'
      },
      impostazioni: {
        formato: 'Formato',
        posizioniDecimali: 'Decimal Places',
        tema: 'Theme',
        lingua: 'Language'
      }
    }
  }
})

/* eslint-disable no-new */
new Vue({
  inter,
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
