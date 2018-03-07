<template>
  <!-- <v-navigation-drawer app fixed clipped v-model="drawer"> -->
  <v-navigation-drawer app clipped :permanent="drawerVisible" :hide-overlay="drawerVisible" :value="drawerVisible">
    <v-list two-line>
      <template v-for="(item, index) in items">
        <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>
        <v-divider v-else-if="item.divider" :inset="item.inset" :key="index"></v-divider>
        <v-list-tile v-else :key="item.title" router :to="item.to" @click.stop="drawerToggle">
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

</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  data () {
    return {
      hideOverlay: false,
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
  },
  computed: {
    ...mapGetters({
      drawerVisible: 'drawerVisible'
    })
  },
  methods: {
    ...mapMutations({
      drawerToggle: 'drawerToggle'
    })
  }
}
</script>

<style>
</style>
