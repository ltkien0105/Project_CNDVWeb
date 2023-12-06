<script setup>
defineProps({
  modelValue: { type: String, default: "" },
});

const $emit = defineEmits(["submit", "update:modelValue"]);
</script>

<template>
  <div class="input-group">
    <input
      type="text"
      class="form-control px-3"
      placeholder="Nhập thông tin cần tìm"
      :value="modelValue"
      @input="(e) => $emit('update:modelValue', e.target.value)"
      @keyup.enter="$emit('submit')"
    />
    <div class="input-group-append">
      <button
        class="btn btn-outline-secondary"
        type="button"
        @click="$emit('submit')"
      >
        <i class="fas fa-search"></i>
      </button>
    </div>
  </div>
</template>
