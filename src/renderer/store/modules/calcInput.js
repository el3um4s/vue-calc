class Btn {
  constructor (obj) {
    this.key = obj.key
    this.label = obj.label
    this.icon = obj.icon
  }

  get dati () {
    return {
      key: this.key,
      label: this.label,
      icon: this.icon
    }
  }
}

const BTN_0 = new Btn({key: 'N0', label: 0, icon: 'mdi-numeric-0-box-outline'})
const BTN_1 = new Btn({key: 'N1', label: 1, icon: 'mdi-numeric-1-box-outline'})
const BTN_2 = new Btn({key: 'N2', label: 2, icon: 'mdi-numeric-2-box-outline'})
const BTN_3 = new Btn({key: 'N3', label: 3, icon: 'mdi-numeric-3-box-outline'})
const BTN_4 = new Btn({key: 'N4', label: 4, icon: 'mdi-numeric-4-box-outline'})
const BTN_5 = new Btn({key: 'N5', label: 5, icon: 'mdi-numeric-5-box-outline'})
const BTN_6 = new Btn({key: 'N6', label: 6, icon: 'mdi-numeric-6-box-outline'})
const BTN_7 = new Btn({key: 'N7', label: 7, icon: 'mdi-numeric-7-box-outline'})
const BTN_8 = new Btn({key: 'N8', label: 8, icon: 'mdi-numeric-8-box-outline'})
const BTN_9 = new Btn({key: 'N9', label: 9, icon: 'mdi-numeric-9-box-outline'})

const BTN_DIVIDE = new Btn({key: 'DIVIDE', label: '÷'})
const BTN_MOLT = new Btn({key: 'MOLT', label: 'X'})
const BTN_MINUS = new Btn({key: 'MINUS', label: '-'})
const BTN_PLUS = new Btn({key: 'PLUS', label: '+'})
const BTN_SIGN = new Btn({key: 'SIGN', label: '±'})
const BTN_POINT = new Btn({key: 'POINT', label: ','})
const BTN_RESULT = new Btn({key: 'RESULT', label: '='})

const BTN_OP_PERC = new Btn({key: 'OP_PERC', label: '%'})
const BTN_OP_SQUARE = new Btn({key: 'OP_SQUARE', label: '√'})
const BTN_OP_POT = new Btn({key: 'OP_POT', label: 'x²'})
const BTN_OP_1DIV = new Btn({key: 'OP_1DIV', label: '⅟x'})
const BTN_OP_CE = new Btn({key: 'OP_CE', label: 'CE'})
const BTN_OP_C = new Btn({key: 'OP_C', label: 'C'})
const BTN_OP_DEL = new Btn({key: 'OP_DEL', label: '<-'})

const state = {
  calcStandard: [
    [BTN_OP_PERC, BTN_OP_SQUARE, BTN_OP_POT, BTN_OP_1DIV],
    [BTN_OP_CE, BTN_OP_C, BTN_OP_DEL, BTN_DIVIDE],
    [BTN_7, BTN_8, BTN_9, BTN_MOLT],
    [BTN_4, BTN_5, BTN_6, BTN_MINUS],
    [BTN_1, BTN_2, BTN_3, BTN_PLUS],
    [BTN_SIGN, BTN_0, BTN_POINT, BTN_RESULT]
  ]
}

const getters = {
  listButtonsStandard (state) {
    return state.calcStandard
  },
  listButtons: (state) => (typeCalc) => {
    const tipo = typeCalc.toLowerCase

    switch (tipo) {
      case 'standard':
        return state.calcStandard
      case 'scientifica':
        return state.calcStandard
      default:
        return state.calcStandard
    }
  }
}

export default {
  namespaced: true,
  state,
  getters
}
