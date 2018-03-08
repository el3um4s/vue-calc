<template>
    <div>
      <app-display></app-display>
      <app-memory></app-memory>
      <app-input></app-input>
    </div>
</template>

<script>
import CalcStandardDisplay from './CalcStandard/CalcStandardDisplay.vue'
import CalcStandardMemory from './CalcStandard/CalcStandardMemory.vue'
import CalcStandardInput from './CalcStandard/CalcStandardInput.vue'

export default {
  components: {
    appDisplay: CalcStandardDisplay,
    appMemory: CalcStandardMemory,
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
