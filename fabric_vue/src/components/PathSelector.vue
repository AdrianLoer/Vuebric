<template>
  <div>
    <!-- <f-polyline :points="canvasElements.polyline"></f-polyline> -->
    <!-- <f-rect :left="canvasElements.polyline[canvasElements.polyline.length - 1].x" :top="canvasElements.polyline[canvasElements.polyline.length - 1].y"></f-rect> -->
    <!-- <f-circle :left="canvasElements.polyline[canvasElements.polyline.length - 1].x" :top="canvasElements.polyline[canvasElements.polyline.length - 1].y"></f-circle> -->
    <f-circle
      v-for="node in canvasElements.clickedLocations" 
      :left="node.x" 
      :top="node.y" 
      
      ></f-circle>
      <!-- :drawingIndex="canvasElements.renderOrder.indexOf('nodes')" -->

    <f-line
      v-for="segment in lineSegments" 
      :lineCoords="segment" 
      
      ></f-line>
      <!-- :drawingIndex="canvasElements.renderOrder.indexOf('edges')" -->


      <button @click="reverseRenderOrder">reverse render order</button>

  </div>
</template>

<script>
import Vue from 'vue';
import { mapGetters, mapActions, mapMutations } from 'vuex'
import {fabric} from 'fabric'

// import FRect from '../VueF/components/core/FRect';
import FCircle from '../VueF/components/core/FCircle';
import FLine from '../VueF/components/core/FLine';
import FPolyline from '../VueF/components/core/FPolyline';

export default {
  inject: ['EventBus', 'FabricWrapper'],
  components: {
    FPolyline,
    // FRect,
    FCircle,
    FLine
  },
  data() {
    return {
      
    }
  },
  computed: {
		...mapGetters([
          'canvasElements'
	    ]),
    lineSegments: function() {
      let segments = [];
      for (var i = 0; i < this.canvasElements.clickedLocations.length - 1; i++) {
        segments.push([
          this.canvasElements.clickedLocations[i].x,
          this.canvasElements.clickedLocations[i].y,
          this.canvasElements.clickedLocations[i + 1].x,
          this.canvasElements.clickedLocations[i + 1].y
          ])
      }
      return segments
    }
	},
  methods: {
    ...mapMutations([
      'addToPolyline',
      'reverseRenderOrder'
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
