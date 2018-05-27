<script>
import {fabric} from 'fabric'
import FObjectMixin from './FObjectMixin'

export default {
  mixins: [FObjectMixin],
  inject: ['EventBus', 'FabricWrapper'],
  props: {

  },
  data() {
    return {
    }
  },
  watch: {

  },
  render(h) { return h() },

  created() {
    // all relevant code here moved to the mixin
    console.log('FCircle created')
  },
  methods: {
    createObject: function() {
      this.fObj = new fabric.Circle({
        left: this.left,
        top: this.top,
        strokeWidth: 2,
        radius: 8,
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
