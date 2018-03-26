<template>
  <v-container class="infosview">
    <v-card>
      <v-card-text>
        <span class="title">Vue Calc</span>
        <br />
        <span class="subheading">A Simple VueJS's Calculator</span>
        <br /><br />
        <span class="body-1">version <strong>{{ versionNumber }}</strong></span>
        <br />
        <span class="body-1">license <strong>MIT</strong>  &copy; 2017-{{ new Date().getFullYear() }} - Samuele de Tomasi</span>
      </v-card-text>
    </v-card>
    <v-card>
      <v-card-text>
        <span class="body-1"><strong>GitHub</strong>: <span class="openLink" @click.prevent="openLink('https://github.com/el3um4s/vue-calc')">el3um4s/vue-calc</span></span>
      </v-card-text>
    </v-card>
    <v-card>
      <v-card-text>
        <span class="body-1"><strong>Created with:</strong></span>
        <div class="elenco">
          <li class="itemInElenco openLink" @click.prevent="openLink('https://vuejs.org/')">Vue.js</li>
          <li class="itemInElenco openLink" @click.prevent="openLink('https://vuetifyjs.com/')">Vuetify</li>
          <li class="itemInElenco openLink" @click.prevent="openLink('https://github.com/vuetifyjs/electron')">Electron-vue</li>
          <li class="itemInElenco openLink" @click.prevent="openLink('http://mikemcl.github.io/decimal.js/')">decimal.js</li>
          <li class="itemInElenco openLink" @click.prevent="openLink('https://fonts.google.com/specimen/Roboto')">Google Font Roboto</li>
          <li class="itemInElenco openLink" @click.prevent="openLink('https://fonts.google.com/specimen/Mina')">Google Font Mina</li>
          <li class="itemInElenco openLink" @click.prevent="openLink('https://github.com/Dafrok/v-hotkey')">v-hotkey</li>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import {
  mapGetters
} from 'vuex'

const { shell } = require('electron')

export default {
  computed: {
    ...mapGetters('menu', {
      versionNumber: 'versionNumber'
    })
  },
  methods: {
    openLink (link) {
      shell.openExternal(link)
    }
  }
}
</script>

<style scoped>
  .openLink {
    text-decoration: underline;
    cursor: pointer;
  }
  .itemInElenco {
    padding-left: 16px;
  }
</style>
