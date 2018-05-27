import Vue from "vue";
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
    polyline: [
      { x: 10, y: 10 },
      { x: 50, y: 30 },
      { x: 40, y: 70 },
      { x: 60, y: 50 },
      { x: 100, y: 150 },
      { x: 40, y: 100 }
    ]
  }
}

const getters = {
  // editorContent: state => state.editorContent,
  // selectionBoundingBoxRect: state => state.selectionBoundingBoxRect,
  // isSelecting: state => state.isSelecting,
  canvasElementsRoot: state => state.canvasElementsRoot,
  canvasElements: state => state.canvasElements
}

const mutations = {
  addToPolyline: (state, newPoint) => {
    console.log(`addToPolyline x: ${newPoint.x} y: ${newPoint.y}`)
    state.canvasElements.polyline.push(newPoint);
  }
  // toggleLoginDialog: (state) => {
  //   state.showLoginDialog = !state.showLoginDialog
  // },
  // updateSelectionBoundingBox: (state, opts) => {
  //   // console.log("updateSelectionBoundingBox " + opts[0], opts[1])
  //   state.selectionBoundingBoxRect[opts[0]] = opts[1];
  // },
  // toggleSelectionDrag: (state, value) => {
  //   state.isSelecting = value;
  // },
}

const actions = {
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
