<script setup lang="ts">
import {useField} from 'vee-validate';

const props = defineProps({
  name: {
    type: String,
    default: null,
  },
  modelValue: String,
  label: {
    type: String,
    default: "",
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
  counter: {
    type: Number,
    default: 0
  },
  placeholder: {
    type: String,
    default: ""
  },
});

const {value, errorMessage} = useField(() => props.name, undefined, {
  syncVModel: true,
})
</script>

<template>
  <label for="type" class="text-md font-medium mb-1 px-1" :class="labelClass">{{ label }}</label>
  <textarea
    v-model="value"
    :name="name"
    :placeholder="placeholder"
    :class="`${{ 'base-text-input-error': errorMessage }} ${inputClass} focus-visible:outline-0`"
    @input="$emit('input', $event.target.value)"
    :disabled="disabled"
  ></textarea>
  <div class="flex justify-between mt-1 px-2">
    <span class="text-red-500 text-xs">{{ errorMessage }}</span>
    <span v-if="counter > 0" :class="value?.length > counter? 'text-red-500':''">{{value?.length||0}}/{{counter}}</span>
  </div>
</template>
<style scoped>
.base-text-input-error {
  @apply border-[#fd0b0be7] !important;
}

.base-text-input-error:focus {
  @apply border-[#fd0b0be7] !important;
}
</style>

