<template>
  <div>
    <v-layout column>
      <h3>Vue-Calv</h3>
      <div>versione {{ versionNumber }}</div>
      <div>&copy; {{ new Date().getFullYear() }} - Strani Anelli</div>
    </v-layout>
    <v-layout column>
      <div>github: </div>
      <div>homepage: </div>
    </v-layout>
    <v-layout column>
      <div>Created by StraniAnelli.com with:</div>
      <ul>
        <li>VueJS</li>
        <li>Vuetify</li>
        <li>Electron-vue (https://github.com/vuetifyjs/electron)</li>
        <li>decimal.js</li>
        <li>font Roboto</li>
        <li>font mina</li>
      </ul>
    </v-layout>
  </div>
</template>

<script>
import {
  mapGetters
} from 'vuex'

export default {
  computed: {
    ...mapGetters('menu', {
      versionNumber: 'versionNumber'
    })
  }
}
</script>

<style scoped>
</style>
