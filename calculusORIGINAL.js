
import { Decimal } from 'decimal.js'

const NUMBER = 'number'
const OPERATOR = 'operator'
// const CLEAR = 'clear'
const EQUAL = 'equal'
const MODIFICATORE = 'modifier'

const NESSUNDECIMALE = 'nessun decimale'
const DECIMALEIMPOSTATO = 'decimale impostato'
const DECIMALEINSERITO = 'decimale inserito'

const state = {
  formatNumber: 'it',
  inputDec: [],
  resultDec: new Decimal(0), // il risultato dell'operazione
  inputText: '',
  listOperationDec: [],
  decimalPlaces: 10 // il numero di cifre mostrate dal display
}

function formatoNumero (x) {
  // risultato totale
  if (!x.hasOwnProperty('type')) {
    const y = x.truncated()
    const z = x.minus(y)
    if (x.equals(y)) {
      console.log('x=y')
      return y.toNumber().toLocaleString(state.formatNumber)
    } else {
      console.log('x!=y')
      return y.toNumber().toLocaleString(state.formatNumber, {minimumFractionDigits: 0}) + puntoDecimale() + z.toString().substring(2, state.decimalPlaces + 2)
    }
  }
  if (x.hasDecimal === NESSUNDECIMALE) {
    return x.toNumber().toLocaleString(state.formatNumber)
  }
  if (x.hasDecimal === DECIMALEIMPOSTATO) {
    return x.toNumber().toLocaleString(state.formatNumber)
  }
  if (x.hasDecimal === DECIMALEINSERITO) {
    return x.toNumber().toLocaleString(state.formatNumber)
  }
}

function puntoDecimale () {
  const numIn = parseFloat(1 / 2)
  const strx = numIn.toLocaleString(state.formatNumber)
  return strx.substr(1, 1)
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
    state.inputDec.push(x)
  } else {
    if (input.type === NUMBER) {
      const x = new Decimal(input.value)
      x.type = NUMBER
      x.symbol = formatoNumero(x)
      x.hasDecimal = input.hasDecimal
      x.parteIntera = input.parteIntera
      x.parteDecimale = input.parteDecimale
      state.inputDec.push(x)
    } else {
      state.inputDec.push(input)
    }
  }
}

function aggiungiCifra (x, addX) {
  let decimale = x.hasDecimal

  if (decimale === NESSUNDECIMALE) {
    const newX = new Decimal(x.toString() + addX)
    newX.type = NUMBER
    newX.symbol = formatoNumero(newX)
    newX.hasDecimal = NESSUNDECIMALE
    newX.parteIntera = x.parteIntera
    newX.parteDecimale = x.parteDecimale
    return newX
  }
  if (decimale === DECIMALEIMPOSTATO) {
    x.parteDecimale += '' + addX
    x.parteIntera = x.truncated().toString()
    const newX = new Decimal(x.parteIntera + '.' + x.parteDecimale)
    newX.type = NUMBER
    newX.symbol = formatoNumero(newX)
    newX.hasDecimal = DECIMALEINSERITO
    newX.parteIntera = x.parteIntera
    newX.parteDecimale = x.parteDecimale
    return newX
  }
  if (decimale === DECIMALEINSERITO) {
    x.parteDecimale += '' + addX
    x.parteIntera = x.truncated().toString()
    const newX = new Decimal(x.parteIntera + '.' + x.parteDecimale)
    newX.type = NUMBER
    newX.symbol = formatoNumero(newX)
    newX.hasDecimal = DECIMALEINSERITO
    newX.parteIntera = x.parteIntera
    newX.parteDecimale = x.parteDecimale
    return newX
  }
}

function toogleSegno (x) {
  const y = x.neg()
  return y
}

function addDecimalPlaces (x) {
  if (x.hasDecimal === NESSUNDECIMALE) {
    x.hasDecimal = DECIMALEIMPOSTATO
  }
  return x
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
      if (item.type === NUMBER) {
        if (item.hasDecimal === DECIMALEIMPOSTATO) {
          return item.symbol + puntoDecimale() + '0'
        }
      }
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
          const x = addDecimalPlaces(new Decimal(0))
          aggiungiInput(x)
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
        } else if (value === 'DECIMALE') {
          const x = addDecimalPlaces(state.inputDec[inputPrec])
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
      case type === MODIFICATORE && typePrec === OPERATOR:
        if (value === 'DECIMALE') {
          const x = addDecimalPlaces(new Decimal(0))
          aggiungiInput(x)
        }
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
