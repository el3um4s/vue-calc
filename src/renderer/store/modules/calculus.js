
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
  inputDec: [],
  inputText: '',
  listOperation: [],
  lastOperator: null
}

function formatoNumero (x) {
  return x.toNumber().toLocaleString(state.formatNumber)
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

function aggiungiInput (input) {
  if (input.type === NUMBER) {
    const x = new Decimal(input.value)
    x.type = NUMBER
    x.symbol = formatoNumero(x)
    state.inputDec.push(x)
  } else {
    state.inputDec.push(input)
  }
}

function aggiungiCifra (x, addX) {
  const newX = new Decimal(x.toString() + addX)
  newX.type = NUMBER
  newX.symbol = formatoNumero(newX)
  return newX
}

function eliminaUltimoInputIntero () {
  state.inputDec.pop()
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
        const x = new Decimal(item.value)
        return x.toNumber().toLocaleString(state.formatNumber)
      }
      return item.symbol
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
        aggiungiInput(payload)
        break
      case type === NUMBER && typePrec === NUMBER:
        state.input[inputPrec].value += value
        state.input[inputPrec].symbol += symbol
        state.inputDec[inputPrec] = aggiungiCifra(state.inputDec[inputPrec], value)
        break
      case type === OPERATOR && typePrec === NUMBER:
        state.input.push(payload)
        state.lastOperator = value
        aggiungiInput(payload)
        break
      case type === OPERATOR && typePrec === OPERATOR:
        state.input[inputPrec].value = value
        state.input[inputPrec].symbol = symbol
        state.lastOperator = value
        eliminaUltimoInputIntero()
        aggiungiInput(payload)
        break
      case type === NUMBER && typePrec === OPERATOR:
        state.input.push(payload)
        aggiungiInput(payload)
        break
      case type === EQUAL && typePrec === OPERATOR:
        state.input.pop()
        state.input.push(payload)
        calcola(state.input)
        state.listOperation.unshift(getters.getInputText() + ' ' + getters.getRisultato())
        state.input = []
        eliminaUltimoInputIntero()
        aggiungiInput(payload)
        break
      case type === EQUAL && typePrec === NUMBER:
        state.input.push(payload)
        calcola(state.input)
        state.listOperation.unshift(getters.getInputText() + ' ' + getters.getRisultato())
        state.input = []
        aggiungiInput(payload)
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
