<template>
  <div class="display">
      <v-layout column reverse class="elenco">
        <appOperazione>{{ getInputText }}</appOperazione>
        <appOperazione v-for="item in getListOperation">{{ item }}</appOperazione>
      </v-layout>
  </div>
</template>

<script>
import CalcDisplayOperazione from './CalcDisplayOperazione.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    appOperazione: CalcDisplayOperazione
  },
  computed: {
    ...mapGetters('calculus', {
      getInputText: 'getInputText',
      getListOperation: 'getListOperation'
    })
  }
}
</script>

<style scoped>

.display {
  height: 80%;
  max-height: 80%;
}

.elenco {
  height: 100%;
  max-height: 100%;
  padding: 1%;
}
</style>
