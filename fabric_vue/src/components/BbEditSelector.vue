<template>
  <div>
<!--     <f-rect 
      v-for="(rect, index) in rects"
      :left="rect.left" 
      :top="rect.top" 
      :width="rect.width" 
      :height="rect.height" 
      :objectCaching="false"
      :strokeWidth="2"
      :drawingIndex="100 + index"
      :fill="'rgba(200,240,200,0.5)'"
    ></f-rect> -->
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
    <f-line
      v-for="(line, index) in handlerLines[0].lineCoords"
      :tid="'handle-line-' + index + '-' + handlerLines[0].rectTid"
      :lineCoords="line"
      :strokeWidth="30"
      :drawingIndex="1000"
      :stroke="'rgba(0,0,0,0.01)'"
      >  
    </f-line>

    <!-- {{handlerLines}} -->

    <!-- {{currentlyEditedRect}} -->
    <div class="overlay">
      rectToResize: {{rectToResize}}
      <br/>
      rectSideToResize: {{rectSideToResize}}
    </div>
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
      prevPointer: {}
    }
  },
  computed: {
		...mapGetters([
        'temporaryCreationRectangleActive',
        'rectToResize',
        'rectSideToResize',
	    ]),
    ...mapGetters({
      canvasTarget: 'canvasTarget',
    }),
    handlerLines: function() {
      const lines = []

      for (var key in this.rects) {
        if (this.rects.hasOwnProperty(key)) {
      // for (var i = 0; i < this.rects.length; i++) {
          const newLines = [
            [
              this.rects[key].left,
              this.rects[key].top,
              this.rects[key].left + this.rects[key].width,
              this.rects[key].top,
            ],
            [
              this.rects[key].left + this.rects[key].width,
              this.rects[key].top,
              this.rects[key].left + this.rects[key].width,
              this.rects[key].top + this.rects[key].height,
            ],
            [
              this.rects[key].left + this.rects[key].width,
              this.rects[key].top + this.rects[key].height,
              this.rects[key].left,
              this.rects[key].top + this.rects[key].height,
            ],
            [
              this.rects[key].left,
              this.rects[key].top + this.rects[key].height,
              this.rects[key].left,
              this.rects[key].top,
            ],
          ]
          lines.push({lineCoords: newLines, rectTid: key})
        }
      }
      console.log(lines)
      return lines
    }
   
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
      'resizeRect',
      'setRectToResize',
      'setRectSideToResize',
      'unsetRectToResize',
      'unsetRectSideToResize',
    ]),
    posInCanvas: function(event) {
      return this.controllerWrapper.controller.posInCanvas(event)
    },
    getRectAndDirectionToChange(targetLineTid) {
      const parts = targetLineTid.split('-')

      const directions = {
        0: 'up',
        1: 'right',
        2: 'down',
        3: 'left'
      }

      const direction = directions[parts[2]]
      const targetRect = parts[3]
      return {targetRect: targetRect, direction: direction}
    },
  },
  mounted() {
    let self = this
    this.EventBus.$on('mouse:down', (e) => {
      const pointer = self.posInCanvas(e)
      // console.log(pointer)
      // self.setTemporaryCreationRectangle({
      //   left: pointer.x,
      //   top: pointer.y,
      //   width: 0,
      //   height: 0,
      // })
      // self.startTemporaryRectangleCreation()

      const change = self.getRectAndDirectionToChange(self.canvasTarget.tid)
      // self.currentlyEditedRect = change
      self.setRectToResize(change.targetRect)
      self.setRectSideToResize(change.direction)
      self.prevPointer = pointer
    })

    this.EventBus.$on('mouse:move', (e) => {
      if (self.rectToResize) {

        const pointer = self.posInCanvas(e)
        const pointerDiff = {
          x: pointer.x - self.prevPointer.x,
          y: pointer.y - self.prevPointer.y,
        }
        console.log(pointerDiff)
        self.prevPointer = pointer
        // const change = self.getRectAndDirectionToChange(self.canvasTarget.tid)
        let changeDiff = 0
        switch(self.rectSideToResize) {
          case 'up':
            changeDiff = self.rectToResize.top + pointerDiff.y
            break;
          case 'right':
            changeDiff = self.rectToResize.width + pointerDiff.x
            break;
          case 'down':
            changeDiff = self.rectToResize.height + pointerDiff.y
            break;
          case 'left':
            changeDiff = self.rectToResize.left + pointerDiff.y
            break;
        }
        console.log(changeDiff)
        self.resizeRect(changeDiff)
        // console.log("mouse:move", e)
        // console.log(pointer)
        // self.setTemporaryCreationRectangle({
        //   left: self.dimensions.left,
        //   top: self.dimensions.top,
        //   width: pointer.x - self.dimensions.left,
        //   height: pointer.y - self.dimensions.top,
        // })
      }
    })

    this.EventBus.$on('mouse:up', (e) => {
      console.log('mouseup')
      // const pointer = self.posInCanvas(e)
      // console.log(pointer)
      // self.stopTemporaryRectangleCreation()
      // self.addRect(self.temporaryCreationRectangle)
      self.unsetRectToResize()
      self.unsetRectSideToResize()
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

.overlay {
  position: absolute;
}
</style>
