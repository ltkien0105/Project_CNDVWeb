<script setup>
import { ref } from 'vue'
import { useVideoOverplayStatusStore } from '../stores/videoOverplayStatus'

const { hide } = useVideoOverplayStatusStore()

const props = defineProps({
  videoUrl: {
    type: String,
    required: true
  }
})

const width = ref(window.innerWidth * 0.8)
const height = ref(window.innerHeight * 0.8)
</script>

<template>
  <div id="modal" @click="hide">
    <iframe
      :width="width"
      :height="height"
      :src="props.videoUrl"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    ></iframe>
  </div>
</template>

<style scoped>
@import '../assets/css/modal.css';
</style>
