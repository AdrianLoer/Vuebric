<template>
  <div class="fabric-renderer">
    <canvas ref="renderCanvas"></canvas>
    <!-- All child <template> elements get added in here -->
    <!-- <img src="../assets/blob.png"> -->
    <!-- <f-image
      v-for="blob in blobs"
      :image-path="require('../assets/blob.png')"
      :left="blob.x"
      :top="blob.y"
    ></f-image> -->
    <f-rect
    :left="100"
    :top="100">
    </f-rect>
    <slot></slot>
  </div>
</template>
<script>
import Vue from 'vue';
import {fabric} from 'fabric'
import FImage from './FImage';
import FRect from './FRect';

export default {
  components: {
    FImage,
    FRect,
  },
  data() {
    return {
      // These need to be contained in an object because providers are not reactive.
      FabricWrapper: {
        // Expose PIXI and the created app to all descendants.
        fabricApp: null,
        ready: false,
      },
      // Expose the event bus to all descendants so they can listen for the app-ready event.
      EventBus: new Vue(),
      total: 1000,
      // blobs: new Array(this.total),
      blobs: [],
      maxx: 0,
      maxy: 0,
    }
  },
  // Allows descendants to inject everything.
  provide() {
    return {
      FabricWrapper: this.FabricWrapper,
      EventBus: this.EventBus
    }
  },

  mounted() {

    // Determine the width and height of the renderer wrapper element.
    const renderCanvas = this.$refs.renderCanvas;
    const w = renderCanvas.offsetWidth;
    const h = renderCanvas.offsetHeight;

    // Create a new PIXI app.
    this.FabricWrapper.fabricApp = new fabric.Canvas(renderCanvas, {
      renderOnAddRemove: false,
      selection: false
    })

    // function m
    this.FabricWrapper.fabricApp.setHeight(window.innerHeight);
    this.FabricWrapper.fabricApp.setWidth(window.innerWidth);
    this.maxx = this.FabricWrapper.fabricApp.width;
    this.maxy = this.FabricWrapper.fabricApp.height;

    for (var i = 0; i < this.total; i++) {
      this.blobs.push({
        x: Math.random() * renderCanvas.offsetWidth,
        y: Math.random() * renderCanvas.offsetHeight,
        vx: 0,
        vy: 0
      })
    }
    var frames = 0;
    var startTime = Date.now(), prevTime = startTime;
    var self = this;
    var fps, myfps = 60;
    animate()
    function animate() {

      for (var i = 0; i < self.blobs.length; i++) {
        // self.blobs[i].x = self.blobs[i].x + (10 * Math.random() - 10 * Math.random())
        // self.blobs[i].y = self.blobs[i].y + (10 * Math.random() - 10 * Math.random())


        var blob = self.blobs[i];
        // var dx = blob.left - mouse_pos.x;
        var dx = blob.x;
        // var dy = blob.top - mouse_pos.y;
        var dy = blob.y;
        var vx = blob.vx;
        var vy = blob.vy;

        if (dx * dx + dy * dy <= 10000) {
          vx += dx * 0.01;
          vy += dy * 0.01;
        }
        vx *= 0.95;
        vy *= 0.95;

        vx += Math.random() - 0.5;
        vy += Math.random() - 0.5;

        var x = blob.x += vx;
        var y = blob.y += vy;

        if (x < 0 || x > self.maxx || y < 0 || y > self.maxy) {
          var r = Math.atan2(y - self.maxy / 2, x - self.maxx / 2);
          vx = -Math.cos(r);
          vy = -Math.sin(r);
        }

        blob.vx = vx;
        blob.vy = vy;
        // console.log(blob)
      }
      var time = Date.now();
      frames++;

      if ( time > prevTime + 1000 ) {
        fps = Math.round( ( frames * 1000 ) / ( time - prevTime ) );
        prevTime = time;
        frames = 0;

        // console.log("FPS: " + fps + "/" + myfps)
      }
      // self.imagePos.x = self.imagePos.x + 1
      fabric.util.requestAnimFrame(animate);
      self.FabricWrapper.fabricApp.renderAll();
    }

    self.FabricWrapper.fabricApp.renderAll();

    //
    // new PIXI.Application(w, h, {
    //   view: renderCanvas,
    //   backgroundColor: 0x1099bb
    // });
    this.EventBus.$emit('ready');
    this.FabricWrapper.ready = true;
  }
}
</script>

<style scoped>
canvas {
  width: 100%;
  height: 100%;
}
</style>
