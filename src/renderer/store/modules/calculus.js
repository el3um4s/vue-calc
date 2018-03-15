
import { Decimal } from 'decimal.js'

const NUMBER = 'number'
const OPERATOR = 'operator'
// const CLEAR = 'clear'
const EQUAL = 'equal'
const MODIFICATORE = 'modifier'

const state = {
  formatNumber: 'it',
  inputDec: [],
  resultDec: new Decimal(0),
  inputText: '',
  listOperationDec: []
}

function formatoNumero (x) {
  return x.toNumber().toLocaleString(state.formatNumber)
}

function calcolaDec (elements) {
  if (elements.length === 0) return
  let decimal = null
  for (let i = 0; i < elements.length; i++) {
    const type = elements[i].type
    if (i === 0 && type === NUMBER) {
      decimal = elements[i]
    } else if (i < elements.length - 1) {
      const value = elements[i].value
      if (type === OPERATOR) {
        decimal = decimal[value](elements[i + 1])
        i += 1
      }
    }
  }
  state.resultDec = decimal
}

function aggiungiInput (input) {
  if (Decimal.isDecimal(input)) {
    const x = input
    x.type = NUMBER
    x.symbol = formatoNumero(x)
    console.log(x)
    state.inputDec.push(x)
  } else {
    if (input.type === NUMBER) {
      const x = new Decimal(input.value)
      x.type = NUMBER
      x.symbol = formatoNumero(x)
      state.inputDec.push(x)
    } else {
      state.inputDec.push(input)
    }
  }
}

function aggiungiCifra (x, addX) {
  const newX = new Decimal(x.toString() + addX)
  newX.type = NUMBER
  newX.symbol = formatoNumero(newX)
  return newX
}

function toogleSegno (x) {
  const y = x.neg()
  y.type = NUMBER
  y.symbol = formatoNumero(y)
  return y
}

function addDecimalPlaces (x) {
  const decimali = x.decimalPlaces()
  console.log(decimali)
}

function eliminaUltimoInputIntero () {
  state.inputDec.pop()
}

const getters = {
  getRisultatoDec () {
    return formatoNumero(state.resultDec)
  },
  getInputTextDec () {
    const inputText = state.inputDec.map(function (item) {
      return item.symbol
    })
    return inputText.join(' ')
  },
  getListOperationDec () {
    return state.listOperationDec
  }
}

const mutations = {
  addInput (state, payload) {
    const lengthInput = state.inputDec.length
    const inputPrec = lengthInput > 0 ? lengthInput - 1 : 0
    const typePrec = lengthInput > 0 ? state.inputDec[lengthInput - 1].type : '-'

    const type = payload.type
    const value = payload.value

    switch (true) {
      case lengthInput === 0 && type === NUMBER:
        aggiungiInput(payload)
        break
      case lengthInput === 0 && type === MODIFICATORE:
        if (value === 'INVERTI') {
          aggiungiInput(new Decimal(-0))
        } else if (value === 'DECIMALE') {
          aggiungiInput(new Decimal(0.1))
          addDecimalPlaces(state.inputDec[0])
        }
        break
      case type === NUMBER && typePrec === NUMBER:
        const x = aggiungiCifra(state.inputDec[inputPrec], value)
        eliminaUltimoInputIntero()
        aggiungiInput(x)
        break
      case type === MODIFICATORE && typePrec === NUMBER:
        if (value === 'INVERTI') {
          const x = toogleSegno(state.inputDec[inputPrec])
          eliminaUltimoInputIntero()
          aggiungiInput(x)
        }
        break
      case type === OPERATOR && typePrec === NUMBER:
        aggiungiInput(payload)
        break
      case type === OPERATOR && typePrec === OPERATOR:
        eliminaUltimoInputIntero()
        aggiungiInput(payload)
        break
      case type === NUMBER && typePrec === OPERATOR:
        aggiungiInput(payload)
        break
      case type === EQUAL && typePrec === OPERATOR:
        eliminaUltimoInputIntero()
        aggiungiInput(payload)
        calcolaDec(state.inputDec)
        state.listOperationDec.unshift(getters.getInputTextDec() + ' ' + getters.getRisultatoDec())
        state.inputDec = []
        break
      case type === EQUAL && typePrec === NUMBER:
        aggiungiInput(payload)
        calcolaDec(state.inputDec)
        state.listOperationDec.unshift(getters.getInputTextDec() + ' ' + getters.getRisultatoDec())
        state.inputDec = []
        break
      default:
        break
    }
    calcolaDec(state.inputDec)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
