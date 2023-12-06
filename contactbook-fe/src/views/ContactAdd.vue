<script setup>
import { ref } from "vue";
import ContactForm from "@/components/ContactForm.vue";
import { useContact } from "@/composables/useContact";

const { createContact } = useContact();

const contact = ref({
  name: "",
  email: "",
  address: "",
  phone: "",
  favorite: 0,
});

const message = ref("");

async function onCreateContact(addedContact) {
  try {
    createContact(addedContact);
    message.value = "Liên hệ được thêm thành công.";
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <div v-if="contact" class="page">
    <h4>Thêm Liên hệ</h4>
    <ContactForm :initial-contact="contact" @submit:contact="onCreateContact" />
    <p>{{ message }}</p>
  </div>
</template>
