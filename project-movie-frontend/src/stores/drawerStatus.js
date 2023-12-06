import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useDrawerStatusStore = defineStore('drawerStatus', () => {
  const status = ref(false)

  function show() {
    status.value = true
  }
  function hide() {
    status.value = false
  }

  return { status, show, hide }
})
