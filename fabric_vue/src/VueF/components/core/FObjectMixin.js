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
    }
  },
  watch: {
	  left: function() {
	    console.log("left changed in mixin")
	  },
	  top: function() {
	   
	  },
	  width: function() {
	    
	  },
	  height: function() {
	    
	  },
	  fill: function() {
	    
	  }
  },
  methods: {
  	fRender: function() {
  		console.log("fRender")
  		// this.FabricWrapper.fabricApp.add(this.fObj);
  		this.FabricWrapper.fabricApp.requestRenderAll();
  	}
  }
}