<script setup>
import { ref } from 'vue'
import * as yup from 'yup'
import { Form, Field, ErrorMessage } from 'vee-validate'

const forgetFormSchema = yup.object().shape({
  userEmail: yup
    .string()
    .required('Trường này bắt buộc phải có giá trị')
    .test('userEmail', 'Tên tài khoản hoặc email không hợp lệ.', (value) => {
      if (value.includes('@')) return yup.string().email().isValidSync(value)
      return yup.string().min(2).max(50).isValidSync(value)
    }),
  newPassword: yup
    .string()
    .required('Mật khẩu phải có giá trị.')
    .min(8, 'Mật khẩu phải ít nhất 8 ký tự.'),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref('newPassword')], 'Mật khẩu không khớp')
})

const forgetInfo = ref({
  usernameEmail: '',
  password: '',
  confirmPassword: ''
})

const $emit = defineEmits(['submit:forget'])

function submitForget() {
  if (yup.string().email().isValidSync(forgetInfo.value.usernameEmail)) {
    $emit('submit:forget', {
      email: forgetInfo.value.usernameEmail,
      newPassword: forgetInfo.value.password
    })
  } else {
    $emit('submit:forget', {
      username: forgetInfo.value.usernameEmail,
      newPassword: forgetInfo.value.password
    })
  }
}
</script>

<template>
  <Form :validation-schema="forgetFormSchema" @submit="submitForget" class="form">
    <h1>Quên mật khẩu</h1>
    <div class="form-group">
      <label for="userEmail">Tên tài khoản/ Email</label>
      <Field name="userEmail" type="text" class="form-control" v-model="forgetInfo.usernameEmail" />
      <ErrorMessage name="userEmail" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="newPassword">Mật khẩu</label>
      <Field
        name="newPassword"
        type="password"
        class="form-control"
        v-model="forgetInfo.password"
      />
      <ErrorMessage name="newPassword" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="confirmPassword">Xác nhận mật khẩu</label>
      <Field
        name="confirmPassword"
        type="password"
        class="form-control"
        v-model="forgetInfo.confirmPassword"
      />
      <ErrorMessage name="confirmPassword" class="error-feedback" />
    </div>
    <button class="submit" type="submit">Xác nhận</button>
  </Form>
  <div class="navigate signup">
    Quay lại trang
    <RouterLink class="sub-button" :to="'/login'" :replace="true">Đăng nhập</RouterLink>
  </div>
</template>

<style scoped>
@import '../assets/css/form.css';
</style>
