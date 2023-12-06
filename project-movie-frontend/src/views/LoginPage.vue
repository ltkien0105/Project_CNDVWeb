<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import LoginForm from '../components/LoginForm.vue'
import ToastComponent from '../components/ToastComponent.vue'
import useAuth from '../composables/useAuth'

const router = useRouter()

const { signIn } = useAuth()

const toasts = ref([])
let toastId = 1
function onLogin(loginInfo) {
  try {
    signIn(loginInfo, {
      onSuccess: (response) => {
        if (!response.token) {
          toasts.value = [
            {
              id: toastId++,
              type: 'error',
              message: response.message
            }
          ]
        } else {
          router.push('/')
        }
      },
      onError: (error) => {
        console.log(error)
      }
    })
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div class="form-component">
    <img src="../assets/images/poster.png" alt="poster" />
    <div class="form-box">
      <h1 class="logo">
        <img
          src="../assets/images/logo.svg"
          alt="Logo"
          width="40"
          height="35"
          class="d-inline-block align-text-top"
        />
        Movie
      </h1>
      <LoginForm @submit:login="onLogin"></LoginForm>
    </div>
    <ToastComponent
      v-for="toast in toasts"
      :key="toast.id"
      :type="toast.type"
      :message="toast.message"
    ></ToastComponent>
  </div>
</template>

<style scoped>
@import '../assets/css/form-page.css';
</style>
