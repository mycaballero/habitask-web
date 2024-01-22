<script setup>

import {inject, onMounted, ref} from "vue"
import {TASKS_URL} from "@/constants/urlConstants.js";
import DataTable from "@/components/global/DataTable.vue";
import BaseTextInput from "@/components/global/inputs/BaseTextInput.vue";
import {Icon} from "@iconify/vue";
import {useAuthStore} from "@/stores/auth.store.js";

const authStore = useAuthStore()
const useFetch = inject('useFetchDefault')
const tasks = ref([])
const sortBy = ["name", "assigned"]
const searchValue = ref({
  name: ''
})

const headers = [
  {text: 'Nombre', value: "name", width: 140, sortable: true},
  {text: 'Descripción', value: "description", alias: "description", width: 140, sortable: true},
  {text: 'Asignado', value: "assigned.name", width: 140, sortable: true},
  {text: 'correo', value: "assigned.email", width: 140, sortable: true},
  {text: 'Responsable', value: "owner.name", width: 140, sortable: false},
  {text: 'Inicio', value: "start_date", alias: "startDate", width: 140, sortable: false},
  {text: 'Fin', value: "end_date", alias: "endDate", width: 140, sortable: false},
  {text: 'Completado', value: "completed", width: 140, sortable: false},
  {text: "", value: "buttons"},
]

const getTasks = async () => {
  try {
    const {response, data} = await useFetch(TASKS_URL).json()
    if (response.value.ok) {
      tasks.value = data.value
    }
  } catch (e) {
    console.error(e)
  }
}

const updateStatus = async (id) => {
  try {
    const {response} = await useFetch(`${TASKS_URL}/complete/${id}`).put().json()
    if (response.value.ok) {
      clearSearch()
    }
  } catch (e) {
    console.error(e)
  }
}

const deleteExperience = async (item) => {
  try {
    const {response} = await useFetch(`${TASKS_URL}/${item.id}`).delete().json()
    if (response.value.ok) {
      clearSearch()
    }
  } catch (e) {
    console.error(e)
  }
}

const clearSearch = () => {
  searchValue.value = {
    name: ''
  }
}
onMounted(async () => {
  await getTasks()
})
</script>

<template>
  <div class="flex flex-row gap-y-2">
    <div class="flex flex-col w-full max-w-sm px-1">
      <BaseTextInput
          label-class="text-sm text-gray-500"
          input-class="text-gray-500"
          name="name"
          placeholder="Nombre o email"
          v-model="searchValue.name"
      />
    </div>
    <div class="flex flex-col px-1 justify-end mb-2.5">
      <a class="hover:cursor-pointer bg-gray-300/50 hover:bg-gray-300 text-gray-300 hover:text-black rounded-full w-8 h-8 flex justify-center items-center transition-all"
         :disabled="false"
         @click="clearSearch"
      >
        <Icon icon="ic:outline-cleaning-services" />
      </a>
    </div>
  </div>
  <div class="w-full flex flex-wrap justify-center mt-4">
  <DataTable
    :headers="headers"
    :url="TASKS_URL"
    table-class-name="border-none"
    header-class-name="text-grey-750 shadow-sm rounded"
    body-row-class-name="border-y font-medium text-grey-750"
    header-item-class-name="w-24 py-4 px-4 text-start"
    body-item-class-name="w-24 px-4 py-4"
    :search-value="searchValue"
    :sort-by="sortBy"
    ref="table"
    >
    <template #loading>
      <div class="w-full flex justify-center">
            <span class="loading loading-spinner loading-lg text-red-350">
            </span>
      </div>
    </template>
    <template #item-buttons="item">
      <div class="flex">
        <a v-if="item.owner.id === authStore.user.id" class="text-yellow-600 text-xl cursor-pointer transition-all mr-2 hover:scale-150 drop-shadow hover:drop-shadow-lg">
          <Icon icon="ph:pencil-bold" @click="$emit('edit', item)"/>
        </a>
        <span v-else class="text-gray-500 text-xl mr-2">
          <Icon icon="ph:pencil-bold" />
        </span>
        <a v-if="item.owner.id === authStore.user.id && !item.completed" class="text-red-350 text-xl cursor-pointer transition-all hover:scale-150 drop-shadow hover:drop-shadow-lg">
          <Icon icon="ph:trash-bold" @click="deleteExperience(item)"/>
        </a>
        <span v-else class="text-gray-500 text-xl mr-2">
          <Icon icon="ph:trash-bold" />
        </span>
      </div>
    </template>
    <template #item-completed="item">
      <div class="flex justify-center">
        <span v-if="item.completed" class="text-green-500 transition-all text-2xl">
          <Icon icon="ic:round-check-circle-outline" />
        </span>
        <span v-else-if="!item.completed && item.assigned.id !== authStore.user.id" class="text-gray-500 transition-all text-2xl">
          <Icon icon="ic:round-check-circle-outline" />
        </span>
        <button
            v-else
            class="text-gray-500 hover:text-green-300 transition-all text-2xl hover:scale-150 drop-shadow hover:drop-shadow-lg"
            @click="updateStatus(item.id)">
          <Icon icon="ic:round-check-circle-outline" />
        </button>
      </div>
    </template>
  </DataTable>
  </div>
</template>

<style scoped>

</style>