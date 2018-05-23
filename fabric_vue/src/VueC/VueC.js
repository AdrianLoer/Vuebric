// haven't found out yet how to 'proxy' class definitions
// through module exports. Better: put classes
// in their own files


class CObject {
  constructor(top, left, height, width) {
  	this.top = top;
  	this.left = left;
    this.height = height;
    this.width = width;
    console.log(`
    	set up CObject with
    	top: ${this.top}
    	left: ${this.left}
    	height: ${this.height}
    	width: ${this.width}
    	`)
  }
}

class CGroup extends CObject {
	constructor(top, left, height, width) {
		super(top, left, height, width)
		console.log('=> set up as CGroup')
	}
}

class CRect extends CObject {
	constructor(top, left, height, width) {
		super(top, left, height, width)
		console.log('=> set up as CRect')
	}
}

export {CGroup, CRect};