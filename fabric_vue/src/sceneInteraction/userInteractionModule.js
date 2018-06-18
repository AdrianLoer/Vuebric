

const state = {
  mouseDown: false,
  boxCreationActive: false,
  circleHover: false,
  canvasTarget: null,
  temporaryCreationRectangle: {left: 100, top: 100, width: 200, height: 200},
  temporaryCreationRectangleActive: false,
  rects: [],
}

const getters = {
  canvasTarget: state => state.canvasTarget,
  temporaryCreationRectangle: state => state.temporaryCreationRectangle,
  temporaryCreationRectangleActive: state => state.temporaryCreationRectangleActive,
  rects: state => state.rects,
  // why?
  // test: state => {
  //   return function() {
  //     console.log("test")
  //   }
  // }
  // renderPosition: state => {
  //   console.log(state.canvasElements.renderOrder)
  //   return state.canvasElements.renderOrder
  // },
  // nextClickShouldStartBoxCreation: state => {
  //   return !this.circleHover
  // }
}

const mutations = {
  setMouseDown: (state, payload) => {
    console.log('setMouseDown', payload)
    state.mouseDown = payload
  },
  setTarget: (state, payload) => {
    console.log('setTarget', payload)
    state.canvasTarget = payload
  },
  startTemporaryRectangleCreation: (state) => {
    state.temporaryCreationRectangleActive = true
  },
  stopTemporaryRectangleCreation: (state) => {
    state.temporaryCreationRectangleActive = false
  },
  setTemporaryCreationRectangle: (state, payload) => {
    console.log("payload", payload)
    state.temporaryCreationRectangle = payload
  },
  addRect: (state, payload) => {
    state.rects.push(payload)
  },
  toggleEditableRectIndex: (state, payload) => {
    state.rects[payload.at].editActive = payload.to
  },
  toggleHighlightedRectIndex: (state, payload) => {
    state.rects[payload.at].highlighted = payload.to
  }
  // addToPolyline: (state, newPoint) => {
  //   console.log(`addToPolyline x: ${newPoint.x} y: ${newPoint.y}`)
  //   state.canvasElements.clickedLocations.push({x: newPoint.x, y: newPoint.y, stroke: "black"});
  // },
}

const actions = {
  // addRect({commit}, payload) {
  //   commit('addRect')
  // }
  // updateRenderOrder({commit}) {
  //   commit('reverseRenderOrder')
  //   commit('createRenderOrder')
  // },
}

export default {
  // namespaced: true,
  state,
  getters,
  actions,
  mutations
}
