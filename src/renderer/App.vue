<template>
  <v-app :dark="darkTheme">
    <appToolbarENavigation></appToolbarENavigation>
    <v-content fill-height>
        <v-fade-transition mode="out-in">
            <router-view></router-view>
          </v-fade-transition>
    </v-content>
    <appFooter></appFooter>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'

import ToolbarENavigation from './components/UIview/ToolbarENavigation.vue'
import Footer from './components/UIview/Footer.vue'

export default {
  name: 'vue-calc',
  components: {
    appToolbarENavigation: ToolbarENavigation,
    appFooter: Footer
  },
  computed: {
    ...mapGetters('menu', {
      darkTheme: 'darkTheme'
    })
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
