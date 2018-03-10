<template>
  <v-app>
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
// import NavigationDrawer from './components/UIview/NavigationDrawer.vue'
// import Toolbar from './components/UIview/Toolbar.vue'
import ToolbarENavigation from './components/UIview/ToolbarENavigation.vue'
import Footer from './components/UIview/Footer.vue'

export default {
  name: 'vue-calc',
  components: {
    appToolbarENavigation: ToolbarENavigation,
    appFooter: Footer
  }
}
</script>

<style>
/* @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'); */
/* @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700'); */
@import url('~@/assets/fonts/font-roboto/fontRoboto.css');
@import url('~@/assets/fonts/icons-material-icons/materialIcons.css');
@import url('~@/assets/fonts/font-mina/fontMina.css');
/* Global CSS */
html {
  overflow-y: hidden;
}
</style>
