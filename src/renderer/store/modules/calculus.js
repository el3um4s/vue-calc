
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
  lastOperator: null
}

function setNumbers () {
  const lengthInput = state.input.length
  state.firstNumber = null
  state.secondNumber = null

  switch (lengthInput) {
    case 0:
      break
    case 1:
      state.firstNumber = new Decimal(state.input[0].value)
      break
    case 2:
      state.firstNumber = new Decimal(state.input[0].value)
      break
    default:
      state.firstNumber = new Decimal(state.input[lengthInput - 3].value)
      state.secondNumber = new Decimal(state.input[lengthInput - 1].value)
  }
}

function setResult () {
  if (state.firstNumber) {
    state.result = state.firstNumber
  }
  if (state.firstNumber && state.lastOperator && state.secondNumber) {
    switch (state.lastOperator) {
      case 'add':
        state.result = state.firstNumber.add(state.secondNumber)
        break
      case 'sub':
        state.result = state.firstNumber.sub(state.secondNumber)
        break
      case 'mul':
        state.result = state.firstNumber.mul(state.secondNumber)
        break
      case 'div':
        state.result = state.firstNumber.mul(state.secondNumber)
        break
    }
  }
}

const getters = {
  getRisultato () {
    // const x = new Decimal(state.result)
    // return x.toString()
    return state.result.toLocaleString(state.formatNumber)
  },
  getInput () {
    return state.input
  },
  getInputText () {
    const inputText = state.input.map(function (item) {
      return item['symbol']
    })
    return inputText.join(' ')
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
        setNumbers()
        break
      case type === NUMBER && typePrec === NUMBER:
        state.input[inputPrec].value += value
        state.input[inputPrec].symbol += symbol
        setNumbers()
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
        setNumbers()
        break
      case type === EQUAL && typePrec === OPERATOR:
        state.input.pop()
        state.input.push(payload)
        setNumbers()
        break
      case type === EQUAL && typePrec === NUMBER:
        state.input.push(payload)
        setNumbers()
        break
      default:
        break
    }
    // setResult()
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
