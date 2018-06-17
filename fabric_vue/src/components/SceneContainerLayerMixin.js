export default {
  data: function () {
    return {
      controller: {}
    }
  },
  props: {
  
  },
  watch: {
	 
  },
  methods: {
  	getController: function() {
      console.log("getController")
      return this.controller
    }
  }
}