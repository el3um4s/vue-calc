
import {Decimal} from 'decimal.js'

const state = {
  formatNumber: 'it',
  risultato: 999999999999999,
  input: [],
  inputText: ''
}

const getters = {
  getRisultato () {
    // const x = new Decimal(state.risultato)
    // return x.toString()
    return state.risultato.toLocaleString(state.formatNumber)
  },
  getInput () {
    return state.input
  },
  getInputText () {
    const inputText = state.input.map(function (item) {
      return item['symbol']
    })
    return inputText.join()
  }
}

const mutations = {
  addition (state) {
    const x = new Decimal(3)
    const y = new Decimal(state.risultato)
    const z = x.plus(y)
    state.risultato = z
    // state.risultato = state.risultato + 1
  },
  addInput (state, payload) {
    const lengthInput = state.input.length

    if (lengthInput === 0 && payload.type === 'number') {
      state.input.push(payload)
    } else {
      if (payload.type === 'number' && state.input[lengthInput - 1].type === 'number') {
        state.input[lengthInput - 1].value += payload.value
        state.input[lengthInput - 1].symbol += payload.symbol
      }
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
