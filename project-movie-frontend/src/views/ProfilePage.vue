<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import * as yup from 'yup'
import { Form, Field, ErrorMessage } from 'vee-validate'
import AppHeader from '../components/AppHeader.vue'
import useUser from '../composables/useUser'
import useChangePassBoxStore from '../stores/changePasswordBox'
import ToastComponent from '../components/ToastComponent.vue'

const router = useRouter()
// const useChangePassBox = useChangePassBoxStore()
const { show, hide } = useChangePassBoxStore()
const { status } = storeToRefs(useChangePassBoxStore())

const changePassSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .required('Mật khẩu phải có giá trị.')
    .min(8, 'Mật khẩu phải ít nhất 8 ký tự.'),
  newPassword: yup
    .string()
    .required('Mật khẩu phải có giá trị.')
    .min(8, 'Mật khẩu phải ít nhất 8 ký tự.'),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref('newPassword')], 'Mật khẩu không khớp')
})

if (router.currentRoute.value.params.username !== localStorage.getItem('username')) {
  router.replace({ name: 'profile', params: { username: localStorage.getItem('username') } })
}
const app = document.getElementById('app')
app.style.height = '100vh'

const user = ref({
  username: localStorage.getItem('username'),
  email: localStorage.getItem('email')
})

const changePassValue = ref({
  currentPass: '',
  newPass: '',
  confirmPass: ''
})
const toasts = ref([])
let toastId = 1
const { changePassword, deleteUser } = useUser()

function onChangePassword() {
  if (changePassValue.value.newPass !== changePassValue.value.confirmPass) {
    toasts.value = [
      {
        id: toastId,
        type: 'error',
        message: 'Confirm password is not match'
      }
    ]
    return
  }

  changePassword(
    {
      username: user.value.username,
      curPass: changePassValue.value.currentPass,
      newPass: changePassValue.value.newPass
    },
    {
      onSuccess: (response) => {
        if (response.username) {
          toasts.value = [
            {
              id: toastId++,
              type: 'success',
              message: `Update password successfully`
            }
          ]
        } else {
          toasts.value = [
            {
              id: toastId++,
              type: 'error',
              message: response.message
            }
          ]
        }
      }
    }
  )
}

function onDeleteUser() {
  if (confirm('Are you sure to delete your account?')) {
    deleteUser(user.value.username, {
      onSuccess: (response) => {
        if (response.message) {
          localStorage.removeItem('token')
          localStorage.removeItem('username')
          localStorage.removeItem('email')
          router.push('/login')
        } else {
          toasts.value = [
            {
              id: toastId++,
              type: 'error',
              message: response.message
            }
          ]
        }
      }
    })
  } else {
    return
  }
}
</script>

<template>
  <AppHeader></AppHeader>
  <div class="form-component">
    <h2>Profile</h2>
    <div class="form-group">
      <label for="username">Username</label>
      <input type="text" class="form-control" :value="user.username" disabled />
    </div>
    <div class="form-group">
      <label for="email">Email</label>
      <input type="text" class="form-control" :value="user.email" disabled />
    </div>
    <button @click="show">Change password</button>
    <button class="delete" @click.prevent="onDeleteUser">Delete account</button>
  </div>
  <div v-if="status" id="modal" class="change-pass" @click.prevent="hide">
    <Form
      :validation-schema="changePassSchema"
      @submit.prevent="onChangePassword"
      class="change-pass-box"
    >
      <h2>Change password</h2>
      <div class="form-group">
        <label for="currentPassword">Current password</label>
        <Field
          name="currentPassword"
          type="password"
          class="form-control"
          v-model="changePassValue.currentPass"
        />
        <ErrorMessage name="currentPassword" class="error-feedback" />
      </div>
      <div class="form-group">
        <label for="newPassword">New password</label>
        <Field
          name="newPassword"
          type="password"
          class="form-control"
          v-model="changePassValue.newPass"
        />
        <ErrorMessage name="newPassword" class="error-feedback" />
      </div>
      <div class="form-group">
        <label for="confirmPassword">Confirm password</label>
        <Field
          name="confirmPassword"
          type="password"
          class="form-control"
          v-model="changePassValue.confirmPass"
        />
        <ErrorMessage name="confirmPassword" class="error-feedback" />
      </div>
      <button class="apply" @click.prevent="onChangePassword">Apply</button>
    </Form>
  </div>
  <ToastComponent
    v-for="toast in toasts"
    :key="toast.id"
    :type="toast.type"
    :message="toast.message"
  ></ToastComponent>
</template>

<style scoped>
@import '../assets/css/modal.css';
.form-component {
  margin-top: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
}
.form-group {
  margin-top: 48px;
}

label {
  font-weight: bold;
}

input:disabled {
  background-color: transparent;
  border: none;
  border-bottom: 1px solid black;
  border-radius: 0px;
  padding-left: 0px;
}

button {
  margin-top: 32px;
  border: none;
  background-color: transparent;
  color: red;
  font-weight: bold;
}

button.delete {
  margin-top: 16px;
}

.change-pass-box {
  background-color: white;
  padding: 32px;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
}

.apply {
  background-color: red;
  color: white;
  justify-self: center;
  padding: 8px;
}

.error-feedback {
  color: red;
}
</style>
