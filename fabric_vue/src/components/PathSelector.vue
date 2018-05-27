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

      <f-line
      v-for="segment in sortedDistances"
      :lineCoords="segment"
      :stroke="'red'"
      :drawingIndex="renderPosition.counters['debug-lines']"
      >
      </f-line>

      <div class="debug">
        <button @click="updateRenderOrder">reverse render order</button>
        <!-- {{renderPosition.counters}} -->
        <p>dragging node {{draggableNodeIndex}}</p>
        {{sortedDistances}}
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
      calculatedDistances: []
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
    },
    sortedDistances: function() {
      const sorted = this.calculatedDistances.sort(function(a, b) {
        return a.dist - b.dist;
      })
      return sorted.map((item) => {return [item.x1, item.y1, item.x2, item.y2]}).slice(0, 10)
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
    },
    calculateDistances: function(pointer) {
      let r = []
      for (let i = 0; i < this.lineSegments.length; i++) {
        const seg = this.lineSegments[i];
        const dist = this.pDistance(pointer.x, pointer.y, seg[0], seg[1], seg[2], seg[3])
        r.push(dist)
      }
      return r;
    },
    pDistance: function(x, y, x1, y1, x2, y2) {

      var A = x - x1;
      var B = y - y1;
      var C = x2 - x1;
      var D = y2 - y1;

      var dot = A * C + B * D;
      var len_sq = C * C + D * D;
      var param = -1;
      if (len_sq != 0)
          param = dot / len_sq;

      var xx, yy;

      if (param < 0) {
        xx = x1;
        yy = y1;
      }
      else if (param > 1) {
        xx = x2;
        yy = y2;
      }
      else {
        xx = x1 + param * C;
        yy = y1 + param * D;
      }

      var dx = x - xx;
      var dy = y - yy;

      return {
        dist: Math.sqrt(dx * dx + dy * dy),
        x1: x,
        y1: y,
        x2: x - dx,
        y2: y - dy
      }
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
        // const this.calculateDistances(this.getPointer(event.e))
      } else {
        this.addToPolyline(this.getPointer(event.e))
      }
    })

    this.EventBus.$on('mouse:move', (event) => {
      if (this.draggableNodeIndex) {
        const pointer = this.getPointer(event.e)
        this.moveNode({index: this.draggableNodeIndex, pointer: pointer})
      } else {
        this.calculatedDistances = this.calculateDistances(this.getPointer(event.e))

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
  /*position: absolute;*/
  /*top: 0;*/
  height: 100px;
  background-color: yellow;
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
