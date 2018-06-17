// import Vue from "vue";
import Vue from 'vue/dist/vue.js';
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  mouseDown: false,
  boxCreationActive: false
}

const getters = {
  // renderPosition: state => {
  //   console.log(state.canvasElements.renderOrder)
  //   return state.canvasElements.renderOrder
  // },
}

const mutations = {
  // addToPolyline: (state, newPoint) => {
  //   console.log(`addToPolyline x: ${newPoint.x} y: ${newPoint.y}`)
  //   state.canvasElements.clickedLocations.push({x: newPoint.x, y: newPoint.y, stroke: "black"});
  // },
}

const actions = {
  // updateRenderOrder({commit}) {
  //   commit('reverseRenderOrder')
  //   commit('createRenderOrder')
  // },
}

export default new Vuex.Store({
  namespaced: true,
  state,
  getters,
  actions,
  mutations
})
