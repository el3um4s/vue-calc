<template>
    <div>
      <app-display></app-display>
      <app-input></app-input>
    </div>
</template>

<script>
import CalcDisplay from './CalcDisplay/CalcDisplay.vue'
import CalcStandardInput from './CalcInput/CalcStandardInput.vue'

export default {
  components: {
    appDisplay: CalcDisplay,
    appInput: CalcStandardInput
  }
}
</script>

<style scoped>
  div {
    width: 100%;
    height: 100%;
  }
</style>
