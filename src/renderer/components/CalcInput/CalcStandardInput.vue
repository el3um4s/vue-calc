<template>
  <v-layout column class="griglia">
    <v-flex d-flex v-for="(righe, i) in buttons" :key="`riga0${i}`">
      <v-flex xs3 v-for="riga in righe" :key="`btn-${riga.key}`">
        <v-flex d-flex fill-height>
            <v-btn class="buttonFull" @click.stop="addInput(riga)">
            <!-- <v-btn class="buttonFull" @click.stop="addInput({ value: riga.value, symbol: riga.symbol, type: riga.type })"> -->
                <v-icon v-if="riga.icon">{{ riga.icon }}</v-icon>
                <div v-else>{{ riga.label }}</div>
            </v-btn>
        </v-flex>
      </v-flex>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapGetters('calcInput', {
      buttons: 'listButtonsStandard'
    })
  },
  methods: {
    ...mapMutations('calculus', {
      addInput: 'addInput'
    })
  }
}
</script>

<style scoped>
.griglia {
  max-width: 100%;
  max-height: 60%;
}

.buttonFull {
  margin: 0px;
  width: 100%;
  height: 100%;
  font-family: 'Mina', sans-serif;
  font-size: 4vh;
}

</style>
