<template>
  <div>
    <v-divider></v-divider>
    <v-flex>{{ getRisultato }}</v-flex>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('calculus', {
      getRisultato: 'getRisultatoDec'
    })
  }
}
</script>

<style scoped>
div {
  font-family: 'Mina', sans-serif;
  height: 6%;
  max-height: 6%;
  padding: 1px;
  text-align: right;
  font-weight: bold;
  font-size: 4vh;
}
</style>
