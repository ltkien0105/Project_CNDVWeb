<script setup>
import { ref } from 'vue'
import SignUpForm from '../components/SignUpForm.vue'
import ToastComponent from '../components/ToastComponent.vue'
import useAuth from '../composables/useAuth'

const { register } = useAuth()

const toasts = ref([])
let toastId = 1

function onRegister(registerInfo) {
  try {
    register(registerInfo, {
      onSuccess: (response) => {
        if (response.message) {
          toasts.value = [
            {
              id: toastId++,
              type: 'error',
              message: response.message
            }
          ]
        } else {
          toasts.value = [
            {
              id: toastId++,
              type: 'success',
              message: `Create user "${response.username}" successfully, please login!`
            }
          ]
        }
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
    <div class="form-box sign-up">
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
      <SignUpForm @submit:register="onRegister"></SignUpForm>
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
