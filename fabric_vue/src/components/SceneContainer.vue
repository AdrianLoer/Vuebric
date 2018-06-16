<template>
  <div class="scene-container">

    <div-layer :syncDimensions="true" ref="test">
      
    </div-layer>

    <f-canvas :syncDimensions="true" ref="test2">

      <path-selector></path-selector>

    </f-canvas>
 
  </div>
</template>

<script>
import Vue from 'vue';
import { mapGetters, mapActions, mapMutations } from 'vuex'
import FCanvas from '../VueF/components/FCanvas';
import DivLayer from './DivLayer';

import PathSelector from './PathSelector';

export default {
  components: {
    FCanvas,
    DivLayer,
    PathSelector
  },
  data() {
    return {
     
    }
  },
  computed: {
		// ...mapGetters([
          // 'canvasElements'
	    // ])
	},
  methods: {
    // ...mapMutations([
      // 'addToPolyline'
    // ])
  },
  provide() {
    return {
      // FabricWrapper: this.FabricWrapper,
      // EventBus: this.EventBus
    }
  },
  mounted() {
    console.log("scene container mounted", this.$el)
    var self = this
    this.$el.addEventListener('mousemove', function(event) {
      event.stopPropagation()
      console.log("mousemove container", event)
      self.$refs.test.mousemove(event)
      self.$refs.test2.mousemove(event)
    }, true);
  }
}
</script>

<style scoped>
canvas {
/*  width: 100%;
  height: calc(100% - 40px);*/
}


.scene-container {
  width: 50vw;
  height: 50vh;
  border: 10px solid purple;
}
</style>
