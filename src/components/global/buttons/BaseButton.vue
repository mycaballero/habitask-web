<template>
  <button
      class="bg-red-350 hover:shadow-lg hover:text-white border-none font-semibold text-tertiary-90 rounded-lg px-4
      transition-all h-10 cursor-pointer duration-500 ease-in-out transform hover:-translate-x hover:scale-105"
      :class="disabled?'opacity-50':'oapcity-100'"
      :disabled="disabled"
      @click="emit('click')">{{text}}<slot></slot>
  </button>
</template>
<script setup>
defineProps({
  disabled: {
    type: Boolean,
    required: false
  },
  text: {
    type: String,
  }
})

const emit = defineEmits(['click'])
</script>
