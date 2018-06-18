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
      return this.controllerWrapper.controller
    }
  },
  provide() {
    return {
      controllerWrapper: this.controllerWrapper,
    }
  },
}