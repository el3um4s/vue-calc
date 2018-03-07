<template>
  <v-toolbar fixed clipped-left app>
    <v-toolbar-side-icon @click.stop="drawerToggle"></v-toolbar-side-icon>
    <v-toolbar-title>Vue Calc</v-toolbar-title>
  </v-toolbar>
</template>

<script>
import { mapMutations } from 'vuex'

// export default {
//   methods: {
//     drawerToggle () {
//       this.$store.commit('drawerToggle')
//     }
//   }
// }

export default {
  methods: {
    ...mapMutations({
      drawerToggle: 'drawerToggle'
    })
    // prova () {
    //   console.log('prima del click: ' + this.$store.state.menu.drawer)
    //   this.drawerToggle()
    //   console.log('dopo click: ' + this.$store.state.menu.drawer)
    // }
  }
}
</script>

<style>
</style>
