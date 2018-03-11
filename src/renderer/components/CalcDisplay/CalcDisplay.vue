<template>
  <div class="display">
    <v-text-field
      rows="4"
      readonly
      no-resize
      multi-line
      textarea
      flat
      full-width
      :value="getInputText"
      class="valoriInseriti"
      ></v-text-field>
    <!-- {{ getInputText }} -->
    <div class="risultatoInGrande">{{ getRisultato }}</div>
    <!-- <div class="risultatoInGrande">9.999.999.999.999.999</div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
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
  position: relative;
  max-height: 30%;
  font-family: 'Mina', sans-serif;
}

.risultatoInGrande {
  max-height: 28%;
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 1%;
  text-align: right;
  font-weight: bold;
  font-size: 4vh;
}

.valoriInseriti {
  max-height: 72%;
}


div {
  /* width: 100%; */
  /* max-height: 30%; */
  /* background-color: green; */
}
</style>
