<template>
  <div>
    <!-- <f-polyline :points="canvasElements.polyline"></f-polyline> -->
    <!-- <f-rect :left="canvasElements.polyline[canvasElements.polyline.length - 1].x" :top="canvasElements.polyline[canvasElements.polyline.length - 1].y"></f-rect> -->
    <!-- <f-circle :left="canvasElements.polyline[canvasElements.polyline.length - 1].x" :top="canvasElements.polyline[canvasElements.polyline.length - 1].y"></f-circle> -->
    <f-circle
      v-for="(node, index) in canvasElements.clickedLocations"
      :id="`node-${index}`"
      @mouseMove="checkAndMoveNode(node, ...arguments)"
      :left="node.x" 
      :top="node.y" 
      :drawingIndex="renderPosition.counters['nodes']"
      ></f-circle>

    <f-line
      v-for="segment in lineSegments" 
      :id="'edge'"
      :lineCoords="segment" 
      :drawingIndex="renderPosition.counters['edges']"
      ></f-line>

      <div class="debug">
        <button @click="updateRenderOrder">reverse render order</button>
        <!-- {{renderPosition.counters}} -->
        <p>dragging node {{draggableNodeIndex}}</p>
      </div>

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
      draggableNodeIndex: undefined,
    }
  },
  computed: {
		...mapGetters([
          'canvasElements',
          'renderPosition',
          'renderCounter'
	    ]),
    lineSegments: function() {
      let segments = [];
      for (let i = 0; i < this.canvasElements.clickedLocations.length - 1; i++) {
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
      'reverseRenderOrder',
      'moveNode'
    ]),
    ...mapActions([
      'updateRenderOrder'
    ]),
    getPointer: function(event) {
      return this.FabricWrapper.fabricApp.getPointer(event)
    },
    // I guess all of this should be done with canvas events
    // just much easier to do it ourself
    checkAndMoveNode: function(node, event) {
      // console.log("checkAndMoveNode", node)
      // console.log("checkAndMoveNode", event)
    }
  },
  mounted() {
    console.log("component mounted")
    this.updateRenderOrder()
    // this.test()
    // Determine the width and height of the renderer wrapper element.
   
    this.EventBus.$on('mouse:down', (event) => {
      console.log('mouse down on canvas ', event)
      if (event && event.target && event.target.id && event.target.id.indexOf("node") > -1) {
        this.draggableNodeIndex = event.target.id.split('node-')[1];
      } else if (event && event.target && event.target.id && event.target.id.indexOf("edge") > -1) {
        console.log('clicked on vertex')
      } else {
        this.addToPolyline(this.getPointer(event.e))
      }
    })

    this.EventBus.$on('mouse:move', (event) => {
      if (this.draggableNodeIndex) {
        const pointer = this.getPointer(event.e)
        this.moveNode({index: this.draggableNodeIndex, pointer: pointer})
      }
    })

    this.EventBus.$on('mouse:up', (event) => {
      this.draggableNodeIndex = undefined;
    })
  },
}
</script>

<style scoped>
canvas {
  width: 100%;
  height: calc(100% - 40px);
}

.debug {
  position: absolute;
  /*top: 0;*/

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
