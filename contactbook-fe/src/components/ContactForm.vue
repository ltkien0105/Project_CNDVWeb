<script setup>
import { ref } from "vue";
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

const props = defineProps({
  initialContact: { type: Object, required: true },
});

const $emit = defineEmits(["submit:contact", "delete:contact"]);

const contactFormSchema = yup.object().shape({
  name: yup
    .string()
    .required("Tên phải có giá trị.")
    .min(2, "Tên phải ít nhất 2 ký tự.")
    .max(50, "Tên có nhiều nhất 50 ký tự."),
  email: yup
    .string()
    .email("E-mail không đúng.")
    .max(50, "E-mail tối đa 50 ký tự."),
  address: yup.string().max(100, "Địa chỉ tối đa 100 ký tự."),
  phone: yup
    .string()
    .matches(
      /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/g,
      "Số điện thoại không hợp lệ."
    ),
});

const editedContact = ref({ ...props.initialContact });

function submitContact() {
  $emit("submit:contact", editedContact.value);
}

function deleteContact() {
  $emit("delete:contact", editedContact.value.id);
}
</script>

<template>
  <Form @submit="submitContact" :validation-schema="contactFormSchema">
    <div class="form-group">
      <label for="name">Tên</label>
      <Field
        name="name"
        type="text"
        class="form-control"
        v-model="editedContact.name"
      />
      <ErrorMessage name="name" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="email">E-mail</label>
      <Field
        name="email"
        type="email"
        class="form-control"
        v-model="editedContact.email"
      />
      <ErrorMessage name="email" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="address">Địa chỉ</label>
      <Field
        name="address"
        type="text"
        class="form-control"
        v-model="editedContact.address"
      />
      <ErrorMessage name="address" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="phone">Điện thoại</label>
      <Field
        name="phone"
        type="tel"
        class="form-control"
        v-model="editedContact.phone"
      />
      <ErrorMessage name="phone" class="error-feedback" />
    </div>

    <div class="form-group form-check">
      <Field
        name="favorite"
        type="checkbox"
        class="form-check-input"
        v-model="editedContact.favorite"
        :value="1"
        :unchecked-value="0"
      />
      <label for="favorite" class="form-check-label">
        <strong>Liên hệ yêu thích</strong>
      </label>
    </div>

    <div class="form-group">
      <button class="btn btn-primary">Lưu</button>
      <button
        v-if="editedContact.id"
        type="button"
        class="ml-2 btn btn-danger"
        @click="deleteContact"
      >
        Xóa
      </button>
    </div>
  </Form>
</template>

<style scoped>
@import "@/assets/form.css";
</style>
