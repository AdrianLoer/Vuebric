export default class FCanvasController {
	constructor(fabricObject) {
		console.log(fabricObject)
		this.fo = fabricObject
	}

	findTarget(event) {
		// console.log(this.fo)
		return this.fo.findTarget(event, true)
	}

	posInCanvas(event) {
		return this.fo.getPointer(event)
	}
}