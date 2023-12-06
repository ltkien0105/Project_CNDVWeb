import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useVideoOverplayStatusStore = defineStore('videoOverplayStatus', () => {
  const status = ref(false)
  const trailerUrl = ref('')

  function show() {
    status.value = true
  }
  function hide() {
    status.value = false
  }

  return { status, trailerUrl, show, hide }
})
