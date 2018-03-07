const state = {
  drawer: false,
  version: '0.0.2',
  items: [
    // {
    //   header: 'Formato'
    // },
    { title: 'Standard',
      subtitle: 'Operazioni fondamentali',
      icon: 'mdi-calculator',
      to: 'simple'
    },
    { title: 'Scientifica',
      subtitle: 'Funzioni avanzate',
      icon: 'mdi-laptop',
      to: 'advanced'
    },
    { title: 'Date',
      subtitle: 'Calcola la distanza tra due date',
      icon: 'mdi-calendar-range',
      to: 'date'
    },
    {
      divider: true
    },
    {
      title: 'Impostazioni',
      subtitle: 'Scegli il tema',
      icon: 'mdi-settings',
      to: 'settings'
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
  state,
  getters,
  mutations
}
