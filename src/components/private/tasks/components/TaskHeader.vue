<script setup>

import BaseButton from "@/components/global/buttons/BaseButton.vue"

const emit = defineEmits(['showModal'])
</script>

<template>
  <div class="w-full flex justify-between items-center mb-6">
    <div>
      <h3 class="text-secondary-90 font-bold text-xl">Tareas</h3>
      <p class="mt-4 text-secondary-90">
        Hay que gestionar las
        <span class="font-bold">tareas</span>
      </p>
    </div>
    <div>
      <BaseButton text="Crear tarea" @click="emit('showModal')" />
    </div>
  </div>
</template>

<style scoped>

</style>