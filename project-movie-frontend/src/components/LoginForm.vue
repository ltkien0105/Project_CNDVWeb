<script setup>
import { ref } from 'vue'
import * as yup from 'yup'
import { Form, Field, ErrorMessage } from 'vee-validate'

const loginFormSchema = yup.object().shape({
  userEmail: yup
    .string()
    .required('Trường này bắt buộc phải có giá trị')
    .test('userEmail', 'Tên tài khoản hoặc email không hợp lệ.', (value) => {
      if (value.includes('@')) return yup.string().email().isValidSync(value)
      return yup.string().min(2).max(50).isValidSync(value)
    }),
  password: yup
    .string()
    .required('Mật khẩu phải có giá trị.')
    .min(8, 'Mật khẩu phải ít nhất 8 ký tự.')
})

const loginInfo = ref({
  usernameEmail: '',
  password: ''
})

const $emit = defineEmits(['submit:login'])

function submitLogin() {
  if (yup.string().email().isValidSync(loginInfo.value.usernameEmail)) {
    $emit('submit:login', {
      email: loginInfo.value.usernameEmail,
      password: loginInfo.value.password
    })
  } else {
    $emit('submit:login', {
      username: loginInfo.value.usernameEmail,
      password: loginInfo.value.password
    })
  }
}
</script>

<template>
  <Form :validation-schema="loginFormSchema" class="form" @submit="submitLogin">
    <h1>Đăng nhập</h1>
    <div class="form-group">
      <label for="userEmail">Tên tài khoản/ Email</label>
      <Field name="userEmail" type="text" class="form-control" v-model="loginInfo.usernameEmail" />
      <ErrorMessage name="userEmail" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="password">Mật khẩu</label>
      <Field name="password" type="password" class="form-control" v-model="loginInfo.password" />
      <ErrorMessage name="password" class="error-feedback" />
    </div>
    <button class="submit" type="submit">Đăng nhập</button>
  </Form>
  <div class="navigate">
    <RouterLink class="sub-button" :to="'/forget'">Quên mật khẩu?</RouterLink>
    <RouterLink class="sub-button" :to="'/signup'" :replace="true">Đăng ký</RouterLink>
  </div>
</template>

<style scoped>
@import '../assets/css/form.css';
</style>
