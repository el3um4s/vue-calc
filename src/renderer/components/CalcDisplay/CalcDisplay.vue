<template>
  <div class="display">
    <div class="valoriInseriti">
      <p>1</p>
      <p>2</p>
      <p>3</p>
      <p>4</p>
      <p>5</p>
    </div>
    <div class="risultatoInGrande">9.999.999.999.999.999</div>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
.display {
  position: relative;
  max-height: 30%;
  font-family: 'Mina', sans-serif;
}

.risultatoInGrande {
  max-height: 28%;
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 1%;
  text-align: right;
  font-weight: bold;
  font-size: 4vh;

}
.valoriInseriti {
  background-color: yellow;
  max-height: 72%;
}
div {
  /* width: 100%; */
  /* max-height: 30%; */
  /* background-color: green; */
}
</style>
