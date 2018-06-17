<template>
  <div class="div-layer">
    <div class="div-test">CLICK</div>
    <img src="https://i.imgur.com/KoTm5y8.jpg" class="div-image"></img>
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
    // this.$el.addEventListener('mousemove', function(event) {
    //   console.log("mousemove div", event)
    // }, false);
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
  /*transform: scale(2) translateX(100px);*/
}

.div-test {
  width: 100px;
  height: 100px;
  background-color: #CF6EEA;
  /*https://i.imgur.com/KoTm5y8.jpg*/
  top: 100px;
  left: 100px;
  position: absolute;
}


.div-test:hover {
  background-color: blue;
}

.div-image {
  width: 100%;
  height: auto;
}

</style>
