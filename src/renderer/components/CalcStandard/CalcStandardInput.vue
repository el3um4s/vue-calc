<!-- <template>
  <v-layout column class="griglia">
    <v-flex d-flex v-for="i in 6">
      <v-flex v-for="j in Math.floor(Math.random() * (6 - 1) + 1)">
        <v-flex class="pulsante">
          <v-flex align-center  class="pulsante2"><div>
            (flex {{i}}) (c: {{j}})
          </div></v-flex>
        </v-flex>
      </v-flex>
    </v-flex>
  </v-layout>
</template> -->

<template>
  <v-layout column class="griglia">
    <v-flex d-flex v-for="(righe, i) in buttons" :key="`riga0${i}`">
      <v-flex xs3 v-for="riga in righe" :key="`btn-${riga.key}`">
        <v-flex class="inputButton text-xs-center" d-flex fill-height align-center >
          <v-flex class="display-1">
            {{ riga.label }}
          </v-flex>
        </v-flex>
      </v-flex>
    </v-flex>
  </v-layout>
</template>

<script>
import {
  mapGetters
} from 'vuex'

export default {
  computed: {
    ...mapGetters('calcInput', {
      buttons: 'listButtonsStandard'
    })
  }
}
</script>

<style scoped>
.griglia {
  max-width: 100%;
  /* height: 70%; */
  max-height: 70%;
}
.inputButton {
  /* height: 100%; */
  border-style: solid;
  border-color: black;
  border-width: thin;
}
</style>
