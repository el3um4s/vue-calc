<template>
    <div>
      <app-input-text></app-input-text>
      <app-result></app-result>
      <app-input></app-input>
    </div>
</template>

<script>
// import CalcDisplay from './CalcDisplay/CalcDisplay.vue'
import CalcStandardInput from './CalcInput/CalcStandardInput.vue'
import CalcDisplayInputText from './CalcDisplay/CalcDisplayInputText.vue'
import CalcDisplayResult from './CalcDisplay/CalcDisplayResult.vue'

export default {
  components: {
    // appDisplay: CalcDisplay,
    appInput: CalcStandardInput,
    appInputText: CalcDisplayInputText,
    appResult: CalcDisplayResult
  }
}
</script>

<style scoped>
  div {
    width: 100%;
    height: 100%;
  }
</style>
