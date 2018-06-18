export default {
  data: function () {
    return {
      	fprop: {
      		top: 0,
      		left: 0,
      		width: 0,
      		height: 0
  		},
  		fObj: null
    }
  },
  props: {
  	id: {
		default: "none",
		type: String
  	},
  	left: {
		default: 0,
		type: Number
    },
    top: {
		default: 0,
		type: Number
    },
    width: {
		default: 0,
		type: Number
    },
    height: {
		default: 0,
		type: Number
    },
    fill: {
		default: "purple",
		type: String
    },
    stroke: {
		default: "black",
		type: String
    },
    selectable: {
    	default: false,
    	type: Boolean
    },
    drawingIndex: {
    	default: 0,
    	type: Number
    },
    evented: {
    	default: true,
    	type: Boolean
    },
    objectCaching: {
      default: true,
      type: Boolean
    },
    strokeWidth: {
      default: 1,
      type: Number
    }
  },
  watch: {
	  left: function(newVal) {
	    this.fUpdate('left', newVal)
	    this.fCoords()
	  },
	  top: function(newVal) {
	    this.fUpdate('top', newVal)
	    this.fCoords()
	  },
	  width: function(newVal) {
	    this.fUpdate('width', newVal)
	    this.fCoords()
	  },
	  height: function(newVal) {
	    this.fUpdate('height', newVal)
	    this.fCoords()
	  },
	  fill: function(newVal) {
	    this.fUpdate('fill', newVal)
	  },
	  stroke: function(newVal) {
	    this.fUpdate('stroke', newVal)
	  },
	  drawingIndex: function(newVal) {
	  	// console.log("drawingIndex ", newVal)
	  	this.moveInDrawingIndex(newVal)
	  },
    objectCaching: function(newVal) {
      this.fUpdate('objectCaching', newVal)
    },
    strokeWidth: function(newVal) {
      this.fUpdate('strokeWidth', newVal)
    }
  },
  created() {
  	if (!this.FabricWrapper.ready) {
  		this.EventBus.$on('ready', () => {
  			this.createObject();
  			this.afterCreateObject();
  			this.FabricWrapper.fabricApp.add(this.fObj);
  			// console.log(this.drawingIndex)
  			this.moveInDrawingIndex(this.drawingIndex)
  			this.fRender()
  			this.attachEventHandlers()
  		})
  	} else {
  		this.createObject();
  		this.afterCreateObject();
  		this.FabricWrapper.fabricApp.add(this.fObj);
		this.moveInDrawingIndex(this.drawingIndex)
  		this.fRender()
  		this.attachEventHandlers()
  	}
  },

  beforeDestroy() {
    this.FabricWrapper.fabricApp.remove(this.fObj);
    this.fRender();
  },
  methods: {
  	afterCreateObject: function() {
		this.fObj.id = this.id
  	},
  	mouseMoveHandler: function(event) { 
  		console.log("mouseMove", event)
  	},
  	fRender: function() {
  		// console.log("fRender")
  		// this.FabricWrapper.fabricApp.add(this.fObj);
  		this.FabricWrapper.fabricApp.requestRenderAll();
  	},
  	fUpdate: function(key, val) {
  		this.fObj.set(key, val)
  		this.fRender()
  	},
  	fCoords: function() {
  		this.fObj.setCoords()
  	},
  	moveInDrawingIndex: function(newIndex) {
  		this.fObj.moveTo(newIndex)
  		this.fRender()
  	},
  	attachEventHandlers: function() {
  	// 	let self = this
  	// 	console.log("attaching event handlers", this.$listeners)
  	// 	if (this.$listeners.mouseMove) {
  	// 		console.log("attaching")
	  // 		this.fObj.on('mousemove', function(event) {
			//   self.$emit('mouseMove', event)
			// });
			// console.log(this.fObj)
  	// 	}
  	}
  }
}