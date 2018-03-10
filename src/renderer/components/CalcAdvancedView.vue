<template>
    <div>
      <app-display></app-display>
      <app-input></app-input>
    </div>
</template>

<script>
import CalcDisplay from './CalcDisplay/CalcDisplay.vue'
import CalcAdvancedInput from './CalcInput/CalcAdvancedInput.vue'

export default {
  components: {
    appDisplay: CalcDisplay,
    appInput: CalcAdvancedInput
  }
}
</script>

<style scoped>
  div {
    width: 100%;
    height: 100%;
  }
</style>
