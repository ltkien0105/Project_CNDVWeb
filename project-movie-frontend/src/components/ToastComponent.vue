<script setup>
const props = defineProps({
  type: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  delay: {
    type: Number,
    default: 4000
  }
})

const icon = () => {
  switch (props.type) {
    case 'error':
      return 'fa-solid fa-triangle-exclamation'
    case 'warning':
      return 'fa-solid fa-circle-exclamation'
    case 'success':
      return 'fa-solid fa-circle-check'
    default:
      return ''
  }
}

const color = () => {
  switch (props.type) {
    case 'error':
      return 'red'
    case 'warning':
      return 'orange'
    case 'success':
      return 'green'
    default:
      return ''
  }
}

setTimeout(() => {
  const toast = document.querySelector('.toast')
  toast.style.display = 'none'
}, props.delay)
</script>

<template>
  <div class="toast" @click="hide">
    <div class="left">
      <div class="icon">
        <i :class="icon()" :style="{ color: color() }"></i>
      </div>
    </div>
    <div class="right">
      <div class="title">{{ props.type }}</div>
      <div class="message">{{ props.message }}</div>
    </div>
  </div>
</template>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.toast {
  position: fixed;
  top: 40px;
  right: 20px;
  opacity: 1;
  display: flex;
  flex-direction: row;
  padding: 8px;
  border-left: 10px solid v-bind(color());
  animation:
    appearToast 1s ease-in-out,
    hideToast 1.5s ease-in-out 3s forwards;
}

@keyframes appearToast {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
}

@keyframes hideToast {
  to {
    opacity: 0;
  }
}

.left {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
}

.left i {
  font-size: 26px;
}

.title {
  color: black;
  font-size: 20px;
  font-weight: bold;
  text-transform: capitalize;
}

.message {
  font-size: 16px;
  color: black;
}
</style>
