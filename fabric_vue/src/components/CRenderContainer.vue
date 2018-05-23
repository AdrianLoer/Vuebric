

<script>
import Vue from 'vue';
import { mapGetters, mapActions, mapMutations } from 'vuex'
import {fabric} from 'fabric'

import FImage from './FImage';
import FRect from './FRect';

export default {
  inject: ['EventBus', 'FabricWrapper'],
  components: {
    FImage,
    FRect,
  },
  props: {
    canvasElementsRoot: {
      default: {},
      type: Object
    },
  },
  data() {
    return {
    
    }
  },
  computed: {
		...mapGetters([
	      	'selectionBoundingBoxRect',
          'isSelecting'
	    ])
	},
  methods: {
    ...mapMutations([
      'updateSelectionBoundingBox',
      'toggleSelectionDrag'
    ])
  },
  // this.EventBus.$on('ready', () => {
  render: function (createElement) {
    console.log("render", this.FabricWrapper.ready)

    let node = this.canvasElementsRoot;
    console.log("node ", node)
    for (var i = 0; i < node.elements.length; i++) {
     return createElement(
       'f-rect',
       {
        props: {
          left: node.elements[i].left,
          top: node.elements[i].top,
          width: node.elements[i].width,
          height: node.elements[i].height,
          fill: "red"
        }
       }
     ) 
    }

     
   },

  mounted() {
    console.log("CRenderContainer mounted")
  }
}
</script>

<style scoped>
</style>
