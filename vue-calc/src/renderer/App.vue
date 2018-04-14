<template>
  <v-app :dark="getDarkTheme">
    <appToolbarENavigation></appToolbarENavigation>
    <v-content fill-height>
        <v-fade-transition mode="out-in">
            <router-view></router-view>
          </v-fade-transition>
    </v-content>
    <!-- <appFooter></appFooter> -->
  </v-app>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

import ToolbarENavigation from './components/UIview/ToolbarENavigation.vue'
import Footer from './components/UIview/Footer.vue'

const Impostazioni = require('electron-store')
const impostazioni = new Impostazioni()

export default {
  name: 'vue-calc',
  components: {
    appToolbarENavigation: ToolbarENavigation,
    appFooter: Footer
  },
  computed: {
    ...mapGetters('impostazioni', {
      getDarkTheme: 'darkTheme',
      getLinguaApp: 'linguaApp'
    })
  },
  methods: {
    ...mapMutations('calculus', {
      cambiaFormatoNumero: 'cambiaFormatoNumero',
      cambiaNumeroDecimali: 'cambiaNumeroDecimali'
    }),
    ...mapMutations('impostazioni', {
      cambiaTema: 'cambiaTema',
      cambiaLingua: 'cambiaLingua',
      cambiaLinguaSistema: 'cambiaLinguaSistema'
    })
  },
  mounted () {
    this.cambiaFormatoNumero(impostazioni.get('settings.formatNumber'))
    this.cambiaNumeroDecimali(impostazioni.get('settings.decimalPlaces'))
    this.cambiaTema(impostazioni.get('settings.temaDark'))
    this.cambiaLingua(impostazioni.get('settings.linguaApp'))
    this.cambiaLinguaSistema(impostazioni.get('sistema.lang'))
    this.$inter.setCurrentLocale(impostazioni.get('settings.linguaApp'))
  }
}
</script>

<style>
@import url('~@/assets/fonts/font-roboto/fontRoboto.css');
@import url('~@/assets/fonts/icons-material-icons/materialIcons.css');
@import url('~@/assets/fonts/font-mina/fontMina.css');
/* Global CSS */
html {
  overflow-y: hidden;
}
</style>
