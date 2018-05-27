<template>
  <div class="fabric-renderer">
    <!-- <div class="selection-status-header" v-bind:class="{ active: isSelecting }"></div> -->
    <!-- <canvas ref="renderCanvas"></canvas> -->
    <!-- <CRenderContainer :containerElements="canvasElementsRoot"/> -->
    <!-- <f-rect></f-rect> -->
<!--     <f-rect
      :left="selectionBoundingBoxRect.left"
      :top="selectionBoundingBoxRect.top"
      :width="selectionBoundingBoxRect.width"
      :height="selectionBoundingBoxRect.height"
      :fill="selectionBoundingBoxRect.fill"
    >
    </f-rect> -->


    <!-- <f-polyline :points="canvasElements.polyline"></f-polyline> -->
    <slot></slot>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapGetters, mapActions, mapMutations } from 'vuex'
import {fabric} from 'fabric'

import FCanvasMixin from './FCanvasMixin'

// import CRenderContainer from './CRenderContainer'
import FRect from './core/FRect';
import FPolyline from './core/FPolyline';

export default {
  mixins: [FCanvasMixin],
  components: {
    // CRenderContainer,
    FRect,
    FPolyline,
  },
  data() {
    return {
     
    }
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
    ...mapMutations([
      // 'updateSelectionBoundingBox',
      // 'toggleSelectionDrag'
      'addToPolyline'
    ])
  },
  // Allows descendants to inject everything.
  provide() {
    return {
      FabricWrapper: this.FabricWrapper,
      EventBus: this.EventBus
    }
  },

  mounted() {
    console.log("component mounted")
    // this.test()
    // Determine the width and height of the renderer wrapper element.
   

  }
}
</script>

<style scoped>
canvas {
/*  width: 100%;
  height: calc(100% - 40px);*/
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

.fabric-renderer {
  width: 50vw;
  height: 50vh;
  border: 1px solid blue;
}
</style>
