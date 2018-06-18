<template>
  <div class="scene-container">
<!-- 
    <div-layer :syncDimensions="true" ref="test">
      
    </div-layer> -->

    <f-canvas :syncDimensions="true" ref="canvasLayer">

      <!-- <path-selector :interaction-enabled="true"></path-selector> -->
      <bb-selector :dimensions="temporaryCreationRectangle"></bb-selector>

    </f-canvas>
 
  </div>
</template>

<script>
import Vue from 'vue';
import { mapGetters, mapActions, mapMutations } from 'vuex'

import FCanvas from '../VueF/components/FCanvas';
import DivLayer from './DivLayer';

import PathSelector from './PathSelector';
import BbSelector from './BBSelector';

import CreateBoxController from '../sceneInteraction/CreateBoxController'

export default {
  components: {
    FCanvas,
    DivLayer,
    PathSelector,
    BbSelector
  },
  data() {
    return {
     interactionControllers: [],
     EventBus: new Vue()
    }
  },
  computed: {
		...mapGetters([
          'temporaryCreationRectangle'
	    ])
	},
  mounted() {
    console.log("scene container mounted", this.$el)
    var self = this
    this.$el.addEventListener('mousedown', function(event) {
      event.stopPropagation()
      const target = self.findTargetForCanvas(event)
      self.setTarget(target)
      self.EventBus.$emit('mouse:down', event)
      // console.log("mousedown container", event)
      // self.$refs.test.mousemove(event)
      // let new_e = new event.constructor(event.type, event);
      // document.getElementById('test').dispatchEvent(new_e)
      // self.$refs.test2.mousedown(event)
    }, true);

    this.$el.addEventListener('mousemove', function(event) {
      event.stopPropagation()
      const target = self.findTargetForCanvas(event)
      self.setTarget(target)
      self.EventBus.$emit('mouse:move', event)
    }, true);

    this.$el.addEventListener('mouseup', function(event) {
      event.stopPropagation()
      const target = self.findTargetForCanvas(event)
      self.setTarget(target)
      self.EventBus.$emit('mouse:up', event)
    }, true);




  },
  methods: {
    ...mapMutations([
      'setTarget'
    ]),
    findTargetForCanvas: function(event) {
      return this.$refs.canvasLayer.getController().findTarget(event)
    },
  },
  provide() {
    return {
      // FabricWrapper: this.FabricWrapper,
      EventBus: this.EventBus
    }
  },
  
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
  overflow: hidden;
  margin-top: 200px;
}
</style>
