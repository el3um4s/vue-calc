const state = {
  dark: false,
  version: '0.18.04.04'
}

const getters = {
  versionNumber (state) {
    return state.version
  },
  darkTheme (state) {
    return state.dark
  }
}

const mutations = {
  cambiaTema (state, payload) {
    state.dark = payload
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
