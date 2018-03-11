<template>
  <div class="display">
    <app-input-text></app-input-text>
    <v-divider></v-divider>
    <app-result></app-result>
  </div>
</template>

<script>
import CalcDisplayInputText from './CalcDisplayInputText.vue'
import CalcDisplayResult from './CalcDisplayResult.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    appInputText: CalcDisplayInputText,
    appResult: CalcDisplayResult
  },
  computed: {
    ...mapGetters('calculus', {
      getRisultato: 'getRisultato',
      getInputText: 'getInputText'
    })
  }
}
</script>

<style scoped>

.display {
  font-family: 'Mina', sans-serif;
  height: 40%;
  max-height: 40%;
}

</style>
