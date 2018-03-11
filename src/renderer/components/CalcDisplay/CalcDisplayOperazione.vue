<template>
<v-flex class="operazione" v-show="top>10">
  <slot></slot>
</v-flex>
</template>

<script>
export default {
  data () {
    return {
      top: 20
    }
  },
  mounted () {
    this.top = this.$el.offsetTop
  },
  updated () {
    this.top = this.$el.offsetTop
  }
}
</script>

<style scoped>
.operazione {
  text-align: right;
  word-wrap: break-word;
  font-size: 3vh;
}
</style>
