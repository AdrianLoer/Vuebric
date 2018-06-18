export default {
  data: function () {
    return { 
      controllerWrapper: {controller: {}}
    }
  },
  props: {
  
  },
  watch: {
	 
  },
  methods: {
  	getController: function() {
      console.log("getController")
      return this.controllerWrapper.controller
    }
  },
  provide() {
    return {
      controllerWrapper: this.controllerWrapper,
    }
  },
}