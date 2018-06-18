<script>
import {fabric} from 'fabric'
import FObjectMixin from './FObjectMixin'

export default {
  mixins: [FObjectMixin],
  inject: ['EventBus', 'FabricWrapper'],
  // x, y define the sprite's position in the parent.
  // imagePath is the path to the image on the server to render as the sprite.
  props: {
    fill: {
      default: "rgba(0,0,0,0)",
      type: String
    },
  },

  data() {
    return {
    }
  },
  watch: {

  },
  render(h) { return h() },

  created() {
    console.log('FCircle created')
  },
  methods: {
    createObject: function() {
      this.fObj = new fabric.Rect({
          left: this.left,
          top: this.top,
          width: this.width,
          height: this.height,
          fill: this.fill,
          stroke: "red",
          strokeWidth: this.strokeWidth,
          objectCaching: this.objectCaching,
          selectable: false,
          originX: 'left',
          originY: 'top'
        });

    }
  }
}
</script>
