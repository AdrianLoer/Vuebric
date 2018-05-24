

<script>
import Vue from 'vue';
import { mapGetters, mapActions, mapMutations } from 'vuex'
import {fabric} from 'fabric'

import FImage from './FImage';
import FRect from './FRect';
import FGroup from './FGroup';

import {CGroup, CRect} from '../VueC/VueC';

export default {
  inject: ['EventBus', 'FabricWrapper'],
  components: {
    FImage,
    FRect,
    FGroup,
  },
  props: {
    containerElements: {
      default: [],
      type: Array
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


    function createCanvasElement(type, nodeProp, childElements) {
      if (type === "f-rect") {
        console.log("createElement f-rect")
          return createElement(
          'f-rect',
          {
           props: {
             left: nodeProp.left,
             top: nodeProp.top,
             width: nodeProp.width,
             height: nodeProp.height,
             fill: "red"
           }
          }
        )
      } else if (type === "f-group") {
        console.log("createElement f-group")
        console.log(childElements)
        return createElement(
          'f-group',
          {},
          childElements
        )
      }
    }

    function traverseAndCreate(nodes) {
      console.log("traverseAndCreate", nodes)
      let elements = [];
      for (var i = 0; i < nodes.length; i++) {
        let node = nodes[i];
        if (node instanceof CRect) {
          elements.push(createCanvasElement('f-rect', {top: node.top, left: node.left, height: node.height, width: node.width}))
        } if (node instanceof CGroup) {
          elements.push(
            createCanvasElement('f-group', {}, traverseAndCreate(node.elements))
            )
        }
      }
      console.log("elements", elements)
      return elements;
    }

    // node is an array with canvas/fabric elements including groups
    // function ifGroupExistsWalkDownAndReturnElements(nodes) {
    //   console.log(nodes)
    //   let elements = []
    //   if (nodes instanceof CGroup) {
    //     for (var i = 0; i < nodes.elements.length; i++) {
    //       elements.push(ifGroupExistsWalkDownAndReturnElements(nodes[i]))
    //     }
    //   } else {
    //       elements.push(createElement(
    //     'f-rect',
    //     {
    //      props: {
    //        left: 10,
    //        top: 10,
    //        width: 30,
    //        height: 30,
    //        fill: "red"
    //      }
    //     }
    //   ))
    //     }
    //   }
    //   return elements;
    // }
    console.log(this.containerElements)

    var rootElements = traverseAndCreate(this.containerElements)

    console.log("rootElements", rootElements)

    return createElement('template', rootElements

      //       [createElement(
      //   'f-rect',
      //   {
      //    props: {
      //      left: 10,
      //      top: 10,
      //      width: 30,
      //      height: 30,
      //      fill: "red"
      //    }
      //   }
      // )]
      // Array.apply(null, { length: 20 }).map(function (i) {
      //        return createElement(
      //    'f-rect',
      //    {
      //     props: {
      //       left: 10,
      //       top: 10,
      //       width: 30,
      //       height: 30,
      //       fill: "red"
      //     }
      //    }
      //  )
      //     })

      // for (var i = 0; i < 5; i++) {
      //  return createElement(
      //    'f-rect',
      //    {
      //     props: {
      //       left: 10 * i,
      //       top: 10 * i,
      //       width: 30,
      //       height: 30,
      //       fill: "red"
      //     }
      //    }
      //  ) 
      // }


      )


    // for (var i = 0; i < this.containerElements.length; i++) {

    // }


    // let node = this.containerElements;



     
   },

  mounted() {
    console.log("CRenderContainer mounted")
  }
}
</script>

<style scoped>
</style>
