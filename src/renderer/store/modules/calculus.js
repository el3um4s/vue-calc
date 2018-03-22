
import { Decimal } from 'decimal.js'

const NUMBER = 'NUMBER'
const OPERAZIONEBASE = 'OPERAZIONEBASE'
const PUNTODECIMALE = 'PUNTODECIMALE'
// const OPERATOR = 'operator'
// const CLEAR = 'clear'
// const EQUAL = 'equal'
// const MODIFICATORE = 'modifier'

// const NESSUNDECIMALE = 'nessun decimale'
// const DECIMALEIMPOSTATO = 'decimale impostato'
// const DECIMALEINSERITO = 'decimale inserito'

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
    return this.type === PUNTODECIMALE
  }

  isOperazioneBase (obj) {
    return this.type === OPERAZIONEBASE
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

  static restituisciNumeroDecimal (x) {
    let z = new Input({
      symbol: x.toString(),
      value: x.toString(),
      type: NUMBER,
      conParteDecimale: false
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

// function formatoNumero (x) {
//   if (x.conDecimale === NESSUNDECIMALE) {
//     return x.toNumber().toLocaleString(state.formatNumber)
//   }
//   if (x.conDecimale === DECIMALEIMPOSTATO) {
//     // const y = x.truncated()
//     const parteIntera = x.parteIntera.toNumber().toLocaleString(state.formatNumber, {minimumFractionDigits: 0})
//     const parteDecimale = '0'
//     const segno = x.isNegative && x.parteIntera.isZero() ? '-' : ''
//     return segno + parteIntera + puntoDecimale() + parteDecimale
//     // return x.toNumber().toLocaleString(state.formatNumber)
//   }
//   if (x.conDecimale === DECIMALEINSERITO) {
//     // const y = x.truncated()
//     // const parteIntera = y.toNumber().toLocaleString(state.formatNumber, {minimumFractionDigits: 0})
//     const parteIntera = x.parteIntera.toNumber().toLocaleString(state.formatNumber, {minimumFractionDigits: 0})
//     // const parteIntera = x.parteIntera
//     const parteDecimale = x.parteDecimale.substring(0, state.decimalPlaces)
//     const segno = x.isNegative && x.parteIntera.isZero() ? '-' : ''
//     return segno + parteIntera + puntoDecimale() + parteDecimale
//     // return x.toNumber().toLocaleString(state.formatNumber)
//   }
// }

const mutations = {
  addInput (state, payload) {
    const datoNuovo = new Input(payload)

    // calcolo la lunghezza di state.inputDec per capire se è il primo
    // dato inserito o se ce ne sono altri prima
    // inoltre uso il numero per ricavarmi i valori già inseriti
    const indiceNuovoDato = state.inputDec.length
    const thereIsDatoPrecedente = indiceNuovoDato > 0
    const datoPrecedente = thereIsDatoPrecedente ? state.inputDec[indiceNuovoDato - 1] : 0

    // se non c'è nessun inserimento allora inserisci un nuovo valore in inputDec
    if (!thereIsDatoPrecedente) {
      // il nuovo dato è un numero: aggiungilo
      if (datoNuovo.isNumber()) {
        aggiungiInputAInputDec(datoNuovo)
      }
      // il nuovo dato è il punto decimale: aggiungi uno zero e imposta il punto decimale
      if (datoNuovo.isPuntoDecimale()) {
        const datoTemp = Input.aggiungiPuntoDecimale(Input.restituisciNumeroDecimal(0))
        aggiungiInputAInputDec(datoTemp)
      }
      // TODO: il nuovo dato è il segno negativo
    } else { // se invece c'è un dato già inserito valuta il da farsi
      // se il datoPrecedente è un NUMBER
      if (datoPrecedente.isNumber()) {
        // se il nuovo dato è un numero, aggiungo la cifra al numero datoPrecedente
        if (datoNuovo.isNumber()) {
          const datoTemp = Input.unisciNumero(datoPrecedente, datoNuovo)
          sostituisciUltimoInput(datoTemp)
        }
        // se il nuovo dato è il punto decimale aggiungo la parte decimale
        if (datoNuovo.isPuntoDecimale()) {
          const datoTemp = Input.aggiungiPuntoDecimale(datoPrecedente)
          sostituisciUltimoInput(datoTemp)
        }
        // se il nuovo dato è un'operazione di base aggiungo un nuovo elemento a inputDec
        if (datoNuovo.isOperazioneBase()) {
          aggiungiInputAInputDec(datoNuovo)
        }
      }
      // se il datoPrecedente è un OPERAZIONEBASE
      if (datoPrecedente.isOperazioneBase()) {
        // se il nuovo dato è un numero aggiungo un nuovo elemento a inputDec
        if (datoNuovo.isNumber()) {
          aggiungiInputAInputDec(datoNuovo)
        }
        // se il nuovo dato è il punto decimale aggiungo un numero e poi aggiungo la parte decimale
        if (datoNuovo.isPuntoDecimale()) {
          const datoTemp = Input.aggiungiPuntoDecimale(Input.restituisciNumeroDecimal(0))
          aggiungiInputAInputDec(datoTemp)
        }
        // se il nuovo dato è una nuova operazione base allora sostituisco la precedente operazione base
        if (datoNuovo.isOperazioneBase()) {
          sostituisciUltimoInput(datoNuovo)
        }
      }
    }
    // calcolaDec(state.inputDec)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
