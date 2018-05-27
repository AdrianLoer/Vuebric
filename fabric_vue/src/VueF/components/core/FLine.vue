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
    }
  },
  data() {
    return {
    }
  },
  watch: {

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
        fill: '#fff',
        stroke: '#666',
        originX: 'center',
        originY: 'center',
        selectable: this.selectable
      });
    }
  }
}
</script>
