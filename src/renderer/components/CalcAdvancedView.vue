<template>
    <div>
      <app-display></app-display>
      <app-memory></app-memory>
      <app-input></app-input>
    </div>
</template>

<script>
import CalcDisplay from './CalcGeneral/CalcDisplay.vue'
import CalcMemory from './CalcGeneral/CalcMemory.vue'
import CalcAdvancedInput from './CalcInput/CalcAdvancedInput.vue'

export default {
  components: {
    appDisplay: CalcDisplay,
    appMemory: CalcMemory,
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
