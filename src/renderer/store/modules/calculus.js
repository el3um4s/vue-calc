
import {Decimal} from 'decimal.js'

const state = {
  risultato: 0,
  input: []
}

const getters = {
  getRisultato () {
    return state.risultato
  },
  getInput () {
    return state.input
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
    state.input.push(payload)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
