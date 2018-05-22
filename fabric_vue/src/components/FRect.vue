<script>
import {fabric} from 'fabric'
export default {
  inject: ['EventBus', 'FabricWrapper'],
  // x, y define the sprite's position in the parent.
  // imagePath is the path to the image on the server to render as the sprite.
  props: {
    left: {
      default: 0,
      type: Number
    },
    top: {
      default: 0,
      type: Number
    },
    width: {
      default: 10,
      type: Number
    },
    height: {
      default: 10,
      type: Number
    },
    fill: {
      default: "black",
      type: String
    }
  },

  data() {
    return {
      rect: null
    }
  },
  watch: {
    left: function() {
      // console.log(this.image)
      if (this.rect) {
        this.rect.left = this.left
      }
    },
    top: function() {
      // console.log(this.top)
      if (this.rect) {
        this.rect.top = this.top
      }
    },
    width: function() {
      if (this.rect) {
        console.log(this.width)
        console.log(this.top)
        this.rect.width = this.width
      }
    },
    height: function() {
      if (this.rect) {
        this.rect.height = this.height
      }
    },
    fill: function() {
      if (this.rect) {
        this.rect.fill = this.fill
      }
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

      this.EventBus.$on('ready', () => {
        this.rect = new fabric.Rect({
          left: this.left,
          top: this.top,
          width: this.width,
          height: this.height,
          fill: this.fill,
          selectable: false,
          originX: 'left',
          originY: 'top'
        });
        console.log(this.rect)

        // this.rect.on('moving', function(evt) {
        //   // console.log(this.get("top"))
        // });

        this.FabricWrapper.fabricApp.add(this.rect);
      })




      // Emit an event for this sprite on every tick.
      // Great way to kill performance.
      // this.PIXIWrapper.PIXIApp.ticker.add(delta => this.$emit('tick', this.sprite, delta));
    // })
  }
}
</script>
