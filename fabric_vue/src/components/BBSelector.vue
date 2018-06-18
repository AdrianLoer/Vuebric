<template>
  <div>
    <f-rect 
      :left="dimensions.left" 
      :top="dimensions.top" 
      :width="dimensions.width" 
      :height="dimensions.height" 
      v-if="temporaryCreationRectangleActive" 
      :objectCaching="false"
      :strokeWidth="2"
      :drawingIndex="10000"
      :fill="'rgba(100,140,100,0.5)'"
    ></f-rect>
<!--     <f-circle
      v-for="(node, index) in canvasElements.clickedLocations"
      :id="`node-${index}`"
      @mouseMove="checkAndMoveNode(node, ...arguments)"
      :left="node.x" 
      :top="node.y" 
      :drawingIndex="renderPosition.counters['nodes']"
      >        
    </f-circle>
 -->
<!--     <f-line
      v-for="segment in lineSegments" 
      :id="'edge'"
      :lineCoords="segment.lineCoords" 
      :drawingIndex="renderPosition.counters['edges']"
      >  
    </f-line>
 -->

    {{temporaryCreationRectangleActive}}
    {{dimensions}}

  </div>
</template>

<script>
import Vue from 'vue';
import { mapGetters, mapActions, mapMutations } from 'vuex'
import {fabric} from 'fabric'

import FRect from '../VueF/components/core/FRect';
import FCircle from '../VueF/components/core/FCircle';
import FLine from '../VueF/components/core/FLine';

export default {
  inject: ['EventBus', 'FabricWrapper', 'controllerWrapper'],
  components: {
    FRect,
    FCircle,
    FLine
  },
  props: {
    dimensions: {
      default: undefined,
      type: Object
    },
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
          'renderCounter',
          'test',
          'canvasTarget',
          'temporaryCreationRectangle',
          'temporaryCreationRectangleActive'
	    ]),
    // ...mapGetters({
      // canvasTarget: 'interactionState/canvasTarget',
      // canvasTarget: 'canvasTarget',
    // }),
   
	},
  methods: {
    ...mapMutations([
      'addToPolyline',
      'insertToPolyline',
      'reverseRenderOrder',
      'moveNode',
      'setTemporaryCreationRectangle',
      'startTemporaryRectangleCreation',
      'stopTemporaryRectangleCreation',
      'addRect'
    ]),
    ...mapActions([
    ]),
    posInCanvas: function(event) {
      return this.controllerWrapper.controller.posInCanvas(event)
    },

  },
  mounted() {
    console.log("component mounted")
    // console.log(this.test)
    // Determine the width and height of the renderer wrapper element.
    var self = this
    this.EventBus.$on('mouse:down', (e) => {
      const pointer = self.posInCanvas(e)
      // console.log(pointer)
      self.setTemporaryCreationRectangle({
        left: pointer.x,
        top: pointer.y,
        width: 0,
        height: 0,
      })
      self.startTemporaryRectangleCreation()
    })

    this.EventBus.$on('mouse:move', (e) => {
      // console.log("mouse:move", e)
      const pointer = self.posInCanvas(e)
      // console.log(pointer)
      self.setTemporaryCreationRectangle({
        left: self.dimensions.left,
        top: self.dimensions.top,
        width: pointer.x - self.dimensions.left,
        height: pointer.y - self.dimensions.top,
      })
    })

    this.EventBus.$on('mouse:up', (e) => {
      const pointer = self.posInCanvas(e)
      // console.log(pointer)
      self.stopTemporaryRectangleCreation()
      self.addRect(self.temporaryCreationRectangle)
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
