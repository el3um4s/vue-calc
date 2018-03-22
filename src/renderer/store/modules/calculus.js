
import { Decimal } from 'decimal.js'

const NUMBER = 'number'
// const OPERATOR = 'operator'
// const CLEAR = 'clear'
// const EQUAL = 'equal'
// const MODIFICATORE = 'modifier'

const NESSUNDECIMALE = 'nessun decimale'
const DECIMALEIMPOSTATO = 'decimale impostato'
const DECIMALEINSERITO = 'decimale inserito'

function puntoDecimale () {
  const numIn = parseFloat(1 / 2)
  const strx = numIn.toLocaleString(state.formatNumber)
  return strx.substr(1, 1)
}

const state = {
  formatNumber: 'it',
  inputDec: [],
  resultDec: new Decimal(0), // il risultato dell'operazione
  inputText: '',
  listOperationDec: [],
  decimalPlaces: 10 // il numero di cifre mostrate dal display
}

function aggiungiInputAInputDec (obj) {
  state.inputDec.push(obj)
}

function sostituisciUltimoInput (obj) {
  state.inputDec.pop()
  state.inputDec.push(obj)
}

class Input {
  constructor (obj) {
    this.symbol = obj.symbol
    this.value = obj.value
    this.type = obj.type
    this.conParteDecimale = obj.conParteDecimale
  }

  isNumber (obj) {
    return this.type === NUMBER
  }

  isPuntoDecimale (obj) {
    return this.value === 'PUNTODECIMALE'
  }

  isOperazioneBase (obj) {
    return this.value === 'operazionebase'
  }

  static unisciNumero (x, y) {
    let z = new Input({
      symbol: x.symbol + y.symbol,
      value: x.value + y.value,
      type: x.type,
      conParteDecimale: x.conParteDecimale
    })
    return z
  }

  static aggiungiPuntoDecimale (x) {
    let z = new Input({
      symbol: x.conParteDecimale ? x.symbol : x.symbol + puntoDecimale(),
      value: x.conParteDecimale ? x.value : x.value + puntoDecimale(),
      type: x.type,
      conParteDecimale: true
    })
    return z
  }
}

// FUNZIONE CHE CALCOLA IL RISULTATO DELL'OPERAZIONE
// function calcolaDec (elements) {
//   if (elements.length === 0) return
//   let decimal = null
//   for (let i = 0; i < elements.length; i++) {
//     const type = elements[i].type
//     if (i === 0 && type === NUMBER) {
//       decimal = elements[i]
//     } else if (i < elements.length - 1) {
//       const value = elements[i].value
//       if (type === OPERATOR) {
//         decimal = decimal[value](elements[i + 1])
//         i += 1
//       }
//     }
//   }
//   state.resultDec = decimal
// }
// FINE DELLA FUNZIONE CHE CALCOLA IL RISULTATO DELL'OPERAZIONE

// GETTERS
const getters = {
  getRisultatoDec () {
    return formatoRisultato(state.resultDec)
  },
  getInputTextDec () {
    const inputText = state.inputDec.map(function (item) {
      if (item.type === NUMBER) {
        return item.symbol
      }
      return item.symbol
    })
    return inputText.join(' ')
  },
  getListOperationDec () {
    return state.listOperationDec
  }
}
// FINE GETTERS

function formatoRisultato (x) {
  const y = x.truncated()
  const z = x.minus(y)
  if (x.equals(y)) {
    return y.toNumber().toLocaleString(state.formatNumber)
  } else {
    if (z > 0) {
      return y.toNumber().toLocaleString(state.formatNumber, {minimumFractionDigits: 0}) + puntoDecimale() + z.toString().substring(2, state.decimalPlaces + 2)
    } else {
      const parteIntera = y.toNumber().toLocaleString(state.formatNumber, {minimumFractionDigits: 0})
      const parteDecimale = z.toString().substring(3, state.decimalPlaces + 2)
      const segno = parteIntera === '0' ? '-' : ''
      return segno + parteIntera + puntoDecimale() + parteDecimale
    }
  }
}

function formatoNumero (x) {
  if (x.conDecimale === NESSUNDECIMALE) {
    return x.toNumber().toLocaleString(state.formatNumber)
  }
  if (x.conDecimale === DECIMALEIMPOSTATO) {
    // const y = x.truncated()
    const parteIntera = x.parteIntera.toNumber().toLocaleString(state.formatNumber, {minimumFractionDigits: 0})
    const parteDecimale = '0'
    const segno = x.isNegative && x.parteIntera.isZero() ? '-' : ''
    return segno + parteIntera + puntoDecimale() + parteDecimale
    // return x.toNumber().toLocaleString(state.formatNumber)
  }
  if (x.conDecimale === DECIMALEINSERITO) {
    // const y = x.truncated()
    // const parteIntera = y.toNumber().toLocaleString(state.formatNumber, {minimumFractionDigits: 0})
    const parteIntera = x.parteIntera.toNumber().toLocaleString(state.formatNumber, {minimumFractionDigits: 0})
    // const parteIntera = x.parteIntera
    const parteDecimale = x.parteDecimale.substring(0, state.decimalPlaces)
    const segno = x.isNegative && x.parteIntera.isZero() ? '-' : ''
    return segno + parteIntera + puntoDecimale() + parteDecimale
    // return x.toNumber().toLocaleString(state.formatNumber)
  }
}



function aggiungiInput (input) {
  console.log('input passato su aggiungiInput')
  console.log(input)
  if (Decimal.isDecimal(input)) {
    const x = input
    x.type = NUMBER
    x.parteIntera = input.truncated()
    if (input.hasOwnProperty('parteDecimale')) {
      x.parteDecimale = input.parteDecimale
    } else {
      x.parteDecimale = ''
    }
    if (input.hasOwnProperty('conDecimale')) {
      x.conDecimale = input.conDecimale
    } else {
      x.conDecimale = NESSUNDECIMALE
    }
    // const z = input.minus(x.parteIntera) // ???
    // x.parteDecimale = z.toString().substring(2, state.decimalPlaces + 2) // ???
    if (input.equals(x.parteIntera) && x.parteDecimale !== '0') {
      if (x.conDecimale === DECIMALEIMPOSTATO) {
        x.conDecimale = DECIMALEIMPOSTATO
      } else {
        x.conDecimale = NESSUNDECIMALE
      }
    } else {
      x.conDecimale = DECIMALEINSERITO
    }
    x.symbol = formatoNumero(x)
    state.inputDec.push(x)
  } else {
    if (input.type === NUMBER) {
      const x = new Decimal(input.value)
      x.type = NUMBER
      x.conDecimale = input.conDecimale
      x.parteIntera = input.parteIntera
      x.parteDecimale = input.parteDecimale
      x.symbol = formatoNumero(x)
      state.inputDec.push(x)
    } else {
      state.inputDec.push(input)
    }
  }
}

function aggiungiCifra (x, addX) {
  let decimale = x.conDecimale
  if (decimale === NESSUNDECIMALE) {
    const newX = new Decimal(x.toString() + addX)
    newX.type = NUMBER
    newX.conDecimale = NESSUNDECIMALE
    newX.parteIntera = x.parteIntera
    newX.parteDecimale = x.parteDecimale
    newX.symbol = formatoNumero(newX)
    return newX
  }
  if (decimale === DECIMALEIMPOSTATO) {
    x.parteDecimale += '' + addX
    x.parteIntera = x.truncated()
    // x.parteIntera = x.truncated().toString()
    const newX = new Decimal(x.parteIntera + '.' + x.parteDecimale)
    newX.type = NUMBER
    newX.conDecimale = DECIMALEINSERITO
    newX.parteIntera = x.parteIntera
    newX.parteDecimale = x.parteDecimale
    newX.symbol = formatoNumero(newX)
    return newX
  }
  if (decimale === DECIMALEINSERITO) {
    x.parteDecimale += '' + addX
    x.parteIntera = x.truncated()
    // x.parteIntera = x.truncated().toString()
    const newX = new Decimal(x.parteIntera + '.' + x.parteDecimale)
    newX.type = NUMBER
    newX.conDecimale = DECIMALEINSERITO
    newX.parteIntera = x.parteIntera
    newX.parteDecimale = x.parteDecimale
    newX.symbol = formatoNumero(newX)
    return newX
  }
}

function toogleSegno (x) {
  console.log('x arrivato a toggleSegno')
  console.log(x)
  const y = x.neg()
  console.log('x trasformata in y da toogleSegno')
  console.log(y)
  return y
}

function addDecimalPlaces (x) {
  if (x.conDecimale === NESSUNDECIMALE) {
    x.conDecimale = DECIMALEIMPOSTATO
  }
  return x
}

function eliminaUltimoInputIntero () {
  state.inputDec.pop()
}

const mutations = {
  addInput (state, payload) {
    const datoNuovo = new Input(payload)

    // calcolo la lunghezza di state.inputDec per capire se è il primo
    // dato inserito o se ce ne sono altri prima
    // inoltre uso il numero per ricavarmi i valori già inseriti
    const indiceNuovoDato = state.inputDec.length
    const thereIsDatoPrecedente = indiceNuovoDato > 0
    const datoPrecedente = thereIsDatoPrecedente ? state.inputDec[indiceNuovoDato - 1] : 0

    console.log(datoNuovo)
    console.log(datoPrecedente)

    if (!thereIsDatoPrecedente) {
      aggiungiInputAInputDec(datoNuovo)
    } else {
      const datoTemp = Input.unisciNumero(datoPrecedente, datoNuovo)
      sostituisciUltimoInput(datoTemp)
    }

    // const lengthInput = state.inputDec.length
    // const inputPrec = lengthInput > 0 ? lengthInput - 1 : 0
    // const typePrec = lengthInput > 0 ? state.inputDec[lengthInput - 1].type : '-'
    //
    // const type = payload.type
    // const value = payload.value
    //
    // switch (true) {
    //   case lengthInput === 0 && type === NUMBER:
    //     aggiungiInput(payload)
    //     break
    //   case lengthInput === 0 && type === MODIFICATORE:
    //     if (value === 'INVERTI') {
    //       aggiungiInput(new Decimal(-0))
    //     } else if (value === 'DECIMALE') {
    //       const x = addDecimalPlaces(new Decimal(0))
    //       aggiungiInput(x)
    //     }
    //     break
    //   case type === NUMBER && typePrec === NUMBER:
    //     const x = aggiungiCifra(state.inputDec[inputPrec], value)
    //     eliminaUltimoInputIntero()
    //     aggiungiInput(x)
    //     break
    //   case type === MODIFICATORE && typePrec === NUMBER:
    //     if (value === 'INVERTI') {
    //       console.log('input passato su toogleSegno')
    //       console.log(state.inputDec[inputPrec])
    //       const x = toogleSegno(state.inputDec[inputPrec])
    //       console.log('input restituito da toggleSegno e passato ad aggiungiInput')
    //       console.log(x)
    //       eliminaUltimoInputIntero()
    //       aggiungiInput(x)
    //     } else if (value === 'DECIMALE') {
    //       const x = addDecimalPlaces(state.inputDec[inputPrec])
    //       eliminaUltimoInputIntero()
    //       aggiungiInput(x)
    //     }
    //     break
    //   case type === OPERATOR && typePrec === NUMBER:
    //     aggiungiInput(payload)
    //     break
    //   case type === OPERATOR && typePrec === OPERATOR:
    //     eliminaUltimoInputIntero()
    //     aggiungiInput(payload)
    //     break
    //   case type === NUMBER && typePrec === OPERATOR:
    //     aggiungiInput(payload)
    //     break
    //   case type === MODIFICATORE && typePrec === OPERATOR:
    //     if (value === 'DECIMALE') {
    //       const x = addDecimalPlaces(new Decimal(0))
    //       aggiungiInput(x)
    //     }
    //     break
    //   case type === EQUAL && typePrec === OPERATOR:
    //     eliminaUltimoInputIntero()
    //     aggiungiInput(payload)
    //     calcolaDec(state.inputDec)
    //     state.listOperationDec.unshift(getters.getInputTextDec() + ' ' + getters.getRisultatoDec())
    //     state.inputDec = []
    //     break
    //   case type === EQUAL && typePrec === NUMBER:
    //     aggiungiInput(payload)
    //     calcolaDec(state.inputDec)
    //     state.listOperationDec.unshift(getters.getInputTextDec() + ' ' + getters.getRisultatoDec())
    //     state.inputDec = []
    //     break
    //   default:
    //     break
    // }
    // calcolaDec(state.inputDec)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
