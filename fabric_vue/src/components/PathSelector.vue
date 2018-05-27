<template>
  <div>
    <f-polyline :points="canvasElements.polyline"></f-polyline>
    <f-rect :left="canvasElements.polyline[canvasElements.polyline.length - 1].x" :top="canvasElements.polyline[canvasElements.polyline.length - 1].y"></f-rect>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapGetters, mapActions, mapMutations } from 'vuex'
import {fabric} from 'fabric'

import FRect from '../VueF/components/core/FRect';
import FPolyline from '../VueF/components/core/FPolyline';

export default {
  inject: ['EventBus', 'FabricWrapper'],
  components: {
    FPolyline,
    FRect
  },
  data() {
    return {
     
    }
  },
  computed: {
		...mapGetters([
          'canvasElements'
	    ])
	},
  methods: {
    ...mapMutations([
      'addToPolyline'
    ]),
    getPointer: function(event) {
      return this.FabricWrapper.fabricApp.getPointer(event)
    }
  },
  mounted() {
    console.log("component mounted")
    // this.test()
    // Determine the width and height of the renderer wrapper element.
   
    this.EventBus.$on('mouse:down', (event) => {
      console.log('mouse down on canvas ', event)
      this.addToPolyline(this.getPointer(event.e))
    })
  },
}
</script>

<style scoped>
canvas {
  width: 100%;
  height: calc(100% - 40px);
}

.selection-status-header {
  height: 40px;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: purple;
}

.selection-status-header.active {
  background-color: red;
}
</style>
