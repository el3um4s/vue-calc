const state = {
  dark: false,
  version: '0.18.04.15',
  linguaApp: 'English',
  linguaSistema: 'en'
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
  },
  linguaSistema (state) {
    return state.linguaSistema
  }
}

const mutations = {
  cambiaTema (state, payload) {
    state.dark = payload
  },
  cambiaLingua (state, payload) {
    state.linguaApp = payload
  },
  cambiaLinguaSistema (state, payload) {
    state.linguaSistema = payload
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
