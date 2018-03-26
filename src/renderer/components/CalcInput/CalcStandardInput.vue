<template>
  <v-layout column class="griglia" v-hotkey="keymap">
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
      buttons: 'listButtons'
    }),
    keymap () {
      // 0  [BTN_OP_CE, BTN_OP_DEL, BTN_OP_PERC, BTN_DIVIDE],
      // 1  [BTN_7, BTN_8, BTN_9, BTN_MOLT],
      // 2  [BTN_4, BTN_5, BTN_6, BTN_MINUS],
      // 3  [BTN_1, BTN_2, BTN_3, BTN_PLUS],
      // 4  [BTN_SIGN, BTN_0, BTN_POINT, BTN_RESULT]
      return {
        '0': () => { this.addInput(this.buttons[4][1]) },
        '1': () => { this.addInput(this.buttons[3][0]) },
        '2': () => { this.addInput(this.buttons[3][1]) },
        '3': () => { this.addInput(this.buttons[3][2]) },
        '4': () => { this.addInput(this.buttons[2][0]) },
        '5': () => { this.addInput(this.buttons[2][1]) },
        '6': () => { this.addInput(this.buttons[2][2]) },
        '7': () => { this.addInput(this.buttons[1][0]) },
        '8': () => { this.addInput(this.buttons[1][2]) },
        '9': () => { this.addInput(this.buttons[2][2]) },
        '.': () => { this.addInput(this.buttons[4][2]) },
        'enter': () => { this.addInput(this.buttons[4][3]) },
        '+': () => { this.addInput(this.buttons[3][3]) },
        '-': () => { this.addInput(this.buttons[2][3]) },
        '*': () => { this.addInput(this.buttons[1][3]) },
        '/': () => { this.addInput(this.buttons[0][3]) },

        'numpad 0': () => { this.addInput(this.buttons[4][1]) },
        'numpad 1': () => { this.addInput(this.buttons[3][0]) },
        'numpad 2': () => { this.addInput(this.buttons[3][1]) },
        'numpad 3': () => { this.addInput(this.buttons[3][2]) },
        'numpad 4': () => { this.addInput(this.buttons[2][0]) },
        'numpad 5': () => { this.addInput(this.buttons[2][1]) },
        'numpad 6': () => { this.addInput(this.buttons[2][2]) },
        'numpad 7': () => { this.addInput(this.buttons[1][0]) },
        'numpad 8': () => { this.addInput(this.buttons[1][2]) },
        'numpad 9': () => { this.addInput(this.buttons[2][2]) },
        'numpad .': () => { this.addInput(this.buttons[4][2]) },
        'numpad enter': () => { this.addInput(this.buttons[4][3]) },
        'numpad +': () => { this.addInput(this.buttons[3][3]) },
        'numpad -': () => { this.addInput(this.buttons[2][3]) },
        'numpad *': () => { this.addInput(this.buttons[1][3]) },
        'numpad /': () => { this.addInput(this.buttons[0][3]) }
      }
    }
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
