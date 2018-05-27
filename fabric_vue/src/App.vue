<template>
  <div id="app">
    <f-canvas @c-click="test">
      <f-polyline :points="canvasElements.polyline"></f-polyline>
    </f-canvas>
  </div>
</template>

<script>

import { mapGetters, mapActions, mapMutations } from 'vuex'

import FCanvas from './VueF/components/FCanvas'
import FPolyline from './VueF/components/core/FPolyline';

export default {
  name: 'app',
  components: {
    FCanvas,
    FPolyline
  },
  computed: {
  ...mapGetters([
        // 'selectionBoundingBoxRect',
        // 'isSelecting',
        // 'canvasElementsRoot'
        'canvasElements'
    ])
  },
  methods: {
    test: function(opts) {
      console.log("test", opts)
    }
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
