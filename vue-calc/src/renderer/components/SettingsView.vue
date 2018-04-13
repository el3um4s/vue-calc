<template>
  <v-list>
    <v-list-tile>
      <v-subheader>
        <format-message
            path="impostazioni.formato"
            default-message="Formato Numero"
        ></format-message>
      </v-subheader>
      <v-select
          :items="elencoFormatoDeiNumeri"
          v-model="formatoNumeroSelezionato"
          class="input-group"
          @input="aggiornaFormatoNumero"
          ></v-select>
    </v-list-tile>
    <v-list-tile>
      <v-subheader>
        <format-message
            path="impostazioni.posizioniDecimali"
            default-message="Decimali"
        ></format-message>
      </v-subheader>
      <v-text-field
          type="number"
          name="posizioniDecimali"
          id="testing"
          min="0"
          max="10"
          v-model="posizioniDecimali"
          @input="aggiornaPosizioniDecimali">
        </v-text-field>
    </v-list-tile>
    <v-list-tile>
      <v-subheader>
        <format-message
            path="impostazioni.tema"
            default-message="Tema"
        ></format-message>
      </v-subheader>
      <v-select
          :items="elencoTemi"
          v-model="temaSelezionato"
          class="input-group"
          @input="aggiornaTema"
          ></v-select>
    </v-list-tile>
    <v-list-tile>
      <v-subheader>
        <format-message
            path="impostazioni.lingua"
            default-message="Lingua"
        ></format-message>
      </v-subheader>
      <v-select
          :items="elencoLingueApp"
          v-model="linguaAppSelezionata"
          class="input-group"
          @input="aggiornaLinguaApp"
          ></v-select>
    </v-list-tile>
  </v-list>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
const Impostazioni = require('electron-store')
const impostazioni = new Impostazioni()

export default {
  data () {
    return {
      posizioniDecimali: 0,
      formatoNumeroSelezionato: 'it-IT',
      elencoFormatoDeiNumeri: [],
      elencoTemi: ['Light', 'Dark'],
      temaSelezionato: 'dark',
      linguaAppSelezionata: 'Italiano',
      elencoLingueApp: ['Italiano', 'English']
    }
  },
  computed: {
    ...mapGetters('calculus', {
      getFormatoNumero: 'getFormatoNumero',
      getPosizioniDecimali: 'getPosizioniDecimali'
    }),
    ...mapGetters('impostazioni', {
      getDarkTheme: 'darkTheme',
      getLinguaApp: 'linguaApp',
      getLinguaSistema: 'linguaSistema'
    })
  },
  methods: {
    ...mapMutations('calculus', {
      cambiaFormatoNumero: 'cambiaFormatoNumero',
      cambiaNumeroDecimali: 'cambiaNumeroDecimali'
    }),
    ...mapMutations('impostazioni', {
      cambiaTema: 'cambiaTema',
      cambiaLingua: 'cambiaLingua'
    }),
    aggiornaFormatoNumero () {
      this.cambiaFormatoNumero(this.formatoNumeroSelezionato)
      impostazioni.set('settings.formatNumber', this.formatoNumeroSelezionato)
    },
    aggiornaPosizioniDecimali () {
      this.cambiaNumeroDecimali(this.posizioniDecimali)
      impostazioni.set('settings.decimalPlaces', this.posizioniDecimali)
    },
    aggiornaTema () {
      this.cambiaTema(this.temaSelezionato === 'Dark')
      impostazioni.set('settings.temaDark', this.temaSelezionato === 'Dark')
    },
    aggiornaLinguaApp () {
      this.cambiaLingua(this.linguaAppSelezionata)
      impostazioni.set('settings.linguaApp', this.linguaAppSelezionata)
      this.$inter.setCurrentLocale(this.linguaAppSelezionata)
    }
  },
  mounted () {
    this.posizioniDecimali = this.getPosizioniDecimali
    this.formatoNumeroSelezionato = this.getFormatoNumero
    this.linguaAppSelezionata = this.getLinguaApp
    this.temaSelezionato = this.getDarkTheme ? 'Dark' : 'Light'
  },
  created () {
    this.elencoFormatoDeiNumeri = ['it-IT', 'it-CH', 'en-GB', 'en-US', 'fr-FR', 'fr-CA', 'de-DE', 'pt-PT', 'pt-BR', 'es-ES', this.getLinguaSistema].filter(function (value, index, array) { return array.indexOf(value) === index })
  }
}
</script>

<style scoped>
</style>
