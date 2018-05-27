import Vue from 'vue';

export default {
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

    const renderCanvas = this.$refs.renderCanvas;
    const w = renderCanvas.offsetWidth;
    const h = renderCanvas.offsetHeight;

    this.FabricWrapper.fabricApp = new fabric.Canvas(renderCanvas, {
      renderOnAddRemove: false,
      selection: false
    })

    this.FabricWrapper.fabricApp.setHeight(800);
    this.FabricWrapper.fabricApp.setWidth(1200);
    this.maxx = this.FabricWrapper.fabricApp.width;
    this.maxy = this.FabricWrapper.fabricApp.height;


    var self = this;
    animate()
    function animate() {
      fabric.util.requestAnimFrame(animate);
      self.FabricWrapper.fabricApp.renderAll();
    }

    self.FabricWrapper.fabricApp.renderAll();

    this.EventBus.$emit('ready');
    // ? not used?
    // this.FabricWrapper.ready = true;

    // set up event handlers

    this.FabricWrapper.fabricApp.on('mouse:down', function(options) {
      // self.$emit('c-click', options)
      self.EventBus.$emit('mouse:down', options)
      // self.click(options)
      // if (options.target) {
      //   console.log('an object was clicked! ', options.target.type);
      // }
    });


  },
  props: {
  	
  },
  watch: {
  },
  methods: {
    click: function(event) {
      console.log(event)
    }
  }
}
