<template>
  <div class="div-layer">
    <div class="div-test">CLICK</div>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  data() {
    return {
     syncDimensions: {
       default: true,
       type: Boolean
     }
    }
  },
  mounted() {
    console.log("div layer mounted")
    this.$el.addEventListener('mousemove', function(event) {
      console.log("mousemove div", event)
    }, false);
  },
  methods: {
    mousemove: function(event) {
      console.log("event div ", event)
    }
  }
}
</script>

<style scoped>
.div-layer {
  background-color: yellow;
  width: inherit;
  height: inherit;
  position: absolute;
}

.div-test {
  width: 100px;
  height: 100px;
  background-color: #CF6EEA;
  top: 100px;
  left: 100px;
  position: relative;
}

.div-test:hover {
  background-color: blue;
}
</style>
