<script setup>

import TaskHeader from "@/components/private/tasks/components/TaskHeader.vue"
import TaskTable from "@/components/private/tasks/components/TaskTable.vue"
import TaskModal from "@/components/private/tasks/components/TaskModal.vue"
import {inject, ref} from "vue";

const dialogKey = ref(0)
const dialog = ref(false)
const tableKey = ref(0)
const model = ref(null)

const showModal = (item, value) => {
  dialog.value = item
  if (value) {
    dialogKey.value += 1
    model.value = value
  }
}

const updateModal = () => {
  console.log('cerrar')
  dialog.value = false
  tableKey.value += 1
  dialogKey.value += 1
  model.value = null
}

</script>

<template>
  <section class="w-full h-full" data-theme="light">
    <div class="p-8">
      <TaskHeader @showModal="showModal(true)"/>
      <TaskTable :key="tableKey" @edit="showModal(true, $event)"/>
      <TaskModal :key="dialogKey" :dialog="dialog" :model="model" @save="updateModal" @close="updateModal"/>
    </div>
  </section>
</template>

<style scoped>
</style>