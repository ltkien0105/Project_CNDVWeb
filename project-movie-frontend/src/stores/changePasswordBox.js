import { ref } from 'vue'
import { defineStore } from 'pinia'

const useChangePassBoxStore = defineStore('changePassBoxStatus', () => {
  const status = ref(false)

  function show() {
    status.value = true
  }

  function hide(event) {
    if (event.target.id === 'modal') {
      status.value = false
    }
  }

  return { status, show, hide }
})

export default useChangePassBoxStore
