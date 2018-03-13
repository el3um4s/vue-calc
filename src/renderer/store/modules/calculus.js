
import { Decimal } from 'decimal.js'

const NUMBER = 'number'
const OPERATOR = 'operator'
// const CLEAR = 'clear'
const EQUAL = 'equal'
// const MODIFICATORE = 'modifier'

const state = {
  formatNumber: 'it',
  firstNumber: null,
  secondNumber: null,
  result: new Decimal(0),
  input: [],
  inputText: '',
  listOperation: [],
  lastOperator: null
}

function calcola (elements) {
  if (elements.length === 0) return
  let decimal = null
  for (let i = 0; i < elements.length; i++) {
    const value = elements[i].value
    const type = elements[i].type
    if (i === 0 && type === NUMBER) {
      decimal = new Decimal(value)
    } else if (i < elements.length - 1) {
      if (type === OPERATOR) {
        decimal = decimal[value](elements[i + 1].value)
        i += 1
      }
    }
  }
  console.log(decimal)
  state.result = decimal
}

const getters = {
  getRisultato () {
    // const x = state.result.d[0] * state.result.s
    return state.result.toNumber().toLocaleString(state.formatNumber)
    // return x.toLocaleString(state.formatNumber)
  },
  getInput () {
    return state.input
  },
  getInputText () {
    const inputText = state.input.map(function (item) {
      if (item.type === NUMBER) {
        const x = new Decimal(item.symbol)
        return x.toNumber().toLocaleString(state.formatNumber)
      }
      return item.symbol
      // return item['symbol']
    })
    return inputText.join(' ')
  },
  getListOperation () {
    return state.listOperation
  }
}

const mutations = {
  addInput (state, payload) {
    const lengthInput = state.input.length
    // const input = lengthInput
    const inputPrec = lengthInput > 0 ? lengthInput - 1 : 0
    const typePrec = lengthInput > 0 ? state.input[lengthInput - 1].type : '-'

    const type = payload.type
    const value = payload.value
    const symbol = payload.symbol

    switch (true) {
      case lengthInput === 0 && type === NUMBER:
        state.input.push(payload)
        break
      case type === NUMBER && typePrec === NUMBER:
        state.input[inputPrec].value += value
        state.input[inputPrec].symbol += symbol
        break
      case type === OPERATOR && typePrec === NUMBER:
        state.input.push(payload)
        state.lastOperator = value
        break
      case type === OPERATOR && typePrec === OPERATOR:
        state.input[inputPrec].value = value
        state.input[inputPrec].symbol = symbol
        state.lastOperator = value
        break
      case type === NUMBER && typePrec === OPERATOR:
        state.input.push(payload)
        break
      case type === EQUAL && typePrec === OPERATOR:
        state.input.pop()
        state.input.push(payload)
        calcola(state.input)
        state.listOperation.unshift(getters.getInputText() + ' ' + getters.getRisultato())
        state.input = []
        break
      case type === EQUAL && typePrec === NUMBER:
        state.input.push(payload)
        calcola(state.input)
        state.listOperation.unshift(getters.getInputText() + ' ' + getters.getRisultato())
        state.input = []
        break
      default:
        break
    }
    calcola(state.input)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
