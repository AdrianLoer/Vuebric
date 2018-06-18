<template>
  <div>
    <f-rect
      v-for="(rect, key) in rects"
      :key="key"
      :tid="key"
      :left="rect.left"
      :top="rect.top" 
      :width="rect.width" 
      :height="rect.height" 
      :objectCaching="false"
      :strokeWidth="2"
      :drawingIndex="100 + rect.drawingIndex"
      :fill="rect.highlighted ? 'rgba(100,140,100,0.9)' : 'rgba(200,240,200,0.5)'"
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

    {{rects}}

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
    rects: {
      default: () => {},
      type: Object
    },
  },
  data() {
    return {
      
    }
  },
  computed: {
		...mapGetters([
      'temporaryCreationRectangleActive'
    ]),
    ...mapGetters({
      canvasTarget: 'canvasTarget',
    }),
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
      'toggleHighlightedRectTid'
    ]),
  },
  mounted() {
    console.log("component mounted")
    // console.log(this.test)
    // Determine the width and height of the renderer wrapper element.
    // var self = this
    // this.EventBus.$on('mouse:down', (e) => {
    //   console.log("mouse:down", e)
    //   const pointer = self.posInCanvas(e)
    //   // console.log(pointer)
    //   self.setTemporaryCreationRectangle({
    //     left: pointer.x,
    //     top: pointer.y,
    //     width: 0,
    //     height: 0,
    //   })
    //   self.startTemporaryRectangleCreation()
    // })

    var self = this
    this.EventBus.$on('mouse:move', (e) => {

      if (self.canvasTarget) {
        self.toggleHighlightedRectTid(self.canvasTarget.tid)
      }

      // console.log("mouse:move", e)
      // const pointer = self.posInCanvas(e)
      // // console.log(pointer)
      // self.setTemporaryCreationRectangle({
      //   left: self.dimensions.left,
      //   top: self.dimensions.top,
      //   width: pointer.x - self.dimensions.left,
      //   height: pointer.y - self.dimensions.top,
      // })
    })

    // this.EventBus.$on('mouse:up', (e) => {
    //   console.log("mouse:up", e)
    //   const pointer = self.posInCanvas(e)
    //   // console.log(pointer)
    //   self.stopTemporaryRectangleCreation()
    // })
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
