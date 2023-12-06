<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import ContactForm from "@/components/ContactForm.vue";
import { useContact } from "@/composables/useContact";

const { getContactItem, updateContact, deleteContact } = useContact();

const props = defineProps({
  contactId: { type: String, required: true },
});

const $router = useRouter();
const message = ref("");

const { contact } = getContactItem(props.contactId);

async function onUpdateContact(editedContact) {
  try {
    updateContact({ id: editedContact.id, contact: editedContact });
    message.value = "Liên hệ được cập nhật thành công.";
  } catch (error) {
    console.log(error);
  }
}

async function onDeleteContact(id) {
  if (confirm("Bạn muốn xóa Liên hệ này?")) {
    try {
      deleteContact(id);
      $router.push({ name: "contactbook" });
    } catch (error) {
      console.log(error);
    }
  }
}
</script>

<template>
  <div v-if="Object.keys(contact).length > 0" class="page">
    <h4>Hiệu chỉnh Liên hệ</h4>
    <ContactForm
      :initial-contact="contact"
      @submit:contact="onUpdateContact"
      @delete:contact="onDeleteContact"
    />
    <p>{{ message }}</p>
  </div>
</template>
