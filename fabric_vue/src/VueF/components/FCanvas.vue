<template>
  <div class="fabric-renderer">
    <slot></slot>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapGetters, mapActions, mapMutations } from 'vuex'
import {fabric} from 'fabric'

import SceneContainerLayerMixin from '../../components/SceneContainerLayerMixin'
import FCanvasController from './FCanvasController'

import FCanvasMixin from './FCanvasMixin'

// import CRenderContainer from './CRenderContainer'
import FRect from './core/FRect';
import FPolyline from './core/FPolyline';

export default {
  mixins: [FCanvasMixin, SceneContainerLayerMixin],
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
    ]),
    mousemove: function(event) {
      console.log("event canvas ", event)
    }
  },
  // Allows descendants to inject everything.
  provide() {
    return {
      FabricWrapper: this.FabricWrapper,
      // EventBus: this.EventBus
    }
  },

  mounted() {
    console.log("component mounted")
    // this.test()
    // Determine the width and height of the renderer wrapper element.
    console.log(this.FabricWrapper.fabricApp)
    this.controller = new FCanvasController(this.FabricWrapper.fabricApp)

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
  /*border: 1px solid blue;*/
}
</style>
