
import { Decimal } from 'decimal.js'

const NUMBER = 'NUMBER'
const OPERAZIONEBASE = 'OPERAZIONEBASE'
const PUNTODECIMALE = 'PUNTODECIMALE'
const TOGGLESEGNO = 'TOGGLESEGNO'
const EQUAL = 'EQUAL'
const PERCENTUALE = 'PERCENTUALE'
const CLEAR = 'CLEAR'
const ELIMINATUTTO = 'ELIMINATUTTO'

function puntoDecimale () {
  const numIn = parseFloat(1 / 2)
  const strx = numIn.toLocaleString(state.formatNumber)
  return strx.substr(1, 1)
}

function aggiungiInputAInputDec (obj) {
  state.inputDec.push(obj)
}

function sostituisciUltimoInput (obj) {
  state.inputDec.pop()
  state.inputDec.push(obj)
}

function eliminaUltimoInput () {
  if (state.inputDec.length > 0) {
    state.inputDec.pop()
  }
}

function eliminatTutto () {
  state.inputDec = []
  state.listOperationDec = []
}

class Input {
  constructor (obj) {
    this.symbol = obj.symbol
    this.value = obj.value
    this.type = obj.type
    this.conParteDecimale = obj.conParteDecimale
    this.numeroNegativo = obj.numeroNegativo
  }

  isNumber (obj) {
    return this.type === NUMBER
  }

  isPuntoDecimale (obj) {
    return this.type === PUNTODECIMALE
  }

  isSegnoNegativo (obj) {
    return this.type === TOGGLESEGNO
  }

  isOperazioneBase (obj) {
    return this.type === OPERAZIONEBASE
  }

  isSegnoUguale (obj) {
    return this.type === EQUAL
  }

  isSegnoPercentuale (obj) {
    return this.type === PERCENTUALE
  }

  isEliminaUltimoInput (obj) {
    return this.type === CLEAR
  }

  isEliminaTutto (obj) {
    return this.type === ELIMINATUTTO
  }

  static unisciNumero (x, y) {
    const z = new Input({
      symbol: x.symbol + y.symbol,
      value: x.value + y.value,
      type: x.type,
      conParteDecimale: x.conParteDecimale,
      numeroNegativo: x.numeroNegativo
    })
    return z
  }

  static aggiungiPuntoDecimale (x) {
    const z = new Input({
      symbol: x.conParteDecimale ? x.symbol : x.symbol + puntoDecimale(),
      value: x.conParteDecimale ? x.value : x.value + '.',
      type: x.type,
      conParteDecimale: true,
      numeroNegativo: x.numeroNegativo
    })
    return z
  }

  static toogleSegnoNumero (x) {
    const z = new Input({
      symbol: x.numeroNegativo ? x.symbol.substring(1) : '-' + x.symbol,
      value: x.numeroNegativo ? x.value.substring(1) : '-' + x.value,
      type: x.type,
      conParteDecimale: x.conParteDecimale,
      numeroNegativo: !x.numeroNegativo
    })
    return z
  }

  static dividiPerCento (x) {
    // per dividere per cento sposto il punto decimale di due posizioni verso sinistra
    const {symbol, value, type, conParteDecimale, numeroNegativo} = x
    let numeroCifre = numeroNegativo ? value.length - 1 : value.length
    numeroCifre = conParteDecimale ? value.length - 1 : value.length
    let newValue = numeroNegativo ? value.substring(1) : value
    let newSymbol = numeroNegativo ? symbol.substring(1) : symbol

    // va gestito il caso di numero senza decimale
    let positionPuntoDecimale = value.lastIndexOf('.')
    newValue = newValue.substring(0, positionPuntoDecimale) + newValue.substring(positionPuntoDecimale + 1)
    newSymbol = newSymbol.substring(0, positionPuntoDecimale) + newSymbol.substring(positionPuntoDecimale + 1)

    // controlla quante cifre ci sono prima del punto decimale
    // se non c'è il punto decimale
    positionPuntoDecimale = positionPuntoDecimale === -1 ? numeroCifre : positionPuntoDecimale

    switch (positionPuntoDecimale) {
      case 1:
        newValue = '0.0' + newValue
        newSymbol = '0' + puntoDecimale() + '0' + newSymbol
        break
      case 2:
        newValue = '0.' + newValue
        newSymbol = '0' + puntoDecimale() + newSymbol
        break
      default:
        newValue = newValue.substring(0, positionPuntoDecimale - 2) + '.' + newValue.substring(positionPuntoDecimale - 2)
        newSymbol = newSymbol.substring(0, positionPuntoDecimale - 2) + puntoDecimale() + newSymbol.substring(positionPuntoDecimale - 2)
    }

    const z = new Input({
      symbol: numeroNegativo ? '-' + newSymbol : newSymbol,
      value: numeroNegativo ? '-' + newValue : newValue,
      type: type,
      conParteDecimale: true,
      numeroNegativo: numeroNegativo
    })
    return z
  }

  static restituisciNumeroDecimal (x, conParteDecimale = false, numeroNegativo = false) {
    const z = new Input({
      symbol: x.toString(),
      value: x.toString(),
      type: NUMBER,
      conParteDecimale: conParteDecimale,
      numeroNegativo: numeroNegativo
    })
    return z
  }
}

// FUNZIONE CHE CALCOLA IL RISULTATO DELL'OPERAZIONE
function calcolaRisultato () {
  const listaInput = state.inputDec
  let decimal = new Decimal(0)
  // se non ci sono operazioni o numeri inseriti allora non occorre fare nulla
  if (listaInput.length === 0) return decimal
  // se invece ci sono operazioni o numeri inseriti allora inizio a fare i conti
  for (let i = 0; i < listaInput.length; i++) {
    if (i === 0 && listaInput[i].isNumber()) {
      decimal = new Decimal(listaInput[i].value)
    } else if (i < listaInput.length - 1) {
      if (listaInput[i].isOperazioneBase()) {
        decimal = decimal[listaInput[i].value](new Decimal(listaInput[i + 1].value))
        i += 1
      }
    }
  }
  return decimal
}
// FINE DELLA FUNZIONE CHE CALCOLA IL RISULTATO DELL'OPERAZIONE

// trasforma il decimale con il risultato in una stringa con il numero nel formato
// locale impostato in state.formatNumber e con tante cifre decimali quante impostate
// su state.decimalPlaces
function formatoRisultato (x) {
  if (x.isNaN()) {
    return 'NaN'
  }
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

function formatoInput (x) {
  const xTemp = new Decimal(x.value)
  const y = xTemp.truncated()
  const xStringParteIntera = y.toNumber().toLocaleString(state.formatNumber, {minimumFractionDigits: 0})
  // const xStringSegno = x.numeroNegativo ? '-' : ''
  const xStringParteDecimale = x.conParteDecimale ? puntoDecimale() + x.value.substring(x.value.lastIndexOf('.') + 1) : ''
  return xStringParteIntera + xStringParteDecimale
  // return xStringSegno + xStringParteIntera + xStringParteDecimale
}

// STATE (VUEX)
const state = {
  formatNumber: 'it-IT',
  inputDec: [],
  resultDec: new Decimal(0), // il risultato dell'operazione
  inputText: '',
  listOperationDec: [],
  decimalPlaces: 5 // il numero di cifre mostrate dal display
}
// FINE STATE (VUEX)

// GETTERS
const getters = {
  getRisultatoDec () {
    return formatoRisultato(state.resultDec)
  },
  getInputTextDec () {
    const inputText = state.inputDec.map(function (item) {
      if (item.type === NUMBER) {
        // return item.symbol
        return formatoInput(item)
      }
      return item.symbol
    })
    return inputText.join(' ')
  },
  getListOperationDec () {
    return state.listOperationDec
  },
  getFormatoNumero () {
    return state.formatNumber
  },
  getPosizioniDecimali () {
    return state.decimalPlaces
  }
}
// FINE GETTERS

const mutations = {
  cambiaFormatoNumero (state, payload) {
    state.formatNumber = payload
  },
  cambiaNumeroDecimali (state, payload) {
    state.decimalPlaces = Number(payload)
  },
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
        // se il nuovo dato è il segno di ± allora inverto il segno del numero
        if (datoNuovo.isSegnoNegativo()) {
          const datoTemp = Input.toogleSegnoNumero(datoPrecedente)
          sostituisciUltimoInput(datoTemp)
        }
        // se il nuovo dato è il segno percenuale allora divido il numero per 100
        // e lo moltiplico per il numero inserito in precedenza
        if (datoNuovo.isSegnoPercentuale()) {
          if (indiceNuovoDato === 1) {
            const datoTemp = Input.dividiPerCento(datoPrecedente)
            sostituisciUltimoInput(datoTemp)
          } else {
            const datoPrecedenteX2 = state.inputDec[indiceNuovoDato - 3]
            const datoPrecedenteX2UnoPerCento = Input.dividiPerCento(datoPrecedenteX2)
            const datoPrecedenteX2UnoPerCentoDecimal = new Decimal(datoPrecedenteX2UnoPerCento.value)
            const datoPrecedenteDecimal = new Decimal(datoPrecedente.value)
            const datoTemp = datoPrecedenteDecimal.mul(datoPrecedenteX2UnoPerCentoDecimal)
            const datoTemp2 = Input.restituisciNumeroDecimal(datoTemp, true, datoPrecedenteX2.numeroNegativo)
            sostituisciUltimoInput(datoTemp2)
          }
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

    if (datoNuovo.isEliminaUltimoInput()) {
      eliminaUltimoInput()
    }

    if (datoNuovo.isEliminaTutto()) {
      eliminatTutto()
    }

    // CALOLA IL RISULTATO
    state.resultDec = calcolaRisultato()

    // se il nuovo dato è il segno = allora chiudi l'operazione
    if (datoNuovo.isSegnoUguale() && thereIsDatoPrecedente) {
      if (datoPrecedente.isOperazioneBase()) {
        eliminaUltimoInput()
      }
      aggiungiInputAInputDec(datoNuovo)
      state.listOperationDec.unshift(getters.getInputTextDec() + ' ' + formatoRisultato(state.resultDec))
      state.inputDec = []
      state.resultDec = calcolaRisultato()
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
