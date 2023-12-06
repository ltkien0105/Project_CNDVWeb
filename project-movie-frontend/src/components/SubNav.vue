<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  items: {
    type: Array,
    require: true
  }
})

const router = useRouter()

const items = ref(props.items)

const isHideSubNav = ref(window.innerWidth < 690)

window.addEventListener('resize', () => {
  isHideSubNav.value = window.innerWidth < 690
})
</script>

<template>
  <div v-if="!isHideSubNav" id="sub-nav">
    <nav class="navbar navbar-expand-lg">
      <ul class="navbar-nav">
        <li v-for="item in items" :key="item.name" class="nav-item">
          <a
            v-if="item.name == 'Home'"
            :style="{ backgroundColor: 'red' }"
            class="nav-link"
            @click.prevent="router.push(item.path)"
            >{{ item.name }}</a
          >
          <a v-else class="nav-link" @click.prevent="router.push(item.path)">{{ item.name }}</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: center;
}

.navbar-nav {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 16px;
}
.nav-item {
  height: 30px;
  display: flex;
  align-items: center;
  padding: 0px 5px;
}

.nav-link {
  color: white;
  border-radius: 8px;
  padding-top: 6px;
}

.nav-link:hover {
  cursor: pointer;
}
</style>
