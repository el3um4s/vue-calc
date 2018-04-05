<template>
<v-footer class="pa-3" app>
  <div>v.{{ versionNumber }}</div>
  <v-spacer></v-spacer>
  <div>&copy; {{ new Date().getFullYear() }}</div>
</v-footer>
</template>

<script>
import {
  mapGetters
} from 'vuex'

export default {
  computed: {
    ...mapGetters('impostazioni', {
      versionNumber: 'versionNumber'
    })
  }
}
</script>

<style>
</style>
