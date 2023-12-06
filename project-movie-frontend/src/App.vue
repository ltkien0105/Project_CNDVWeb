<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import ModalDrawer from './components/ModalDrawer.vue'

const router = useRouter()

const currentRoute = ref(router.currentRoute)

function setBackground() {
  const app = document.getElementById('app')
  if (router.currentRoute.value.path === '/') {
    app.style.backgroundImage = "url('../src/assets/images/movie-background.jpg')"
  }

  if (
    router.currentRoute.value.path === '/search' ||
    router.currentRoute.value.path === '/genres'
  ) {
    app.style.backgroundImage = "url('../src/assets/images/grid-background.jpg')"
    app.style.backgroundRepeat = 'repeat-y'
  }

  if (router.currentRoute.value.path.includes('/movies')) {
    app.style.backgroundImage = "url('../src/assets/images/grid-background.jpg')"
    app.style.backgroundRepeat = 'repeat-y'
    if (router.currentRoute.value.path.includes('/movies/')) {
      app.style.backgroundImage = "url('../../src/assets/images/movie-background.jpg')"
    }
  }

  if (router.currentRoute.value.path.includes('/profile')) {
    app.style.backgroundImage = "url('../src/assets/images/profile-background.jpg')"
  }
}

const app = document.getElementById('app')
app.style.height = 'auto'

watch(currentRoute, () => {
  setBackground()
})
</script>

<template>
  <div class="router" ref="root">
    <router-view :key="$route.fullPath" />
  </div>
  <ModalDrawer></ModalDrawer>
</template>
