import Vue from 'vue'
import Inter from 'vue-inter'

Vue.use(Inter)

export default new Inter({
  locale: 'Italiano',
  messages: {
    English: {
      toolbar: {
        standard: 'Standard',
        impostazioni: 'Settings',
        informazioni: 'Info'
      },
      impostazioni: {
        formato: 'Format',
        posizioniDecimali: 'Decimal Places',
        tema: 'Theme',
        lingua: 'Language'
      }
    }
  }
})
