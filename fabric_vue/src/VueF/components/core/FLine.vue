<script>
import {fabric} from 'fabric'
import FObjectMixin from './FObjectMixin'

export default {
  mixins: [FObjectMixin],
  inject: ['EventBus', 'FabricWrapper'],
  props: {
    lineCoords: {
      default: () => [],
      type: Array
    },
  },
  data() {
    return {
    }
  },
  watch: {
    lineCoords: function(newVal) {
      this.fObj.set({
        'x1': newVal[0],
        'y1': newVal[1],
        'x2': newVal[2],
        'y2': newVal[3]
      })
      this.fRender();
    },
  },
  render(h) { return h() },

  created() {
    console.log('FLine created')
  },
  methods: {
    createObject: function() {
      this.fObj = new fabric.Line(this.lineCoords, {
        // left: this.left,
        // top: this.top,
        strokeWidth: 2,
        fill: this.fill,
        stroke: this.stroke,
        originX: 'center',
        originY: 'center',
        selectable: this.selectable
      });
    }
  }
}
</script>
