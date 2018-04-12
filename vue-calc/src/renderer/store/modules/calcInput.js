const NUMBER = 'NUMBER'
const OPERAZIONEBASE = 'OPERAZIONEBASE'
const PUNTODECIMALE = 'PUNTODECIMALE'
const TOGGLESEGNO = 'TOGGLESEGNO'
const CLEAR = 'CLEAR'
const EQUAL = 'EQUAL'
const PERCENTUALE = 'PERCENTUALE'
// const ELIMINAULTIMOCARATTERE = 'ELIMINAULTIMOCARATTERE'
const ELIMINATUTTO = 'ELIMINATUTTO'

class Btn {
  constructor (obj) {
    this.key = obj.key // per creare un id univoco nel DOM
    this.label = obj.label // il testo da mostrare nella tastiera della calcolatrice
    this.icon = obj.icon // l'eventuale iconda della tastiera
    this.value = obj.value // il valore assegnato al pulsante della tastiera
    if (obj.symbol) { // il testo/simbolo da usare nel display delle operazioni
      this.symbol = obj.symbol
    } else {
      this.symbol = obj.label
    }
    this.type = obj.type // il tipo di pulsante (number, operator, clear, equal, modificatore)
    this.conParteDecimale = false
    this.numeroNegativo = false
    this.shortkey = obj.shortkey
  }
}

const BTN_0 = new Btn({key: 'N0', label: '0', value: '0', type: NUMBER, shortkey: '0'})
const BTN_1 = new Btn({key: 'N1', label: '1', value: '1', type: NUMBER, shortkey: '1'})
const BTN_2 = new Btn({key: 'N2', label: '2', value: '2', type: NUMBER, shortkey: '2'})
const BTN_3 = new Btn({key: 'N3', label: '3', value: '3', type: NUMBER, shortkey: '3'})
const BTN_4 = new Btn({key: 'N4', label: '4', value: '4', type: NUMBER, shortkey: '4'})
const BTN_5 = new Btn({key: 'N5', label: '5', value: '5', type: NUMBER, shortkey: '5'})
const BTN_6 = new Btn({key: 'N6', label: '6', value: '6', type: NUMBER, shortkey: '6'})
const BTN_7 = new Btn({key: 'N7', label: '7', value: '7', type: NUMBER, shortkey: '7'})
const BTN_8 = new Btn({key: 'N8', label: '8', value: '8', type: NUMBER, shortkey: '8'})
const BTN_9 = new Btn({key: 'N9', label: '9', value: '9', type: NUMBER, shortkey: '9'})

const BTN_DIVIDE = new Btn({key: 'DIVIDE', label: '÷', icon: 'mdi-division', value: 'div', type: OPERAZIONEBASE, shortkey: '/'})
const BTN_MOLT = new Btn({key: 'MOLT', label: '*', icon: 'mdi-multiplication', value: 'mul', type: OPERAZIONEBASE, shortkey: '*'})
const BTN_MINUS = new Btn({key: 'MINUS', label: '-', value: 'sub', type: OPERAZIONEBASE, shortkey: '-'})
const BTN_PLUS = new Btn({key: 'PLUS', label: '+', icon: 'mdi-plus', value: 'add', type: OPERAZIONEBASE, shortkey: '+'})

const BTN_OP_PERC = new Btn({key: 'OP_PERC', label: '%', icon: 'mdi-percent', value: 'PERCENTUALE', type: PERCENTUALE, shortkey: '%'})

const BTN_POINT = new Btn({key: 'POINT', label: '.', value: 'PUNTODECIMALE', type: PUNTODECIMALE, shortkey: '.'})
const BTN_SIGN = new Btn({key: 'SIGN', label: '±', value: 'TOGGLESEGNO', type: TOGGLESEGNO, shortkey: 'tab'})

const BTN_RESULT = new Btn({key: 'RESULT', label: '=', icon: 'mdi-equal', value: 'RISULTATO', type: EQUAL, shortkey: 'enter'})

// const BTN_OP_C = new Btn({key: 'OP_C', label: 'C', value: 'CANCELLA', type: CLEAR})
// const BTN_OP_DEL = new Btn({key: 'OP_DEL', label: '<-', icon: 'mdi-backspace', value: 'ELIMINAULTIMOCARATTERE', symbol: 'D', type: ELIMINAULTIMOCARATTERE})
const BTN_OP_CE = new Btn({key: 'OP_CE', label: 'CE', value: 'ELIMINATUTTO', type: ELIMINATUTTO, shortkey: 'del'})
const BTN_OP_DEL = new Btn({key: 'OP_DEL', label: '<-', icon: 'mdi-backspace', value: 'CANCELLA', symbol: 'D', type: CLEAR})

const state = {
  calcStandard: [
    [BTN_OP_CE, BTN_OP_DEL, BTN_OP_PERC, BTN_DIVIDE],
    [BTN_7, BTN_8, BTN_9, BTN_MOLT],
    [BTN_4, BTN_5, BTN_6, BTN_MINUS],
    [BTN_1, BTN_2, BTN_3, BTN_PLUS],
    [BTN_SIGN, BTN_0, BTN_POINT, BTN_RESULT]
  ]
}

const getters = {
  listButtons (state) {
    return state.calcStandard
  }
}

export default {
  namespaced: true,
  state,
  getters
}
