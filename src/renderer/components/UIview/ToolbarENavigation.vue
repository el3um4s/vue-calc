<template>
  <div>
  <v-toolbar fixed clipped-left app dense>
    <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
    <v-toolbar-title>Vue Calc</v-toolbar-title>
  </v-toolbar>
  <v-navigation-drawer app fixed clipped v-model="drawer" temporary>
    <v-list two-line>
      <template v-for="(item, index) in items">
        <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>
        <v-divider v-else-if="item.divider" :inset="item.inset" :key="index"></v-divider>
        <v-list-tile v-else :key="item.title" router :to="item.to" @click.stop="">
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      drawer: false
    }
  },
  computed: {
    ...mapGetters('menu', {
      items: 'menuItems'
    })
  }
}
</script>

<style>
</style>
