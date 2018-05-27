<template>
  <div id="app">
    <!-- <f-canvas @c-click="addPointToPolygon"> -->
    <f-canvas>
      <path-selector></path-selector>
    </f-canvas>
  </div>
</template>

<script>

import { mapGetters, mapActions, mapMutations } from 'vuex'

import FCanvas from './VueF/components/FCanvas'
import PathSelector from './components/PathSelector';

export default {
  name: 'app',
  components: {
    FCanvas,
    PathSelector
  },
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
