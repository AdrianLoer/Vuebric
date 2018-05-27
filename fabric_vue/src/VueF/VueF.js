// haven't found out yet how to 'proxy' class definitions
// through module exports. Better: put classes
// in their own files


class FObject {
  constructor(identifier, top, left, height, width, fill) {
  	this.identifier = identifier;
  	this.top = top;
  	this.left = left;
    this.height = height;
    this.width = width;
    this.fill = fill;
    // console.log(`
    // 	set up FObject with
    // 	identifier: ${this.identifier}
    // 	top: ${this.top}
    // 	left: ${this.left}
    // 	height: ${this.height}
    // 	width: ${this.width}
    // 	fill: ${this.fill}
    // 	`)
	}

    // get top() {
    // 	return this.top
    // }
    // get left() {
    // 	return this.left
    // }
    // get width() {
    // 	return this.width
    // }
    // get height() {
    // 	return this.height
    // }
}

class FGroup extends FObject {
	constructor(identifier, top, left, height, width, fill, groupElements) {
		super(identifier, top, left, height, width, fill)
		this.groupElements = groupElements;
		console.log('=> set up as FGroup')
	}

	get elements() {
		return this.groupElements;
	}

}

class FRect extends FObject {
	constructor(identifier, top, left, height, width, fill) {
		super(identifier, top, left, height, width, fill)
		console.log('=> set up as FRect')
	}
}

export {FGroup, FRect};