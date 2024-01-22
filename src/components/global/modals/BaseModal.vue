<template>
  <dialog class="modal" :open="dialog" data-theme="light">
    <div class="modal-box bg-tertiary-90 border-solid border-black p-6" :class="classes">
      <div class="flex justify-between w-full">
        <h3 class="text-xl text-red-350 font-bold mt-1">{{ title }}</h3>
        <button class="btn btn-sm btn-circle" @click="$emit('close')">
          <Icon icon="typcn:times" height="25px"/>
        </button>
      </div>
      <div class="flex pt-6 px-2">
        <slot name="content" />
      </div>
    </div>
  </dialog>
</template>
<script setup>
import {Icon} from "@iconify/vue"

defineProps({
  dialog: Boolean,
  classes: {
    type: String,
    required: false
  },
  title: String
})
</script>

<style>
/* Estilos personalizados para la barra de desplazamiento */
.modal-panlel {
  position: relative;
  max-height: calc(100vh - 15em);

}

.scroll::-webkit-scrollbar {
  width: 8px; /* Ajusta el ancho de la barra de desplazamiento */
}

.scroll::-webkit-scrollbar-thumb {
  background-color: #cacaca; /* Cambia el color del pulgar de la barra de desplazamiento */
  border-radius: 10px;
}

.scroll::-webkit-scrollbar-track {
  background-color: transparent; /* Cambia el color de la pista de la barra de desplazamiento */
}
</style>
