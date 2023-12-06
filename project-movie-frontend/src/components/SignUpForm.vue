<script setup>
import * as yup from 'yup'
import { ref } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate'

const signUpFormSchema = yup.object().shape({
  username: yup
    .string()
    .required('Tên tài khoản phải có giá trị.')
    .min(2, 'Tên phải ít nhất 2 ký tự.')
    .max(50, 'Tên có nhiều nhất 50 ký tự.')
    .test('username', 'Tên tài khoản không được chứa ký tự đặc biệt.', (value) => {
      return yup
        .string()
        .matches(/^[a-zA-Z0-9_]+$/, 'Tên tài khoản không được chứa ký tự đặc biệt.')
        .isValidSync(value)
    }),
  email: yup.string().required('Email phải có giá trị.').email('Email không hợp lệ.'),
  password: yup
    .string()
    .required('Mật khẩu phải có giá trị.')
    .min(8, 'Mật khẩu phải ít nhất 8 ký tự.'),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref('password')], 'Mật khẩu không khớp')
})

const registerInfo = ref({
  username: '',
  email: '',
  password: ''
})

const $emit = defineEmits(['submit:register'])

function submitRegister() {
  $emit('submit:register', registerInfo.value)
}
</script>

<template>
  <Form :validation-schema="signUpFormSchema" @submit="submitRegister" class="form">
    <h1>Đăng ký</h1>
    <div class="form-group">
      <label for="username">Tên tài khoản</label>
      <Field name="username" type="text" class="form-control" v-model="registerInfo.username" />
      <ErrorMessage name="username" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="email">Email</label>
      <Field name="email" type="text" class="form-control" v-model="registerInfo.email" />
      <ErrorMessage name="email" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="password">Mật khẩu</label>
      <Field name="password" type="password" class="form-control" v-model="registerInfo.password" />
      <ErrorMessage name="password" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="confirmPassword">Xác nhận mật khẩu</label>
      <Field name="confirmPassword" type="password" class="form-control" />
      <ErrorMessage name="confirmPassword" class="error-feedback" />
    </div>
    <button class="submit" type="submit">Đăng ký</button>
  </Form>
  <div class="navigate signup">
    Already have an account?
    <RouterLink class="sub-button" :to="'/login'" :replace="true">Đăng nhập</RouterLink>
  </div>
</template>

<style scoped>
@import '../assets/css/form.css';
</style>
