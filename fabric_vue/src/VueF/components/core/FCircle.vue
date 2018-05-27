<script>
import {fabric} from 'fabric'
import FObjectMixin from './FObjectMixin'

export default {
  mixins: [FObjectMixin],
  inject: ['EventBus', 'FabricWrapper'],
  // x, y define the sprite's position in the parent.
  // imagePath is the path to the image on the server to render as the sprite.
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
    console.log('FCircle created')


    // Forward the pointerdown event.
    // this.sprite.on('pointerdown', () => this.$emit('pointerdown', this.sprite));
    // When the PIXI renderer starts.
    // this.EventBus.$on('ready', () => {
      // Add the sprite to the parent container or the root app stage.
      // if (this.$parent.container) {
      //   this.$parent.container.addChild(this.sprite);
      // } else {
      //   this.PIXIWrapper.PIXIApp.stage.addChild(this.sprite);
      // }

      this.EventBus.$on('ready', () => {
        this.fObj = new fabric.Circle({
          left: this.left,
          top: this.top,
          width: this.width,
          height: this.height,
          fill: this.fill,
          selectable: false,
          originX: 'left',
          originY: 'top'
        });
        console.log(this.fObj)

        // this.rect.on('moving', function(evt) {
        //   // console.log(this.get("top"))
        // });

        this.FabricWrapper.fabricApp.add(this.fObj);
        this.fRender()
      })




      // Emit an event for this sprite on every tick.
      // Great way to kill performance.
      // this.PIXIWrapper.PIXIApp.ticker.add(delta => this.$emit('tick', this.sprite, delta));
    // })
  }
}
</script>
