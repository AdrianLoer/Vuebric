export default class UserInteraction {
	 // constructor(identifier, top, left, height, width, fill) {
	 //  	this.identifier = identifier;
	 //  	this.top = top;
	 //  	this.left = left;
	 //    this.height = height;
	 //    this.width = width;
	 //    this.fill = fill;
	 //    console.log(`
	 //    	set up CObject with
	 //    	identifier: ${this.identifier}
	 //    	top: ${this.top}
	 //    	left: ${this.left}
	 //    	height: ${this.height}
	 //    	width: ${this.width}
	 //    	fill: ${this.fill}
	 //    	`)
		// }
		constructor(identifier, startCallback, updateCallback, endCallback) {
			console.log("UserInteraction constructor called")
			this.identifier = identifier;
			this.isActive = false;
			this.state = "";
			this.startCallback = startCallback;
			this.updateCallback = updateCallback;
			this.endCallback = endCallback;
		}

		get identifier() {
			return this.identifier
		}

		get state() {
			return this.state
		}

		get isActive() {
			return this.isActive
		}

		onStart(payload) {
			this.startCallback(payload)
		}

		onUpdate(payload) {
			this.updateCallback(payload)
		}

		onEnd(payload) {
			this.endCallback(payload)
		}

		enable() {
			this.isActive = true
		}

		disable() {
			this.isActive = false
		}


}