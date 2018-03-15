<template>
  <div class="display">
      <v-layout column reverse class="elenco">
        <appOperazione>{{ getInputText }}</appOperazione>
        <appOperazione v-for="(item, index) in getListOperation" :key="index">{{ item }}</appOperazione>
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
      getInputText: 'getInputTextDec',
      getListOperation: 'getListOperationDec'
    })
  }
}
</script>

<style scoped>

.display {
  font-family: 'Mina', sans-serif;
  height: 34%;
  max-height: 34%;
}

.elenco {
  height: 100%;
  max-height: 100%;
  padding: 1%;
}
</style>
