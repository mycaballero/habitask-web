<script setup>

const props = defineProps({
    dialog: Boolean,
    classes: String
  })

</script>

<template>
  <dialog class="modal" :open="props.dialog" data-theme="light">
    <div class="modal-box" :class="props.classes">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" @click="$emit('close')">✕</button>
      <slot/>
    </div>
  </dialog>
</template>