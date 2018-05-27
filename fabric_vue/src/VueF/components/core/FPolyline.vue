<script>
import {fabric} from 'fabric'
import FObjectMixin from './FObjectMixin'

export default {
  mixins: [FObjectMixin],
  inject: ['EventBus', 'FabricWrapper'],
  // x, y define the sprite's position in the parent.
  // imagePath is the path to the image on the server to render as the sprite.
  props: {
    points: {
      default: () => [],
      type: Array
    }
  },
  watch: {
    points: function() {
      console.log("points ", this.points)
      // this.fObj.points = this.points
      this.create()
      // this.fRender()
    }
  },
  data() {
    return {
    }
  },
  render(h) { return h() },

  created() {
    console.log('FPolyline created')

      this.EventBus.$on('ready', () => {
        console.log('FPolyline ready received')
         this.create()
        // this.fObj = new fabric.Polyline(this.points, {
        //   stroke: 'red',
        //   left: 100,
        //   top: 100,
        //   strokeWidth: 8
        // });

        // this.FabricWrapper.fabricApp.add(this.fObj);
        // this.fRender()
      })

  },
  methods: {
    create: function() {
      if (this.fObj) {
        this.FabricWrapper.fabricApp.remove(this.fObj)
      }
      this.fObj = new fabric.Polyline(this.points, {
        stroke: 'red',
        left: this.left,
        top: this.top,
        strokeWidth: 1
      });
      this.FabricWrapper.fabricApp.add(this.fObj);
      this.fRender()
    }
  }
}
</script>
