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
      default: "black",
      type: String
    },
    selectable: {
    	default: false,
    	type: Boolean
    }
  },
  watch: {
	  left: function(newVal) {
	    this.fUpdate('left', newVal)
	  },
	  top: function(newVal) {
	    this.fUpdate('top', newVal)
	  },
	  width: function(newVal) {
	    this.fUpdate('width', newVal)
	  },
	  height: function(newVal) {
	    this.fUpdate('height', newVal)
	  },
	  fill: function(newVal) {
	    this.fUpdate('fill', newVal)
	  }
  },
  created() {
  	if (!this.FabricWrapper.ready) {
  		this.EventBus.$on('ready', () => {
  			this.createObject();
  			this.FabricWrapper.fabricApp.add(this.fObj);
  			this.fRender()
  		})
  	} else {
  		this.createObject();
  		this.FabricWrapper.fabricApp.add(this.fObj);
  		this.fRender()
  	}
  },
  methods: {
  	fRender: function() {
  		console.log("fRender")
  		// this.FabricWrapper.fabricApp.add(this.fObj);
  		this.FabricWrapper.fabricApp.requestRenderAll();
  	},
  	fUpdate: function(key, val) {
  		this.fObj.set(key, val)
  		this.fRender()
  	}
  }
}