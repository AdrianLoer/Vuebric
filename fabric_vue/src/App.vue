<template>
  <div id="app">
    <!-- <f-canvas @c-click="addPointToPolygon"> -->
    <!-- <f-canvas :copycss="true"> -->
      <!-- <path-selector></path-selector> -->
      <!-- <bounding-box-selector></bounding-box-selector> -->
    <!-- </f-canvas> -->
<!--     <f-canvas :copycss="true">
      <path-selector></path-selector>
    </f-canvas> -->
    <scene-container></scene-container>
  </div>
</template>

<script>

import { mapGetters, mapActions, mapMutations } from 'vuex'

import SceneContainer from './components/SceneContainer'


// import FCanvas from './VueF/components/FCanvas'
// import PathSelector from './components/PathSelector';

export default {
  name: 'app',
  components: {
    // FCanvas,
    // PathSelector
    SceneContainer
  },
}
</script>

<style>
body {
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}


</style>
