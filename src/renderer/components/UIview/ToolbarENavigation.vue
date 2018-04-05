<template>
  <div>
  <v-toolbar fixed clipped-left app dense class="titlebar">
    <v-toolbar-side-icon @click.stop="drawer = !drawer" class="cliccabile"></v-toolbar-side-icon>
    <v-toolbar-title>Vue Calc</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon class="cliccabile puntatore" @click.stop="minimizza">
      <v-icon>mdi-window-minimize</v-icon>
    </v-btn>
    <v-btn icon class="cliccabile puntatore" @click.stop="chiudi">
      <v-icon>mdi-window-close</v-icon>
    </v-btn>
  </v-toolbar>
  <v-navigation-drawer app fixed clipped v-model="drawer" temporary>
    <v-list two-line>
      <template v-for="(item, index) in items">
        <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>
        <v-divider v-else-if="item.divider" :inset="item.inset" :key="index"></v-divider>
        <v-list-tile v-else :key="item.title" router :to="item.to" @click.stop="drawer = !drawer">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              <format-message
                  :path="item.path"
			            :default-message="item.title"
              ></format-message>
            </v-list-tile-title>
            <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </v-navigation-drawer>
  </div>
</template>

<script>
const remote = require('electron').remote

export default {
  data () {
    return {
      drawer: false,
      items: [
        {
          path: 'toolbar.standard',
          title: 'Standard',
          icon: 'mdi-calculator',
          to: 'simple'
        },
        {
          divider: true
        },
        {
          path: 'toolbar.impostazioni',
          title: 'Impostazioni',
          icon: 'mdi-settings',
          to: 'settings'
        },
        {
          path: 'toolbar.informazioni',
          title: 'Informazioni',
          icon: 'mdi-information-variant',
          to: 'informazioni'
        }
      ]
    }
  },
  methods: {
    minimizza () {
      const window = remote.getCurrentWindow()
      window.minimize()
    },
    chiudi () {
      const window = remote.getCurrentWindow()
      window.close()
    }
  }
}
</script>

<style scoped>

.titlebar {
  -webkit-user-select: none;
  -webkit-app-region: drag;
}

.cliccabile {
  -webkit-app-region: no-drag;
}

.puntatore {
  cursor: pointer;
}

</style>
