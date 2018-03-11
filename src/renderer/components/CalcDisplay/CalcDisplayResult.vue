<template>
  <div>
    <v-flex>{{ getRisultato }}</v-flex>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('calculus', {
      getRisultato: 'getRisultato'
    })
  }
}
</script>

<style scoped>
div {
  height: 18%;
  max-height: 18%;
  padding: 1%;
  text-align: right;
  font-weight: bold;
  font-size: 4vh;
}
</style>
