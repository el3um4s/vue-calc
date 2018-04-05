const state = {
  dark: false,
  version: '0.18.04.04',
  linguaApp: 'Italiano'
}

const getters = {
  versionNumber (state) {
    return state.version
  },
  darkTheme (state) {
    return state.dark
  },
  linguaApp (state) {
    return state.linguaApp
  }
}

const mutations = {
  cambiaTema (state, payload) {
    state.dark = payload
  },
  cambiaLingua (state, payload) {
    state.linguaApp = payload
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
