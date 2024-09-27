<script setup lang="ts">
import { ref } from 'vue'

const options = ref({
  fpsLimit: 60,
  particles: {
    number: {
      value: 80,
    },
    color: {
      value: '#ff0000',
      animation: {
        enable: true,
        speed: 20,
        sync: true,
      },
    },
    shape: {
      type: 'circle',
    },
    opacity: {
      value: 0.5,
    },
    size: {
      value: { min: 1, max: 3 },
    },
    links: {
      enable: true,
      distance: 100,
      color: 'random',
      opacity: 0.4,
      width: 1,
      triangles: {
        enable: true,
        color: '#ffffff',
        opacity: 0.1,
      },
    },
    move: {
      enable: true,
      speed: 6,
      direction: 'none',
      outModes: 'out',
    },
  },
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: 'repulse',
      },
      onClick: {
        enable: true,
        mode: 'push',
      },
    },
    modes: {
      repulse: {
        distance: 200,
      },
      push: {
        quantity: 4,
      },
    },
  },
  background: {
    color: '#000000',
  },
})
const particlesLoaded = async (container) => {
  console.log('Particles container loaded', container)
}
</script>

<template>
  <div>
    <vue-particles
      id="tsparticles"
      @particles-loaded="particlesLoaded"
      :options="options"
      style="
        background: url('https://particles.js.org/images/background3.jpg');
        background-position: cover;
      "
    />
  </div>
</template>

<style lang="scss" scoped>
/* ---- reset ---- */
body {
  margin: 0;
  font: normal 75% Arial, Helvetica, sans-serif;
}

canvas {
  display: block;
  // vertical-align: bottom;
}
/* ---- tsparticles container ---- */
#tsparticles {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #323031;
  background-image: url('');
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
