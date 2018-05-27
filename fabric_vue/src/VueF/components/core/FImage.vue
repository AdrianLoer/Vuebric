<script>
import {fabric} from 'fabric'
export default {
  inject: ['EventBus', 'FabricWrapper'],
  // x, y define the sprite's position in the parent.
  // imagePath is the path to the image on the server to render as the sprite.
  props: ['left', 'top', 'imagePath'],

  data() {
    return {
      image: null
    }
  },
  watch: {
    left: function() {
      // console.log(this.image)
      if (this.image) {
        this.image.top = this.top
        this.image.left = this.left
      }
    },
    top: function() {
      // console.log(this.top)
    }
  },
  render(h) { return h() },

  created() {
    // console.log('fimage')


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
      var self = this;
      fabric.Image.fromURL(this.imagePath, function(img) {
        self.image = img.set({ left: self.left, top: self.top, selectable: false});
        // self.image.borderColor="purple"
        self.FabricWrapper.fabricApp.add(self.image);
      });

      // Emit an event for this sprite on every tick.
      // Great way to kill performance.
      // this.PIXIWrapper.PIXIApp.ticker.add(delta => this.$emit('tick', this.sprite, delta));
    // })
  }
}
</script>
