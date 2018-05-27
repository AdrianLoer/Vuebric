// import Vue from 'vue'
import Vue from 'vue/dist/vue.js';
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

// new Vue({
//   render: h => h(App),
//   store,
// }).$mount('#app')
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  store
})