<template>
<div id="app">
  <v-app :dark="dark">
    <v-toolbar fixed clipped-left app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Vue Calc</v-toolbar-title>
    </v-toolbar>
    <v-navigation-drawer fixed clipped app v-model="drawer">
      <v-list two-line>
        <template v-for="(item, index) in items">
          <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>
          <v-divider v-else-if="item.divider" :inset="item.inset" :key="index"></v-divider>
          <v-list-tile v-else :key="item.title" @click="">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <!-- <router-view></router-view> -->
    <v-divider></v-divider>
    <v-footer class="pa-3" app>
      <div>versione 0.0.1</div>
      <v-spacer></v-spacer>
      <div>&copy; {{ new Date().getFullYear() }}</div>
    </v-footer>

  </v-app>
</div>
</template>

<script>
export default {
  name: 'vue-calc',
  data () {
    return {
      dark: false,
      drawer: false,
      items: [
        // {
        //   header: 'Formato'
        // },
        { title: 'Standard',
          subtitle: 'Operazioni fondamentali',
          icon: 'mdi-calculator'
        },
        { title: 'Scientifica',
          subtitle: 'Funzioni avanzate',
          icon: 'mdi-laptop'
        },
        { title: 'Date',
          subtitle: 'Calcola la distanza tra due date',
          icon: 'mdi-calendar-range'
        },
        {
          divider: true
        },
        {
          title: 'Impostazioni',
          subtitle: 'Scegli il tema',
          icon: 'mdi-settings'
        }
      ]
    }
  }
}
</script>

<style>
/* @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'); */

/* @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700'); */

@import url('~@/assets/fonts/fontRoboto.css');
@import url('~@/assets/fonts/materialIcons.css');
/* Global CSS */
</style>
