<script setup>
import {useField} from "vee-validate"

defineProps({
  name: {
    type: String,
    default: null,
  },
  modelValue: String,
  label: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: ""
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: "text",
  },
  inputClass: {
    type: String,
    default: "",
  },
  labelClass: {
    type: String,
    default: "",
  },
})

const { value, errorMessage } = useField(() => name, undefined, {
  syncVModel: true,
})

</script>

<template>
  <label for="type" class="text-md font-medium mb-1 px-1" :class="labelClass">{{ label }}</label>
  <input
      v-model="value"
      :name="name"
      :type="type"
      :placeholder="placeholder"
      class="mt-1 px-3 block w-full border-none bg-gray-100 h-11 focus-visible:outline-0
              rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
      :class="`${{ 'base-text-input-error': errorMessage }} ${inputClass}`"
      @input="$emit('input', $event.target.value)"
      :disabled="disabled"
  />
  <span class="text-red-500 text-xs mt-1 pl-2">{{ errorMessage }}</span>
</template>

<style scoped>

</style>