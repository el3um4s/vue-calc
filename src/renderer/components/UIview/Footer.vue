<template>
<v-footer class="pa-3" app>
  <div>versione {{ versionNumber }}</div>
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
    ...mapGetters('menu', {
      versionNumber: 'versionNumber'
    })
  }
}
</script>

<style>
</style>
