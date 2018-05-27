// import Vue from "vue";
import Vue from 'vue/dist/vue.js';
import Vuex from "vuex";
import axios from "axios";
import {FGroup, FRect} from './VueF/VueF';

Vue.use(Vuex);

const state = {
  // editorContent: {}
  selectionBoundingBoxRect: {
    top: 200,
    left: 200,
    width: 200,
    height: 200,
    fill: "blue"
  },
  isSelecting: false,
  canvasElementsRoot: [
    new FGroup(
      "firstGroup",
      200, 
      10, 
      100, 
      100,
      "purple",
      [
        new FRect(
          "firstRect",
          10,
          10,
          40,
          40,
          "yellow"
        ),
        new FRect(
          "secondRect",
          30,
          30,
          40,
          40,
          "green"
        )
      ]
      )
  ],
  canvasElements: {
    clickedLocations: [
      // { x: 10, y: 10 },
    ],
    renderOrder: {
      typeOrder: ['nodes', 'debug-lines', 'edges'],
      counters: {}
    }
  }
}

const getters = {
  // editorContent: state => state.editorContent,
  // selectionBoundingBoxRect: state => state.selectionBoundingBoxRect,
  // isSelecting: state => state.isSelecting,
  canvasElementsRoot: state => state.canvasElementsRoot,
  canvasElements: state => state.canvasElements,
  renderPosition: state => {
    console.log(state.canvasElements.renderOrder)
    return state.canvasElements.renderOrder
  },
  // somehow like this i can pass an argument to the getter but cant seem to get it working right now
  // TODO see below
  // renderCounter: state => type => {
}

const mutations = {
  addToPolyline: (state, newPoint) => {
    console.log(`addToPolyline x: ${newPoint.x} y: ${newPoint.y}`)
    state.canvasElements.clickedLocations.push(newPoint);
  },
  reverseRenderOrder: (state) => {
    state.canvasElements.renderOrder.typeOrder = state.canvasElements.renderOrder.typeOrder.slice().reverse()
    // console.log("reverse",state.canvasElements.renderOrder.typeOrder)
  },
  // 
  // this is intended to be used later on with a counter for each type of object to order them
  // within their class/function and incrementing for every single component
  // that asks here for the order
  // right now its just a simple 1000 z-index offset and thus
  // *every object of the same class is on the same level*
  // this is *not done yet*
  // 
  createRenderOrder: (state) => {
    for (let i = 0; i < state.canvasElements.renderOrder.typeOrder.length; i++) {
      // console.log(state.canvasElements.renderOrder.typeOrder[i])
      Vue.set(state.canvasElements.renderOrder.counters, state.canvasElements.renderOrder.typeOrder[i], 1000 * i)
    }
    // console.log(state.canvasElements.renderOrder)
  },
  moveNode: (state, {index, pointer}) => {
    // console.log(`moveNode ${index} to pos ${pointer.x} | ${pointer.y}`)
    state.canvasElements.clickedLocations[index].x = pointer.x
    state.canvasElements.clickedLocations[index].y = pointer.y
  }
}

const actions = {
  updateRenderOrder({commit}) {
    commit('reverseRenderOrder')
    commit('createRenderOrder')
  }
  // test({commit}) {
  //   console.log("test")
  // }
  // getUserData({commit, getters, dispatch}) {
  //   if (getters.isAuthenticated) {
  //     dispatch('getDocumentsForUser').then((res) => {
  //       console.log("got documents for current user", res);
  //       if (res.data.length < 1) {
  //         dispatch('createNewDocument').then((res) => {
  //           console.log("user didn't have any docs, created a new one", res);
  //           console.log("will now create asset for documentId", res.data._id)
  //           dispatch('createNewAsset', res.data._id)
  //         })
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  //   }
  // },
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
