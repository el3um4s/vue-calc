<template>
  <v-list>
    <v-list-tile>
      <v-subheader>Formato</v-subheader>
      <v-select
          :items="elencoLingue"
          v-model="linguaSelezionata"
          class="input-group--focused"
          @input="aggiornaFormatoNumero"
          ></v-select>
    </v-list-tile>
    <v-list-tile>
      <v-subheader>Posizioni decimali</v-subheader>
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
      <v-subheader>Tema</v-subheader>
      <v-select
          :items="elencoTemi"
          v-model="temaSelezionato"
          class="input-group--focused"
          @input="aggiornaTema"
          ></v-select>
    </v-list-tile>
  </v-list>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  data () {
    return {
      posizioniDecimali: 0,
      linguaSelezionata: 'it-IT',
      elencoLingue: ['it-IT', 'it-CH', 'en-GB', 'en-US', 'fr-FR', 'fr-CA', 'de-DE', 'pt-PT', 'pt-BR', 'es-ES'],
      elencoTemi: ['chiaro', 'dark'],
      temaSelezionato: 'chiaro'
    }
  },
  computed: {
    ...mapGetters('calculus', {
      getFormatoNumero: 'getFormatoNumero',
      getPosizioniDecimali: 'getPosizioniDecimali'
    })
  },
  methods: {
    ...mapMutations('calculus', {
      cambiaFormatoNumero: 'cambiaFormatoNumero',
      cambiaNumeroDecimali: 'cambiaNumeroDecimali'
    }),
    aggiornaFormatoNumero () {
      this.cambiaFormatoNumero(this.linguaSelezionata)
    },
    aggiornaPosizioniDecimali () {
      this.cambiaNumeroDecimali(this.posizioniDecimali)
    },
    aggiornaTema () {
      const tema = this.temaSelezionato
      switch (tema) {
        case 'chiaro':
          break
        default:
          break
      }
    }
  },
  mounted () {
    this.posizioniDecimali = this.getPosizioniDecimali
    this.linguaSelezionata = this.getFormatoNumero
  }
}
</script>

<style scoped>
</style>
