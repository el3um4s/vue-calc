const state = {
  drawer: false,
  version: '0.0.2'
}

const getters = {
  drawerVisible (state) {
    return state.drawer
  },
  versionNumber (state) {
    return state.version
  }
}

const mutations = {
  drawerToggle (state) {
    state.drawer = !state.drawer
  }
}

export default {
  state,
  getters,
  mutations
}
