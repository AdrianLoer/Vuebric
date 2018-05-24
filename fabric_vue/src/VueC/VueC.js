// haven't found out yet how to 'proxy' class definitions
// through module exports. Better: put classes
// in their own files


class CObject {
  constructor(identifier, top, left, height, width, fill) {
  	this.identifier = identifier;
  	this.top = top;
  	this.left = left;
    this.height = height;
    this.width = width;
    this.fill = fill;
    console.log(`
    	set up CObject with
    	identifier: ${this.identifier}
    	top: ${this.top}
    	left: ${this.left}
    	height: ${this.height}
    	width: ${this.width}
    	fill: ${this.fill}
    	`)
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

class CGroup extends CObject {
	constructor(identifier, top, left, height, width, fill, groupElements) {
		super(identifier, top, left, height, width, fill)
		this.groupElements = groupElements;
		console.log('=> set up as CGroup')
	}

	get elements() {
		return this.groupElements;
	}

}

class CRect extends CObject {
	constructor(identifier, top, left, height, width, fill) {
		super(identifier, top, left, height, width, fill)
		console.log('=> set up as CRect')
	}
}

export {CGroup, CRect};