import Vue from 'vue';

export default {
  props: {
    width: {
      default: 400,
      type: Number
    },
    height: {
      default: 400,
      type: Number
    },
    copycss: {
      defualt: false,
      type: Boolean
    }
  },
  data: function () {
    return {
    // These need to be contained in an object because providers are not reactive.
        FabricWrapper: {
          fabricApp: null,
          ready: false,
        },
        // used for ready events
        EventBus: new Vue()
    }
  },
  mounted() {
    console.log("mixin mounted")
    const renderCanvas = document.createElement('canvas');
    this.$el.appendChild(renderCanvas)
    // const renderCanvas = this.$refs.renderCanvas;
    const canvasWidth = this.copycss ? this.$el.offsetWidth : this.width;
    const canvasHeight = this.copycss ? this.$el.offsetHeight : this.height;
    this.FabricWrapper.fabricApp = new fabric.Canvas(renderCanvas, {
      renderOnAddRemove: false,
      selection: false,
      width: canvasWidth,
      height: canvasHeight
    })



    let self = this;
    // animate()
    // function animate() {
    //   fabric.util.requestAnimFrame(animate);
    //   self.FabricWrapper.fabricApp.renderAll();
    // }

    // self.FabricWrapper.fabricApp.renderAll();

    this.FabricWrapper.ready = true;
    this.EventBus.$emit('ready');
    // ? not used?

    // set up event handlers

    // this.FabricWrapper.fabricApp.on('mouse:down', function(options) {
    //   // self.$emit('c-click', options)
    //   self.EventBus.$emit('mouse:down', options)
    //   // self.click(options)
    //   // if (options.target) {
    //   //   console.log('an object was clicked! ', options.target.type);
    //   // }
    // });


  },
  methods: {
    click: function(event) {
      console.log(event)
    }
  }
}
