import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import {CGroup, CRect} from './VueC/VueC';

Vue.use(Vuex);

const API_ENDPOINT = "http://localhost:3000/api/"

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
  canvasElementsRoot: {
    obj: null,
    elements: [
      new CGroup(10, 10, 100, 100)
    ]
  }
}

const getters = {
  // editorContent: state => state.editorContent,
  selectionBoundingBoxRect: state => state.selectionBoundingBoxRect,
  isSelecting: state => state.isSelecting,
  canvasElementsRoot: state => state.canvasElementsRoot
}

const mutations = {
  // toggleLoginDialog: (state) => {
  //   state.showLoginDialog = !state.showLoginDialog
  // },
  updateSelectionBoundingBox: (state, opts) => {
    // console.log("updateSelectionBoundingBox " + opts[0], opts[1])
    state.selectionBoundingBoxRect[opts[0]] = opts[1];
  },
  toggleSelectionDrag: (state, value) => {
    state.isSelecting = value;
  },
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
