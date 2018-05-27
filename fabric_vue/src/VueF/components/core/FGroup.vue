<script>
import {fabric} from 'fabric'
export default {
  inject: ['EventBus', 'FabricWrapper'],
  // x, y define the sprite's position in the parent.
  // imagePath is the path to the image on the server to render as the sprite.
  props: {
 
  },

  data() {
    return {
      group: null
    }
  },
  watch: {
    

  },
  render(h) { return h() },

  created() {
      console.log("CGroup created")

      // Emit an event for this sprite on every tick.
      // Great way to kill performance.
      // this.PIXIWrapper.PIXIApp.ticker.add(delta => this.$emit('tick', this.sprite, delta));
    // })
  }
}
</script>
