import Vue from 'vue/dist/vue.js';

const state = {
  mouseDown: false,
  boxCreationActive: false,
  circleHover: false,
  canvasTarget: null,
  temporaryCreationRectangle: {left: 100, top: 100, width: 200, height: 200},
  temporaryCreationRectangleActive: false,
  rects: {},
  editMode: false,
}

const getters = {
  canvasTarget: state => state.canvasTarget,
  temporaryCreationRectangle: state => state.temporaryCreationRectangle,
  temporaryCreationRectangleActive: state => state.temporaryCreationRectangleActive,
  rects: state => state.rects,
  editMode: state => state.editMode,
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
  setTarget: (state, payload) => {
    state.canvasTarget = payload
  },
  startTemporaryRectangleCreation: (state) => {
    state.temporaryCreationRectangleActive = true
  },
  stopTemporaryRectangleCreation: (state) => {
    state.temporaryCreationRectangleActive = false
  },
  setTemporaryCreationRectangle: (state, payload) => {
    state.temporaryCreationRectangle = payload
  },
  addRect: (state, payload) => {
    const newTID = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    Vue.set(state.rects, newTID, payload)
    Vue.set(state.rects[newTID], 'drawingIndex', Object.keys(state.rects).length)
    Vue.set(state.rects[newTID], 'highlighted', false)
  },
  toggleEditableRectIndex: (state, payload) => {
    // const index = 
    // state.rects[payload.at].editActive = payload.to
  },
  toggleHighlightedRectTid: (state, payload) => {
    for (var key in state.rects) {
        if (state.rects.hasOwnProperty(key)) {
          Vue.set(state.rects[key], 'highlighted', false)
          if (state.rects[key].prevDrawingIndex) {
            Vue.set(state.rects[key], 'drawingIndex', state.rects[key].prevDrawingIndex)
            delete state.rects[key].prevDrawingIndex
          }
        }
    }
    if (state.rects[payload]) {
        Vue.set(state.rects[payload], 'highlighted', true)
        state.rects[payload].prevDrawingIndex = state.rects[payload].drawingIndex
        Vue.set(state.rects[payload], 'drawingIndex', 10000)
    }
  },
  toggleEditMode: (state, payload) => {
    state.editMode = !state.editMode
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
