<template>
  <div class="scene-container" :class="{editMode: editMode}">
<!-- 
    <div-layer :syncDimensions="true" ref="test">
      
    </div-layer> -->

    <!-- <director-layer>
      // used to show passive information
    </director-layer> -->

    <f-canvas :syncDimensions="true" ref="canvasLayer">

      <!-- <path-selector :interaction-enabled="true"></path-selector> -->
      <bb-selector :dimensions="temporaryCreationRectangle" v-if="!editMode"></bb-selector>

      <bb-edit-selector :rects="rects" v-if="editMode"></bb-edit-selector>

      <bb-render :rects="rects"></bb-render>

      <!-- <bb-editor :dimensions=""></bb-editor> -->
      editMode: {{editMode}}
    </f-canvas>
  
  </div>
</template>

<script>
import Vue from 'vue';
import { mapGetters, mapActions, mapMutations } from 'vuex'

import FCanvas from '../VueF/components/FCanvas';
import DivLayer from './DivLayer';

import PathSelector from './PathSelector';
import BbSelector from './BbSelector';
import BbEditSelector from './BbEditSelector';
import BbRender from './BbRender';

import CreateBoxController from '../sceneInteraction/CreateBoxController'

export default {
  components: {
    FCanvas,
    DivLayer,
    PathSelector,
    BbSelector,
    BbEditSelector,
    BbRender,
  },
  data() {
    return {
     interactionControllers: [],
     EventBus: new Vue()
    }
  },
  watch: {
    editMode: function(newVal) {

    }
  },
  computed: {
		...mapGetters([
          'temporaryCreationRectangle',
          'rects',
          'editMode'
	    ])
	},
  mounted() {
    console.log("scene container mounted", this.$el)
    let self = this
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

    document.addEventListener('keydown', (event) => {
      if (event.key === 'e') {
        console.log('keydown e debug, refresh page')
        self.toggleEditMode()
      }
    });



  },
  methods: {
    ...mapMutations([
      'setTarget',
      'toggleEditMode'
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
  border: 10px solid blue;
  overflow: hidden;
  margin-top: 200px;
}

.scene-container.editMode {
  border-color: purple;
}
</style>
