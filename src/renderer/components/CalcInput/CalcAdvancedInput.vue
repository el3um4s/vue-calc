<template>
  <v-layout column class="griglia">
    <v-flex d-flex v-for="(righe, i) in buttons" :key="`riga0${i}`">
      <v-flex xs2 v-for="riga in righe" :key="`btn-${riga.key}`">
        <v-flex d-flex fill-height>
            <v-btn class="buttonFull">
                {{ riga.label }}
            </v-btn>
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
      buttons: 'listButtonsAdvanced'
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
  border-style: solid;
  border-color: black;
  border-width: thin;
}

.buttonContainer {
  position: relative;
}

.buttonFull {
  margin: 0px;
  width: 100%;
  height: 100%;
  /* font-weight: bold; */
}

/* .full {
  font-size: 15vh;
} */

</style>
