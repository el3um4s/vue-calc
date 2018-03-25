const state = {
  drawer: false,
  version: '0.18.03.25',
  items: [
    // {
    //   header: 'Formato'
    // },
    { title: 'Standard',
      subtitle: 'Operazioni fondamentali',
      icon: 'mdi-calculator',
      to: 'simple'
    },
    // { title: 'Date',
    //   subtitle: 'Calcola la distanza tra due date',
    //   icon: 'mdi-calendar-range',
    //   to: 'date'
    // },
    {
      divider: true
    },
    {
      title: 'Impostazioni',
      subtitle: 'Scegli tema, formato, decimali',
      icon: 'mdi-settings',
      to: 'settings'
    },
    {
      title: 'Informazioni',
      icon: 'mdi-information-variant',
      to: 'informazioni'
    }
  ]
}

const getters = {
  drawerVisible (state) {
    return state.drawer
  },
  versionNumber (state) {
    return state.version
  },
  menuItems (state) {
    return state.items
  }
}

const mutations = {
  drawerToggle (state) {
    state.drawer = !state.drawer
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
