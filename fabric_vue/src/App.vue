<template>
  <div id="app">
    <f-canvas/>
  </div>
</template>

<script>
import FCanvas from './VueF/components/FCanvas.vue'

export default {
  name: 'app',
  components: {
    FCanvas
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
