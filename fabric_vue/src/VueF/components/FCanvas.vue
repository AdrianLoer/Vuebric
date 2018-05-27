<template>
  <div class="fabric-renderer">
    <!-- <div class="selection-status-header" v-bind:class="{ active: isSelecting }"></div> -->
    <canvas ref="renderCanvas"></canvas>
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


    <f-polyline :points="canvasElements.polyline"></f-polyline>
    <slot></slot>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapGetters, mapActions, mapMutations } from 'vuex'
import {fabric} from 'fabric'
// import CRenderContainer from './CRenderContainer'
import FRect from './core/FRect';
import FPolyline from './core/FPolyline';

export default {
  components: {
    // CRenderContainer,
    FRect,
    FPolyline,
  },
  data() {
    return {
      // These need to be contained in an object because providers are not reactive.
      FabricWrapper: {
        fabricApp: null,
        ready: false,
      },
      // used for ready events
      EventBus: new Vue(),
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
    // this.test()
    // Determine the width and height of the renderer wrapper element.
    const renderCanvas = this.$refs.renderCanvas;
    const w = renderCanvas.offsetWidth;
    const h = renderCanvas.offsetHeight;

    // Create a new PIXI app.
    this.FabricWrapper.fabricApp = new fabric.Canvas(renderCanvas, {
      renderOnAddRemove: false,
      selection: false
    })

    // function m
    this.FabricWrapper.fabricApp.setHeight(800);
    this.FabricWrapper.fabricApp.setWidth(1200);
    this.maxx = this.FabricWrapper.fabricApp.width;
    this.maxy = this.FabricWrapper.fabricApp.height;


    var self = this;
    animate()
    function animate() {
      fabric.util.requestAnimFrame(animate);
      self.FabricWrapper.fabricApp.renderAll();
    }

    self.FabricWrapper.fabricApp.renderAll();

    //
    // new PIXI.Application(w, h, {
    //   view: renderCanvas,
    //   backgroundColor: 0x1099bb
    // });
    this.EventBus.$emit('ready');
    this.FabricWrapper.ready = true;

  }
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
