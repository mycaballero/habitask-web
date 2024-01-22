<script setup>

import BaseModal from "@/components/global/modals/BaseModal.vue"
import BaseTextInput from "@/components/global/inputs/BaseTextInput.vue"
import {inject, onMounted, ref} from "vue"
import BaseSelectInput from "@/components/global/inputs/BaseSelectInput.vue"
import BaseButton from "@/components/global/buttons/BaseButton.vue"
import {TASKS_URL, USERS_URL} from "@/constants/urlConstants.js"

const useFetch = inject('useFetchDefault')

const props = defineProps({
  modal: {
    type: Boolean,
    required: false,
  },
  model: {
   type: Object,
    required: null
  }
})

const emit = defineEmits([
  'close', 'save'
])
const disabled = ref(false)
const users = ref([])
const model = ref({
  name: null,
  description: null,
  assigned_id: null,
  start_date: null,
  end_date: null
})

const getUsers = async () => {
  try {
    const {data, response} = await useFetch(USERS_URL).json()
    if (response.value.ok) {
      users.value = data.value
    }
  } catch (e) {
    console.error(e)
  }
}


const onSubmit = () => {
  disabled.value = true
  save()
  disabled.value = false
}

const save = async () => {
  try {
    const {response} = model.value.edit
        ? await useFetch(`${TASKS_URL}/${model.value.id}`).put(model.value).json()
        : await useFetch(TASKS_URL).post(model.value).json()
    if (response.value?.ok) {
      emit('save')
      clearModel()
    }
  } catch (e) {
    console.error(e)
  }
}
const clearModel = () => {
  model.value = {
    name: null,
    description: null,
    assigned_id: null,
    start_date: null,
    end_date: null
  }
}

const getModel = () => {
  if (props.model) {
    model.value = {
      id: props.model.id,
      name: props.model.name,
      owner_id: props.model.owner.id,
      description: props.model.description,
      assigned_id: props.model.assigned.id,
      start_date: props.model.start_date,
      end_date:props.model.end_date,
      edit: true
    }
  }
}

onMounted(async () => {
  disabled.value = true
  await getUsers()
  getModel()
  disabled.value = false
})
</script>

<template>
<BaseModal  :dialog="dialog" title="Tarea"
            classes="max-w-full mx-auto md:w-[1000px] h-screen md:h-auto items-start" @close="$emit('close')">
  <template #content>
    <div class="md:rounded-xl w-full h-auto modal-panlel overflow-y-auto scroll">
      <form novalidate @submit.prevent="onSubmit" class="flex flex-wrap gap-y-2">
        <div class="w-full flex flex-wrap justify-center">
          <div class="w-full relative flex flex-col items-center">
            <div class="grid grid-cols-2 gap-x-10 px-2 w-full">
              <div>
                <BaseTextInput
                    v-model="model.name"
                    label="Nombre"
                    name="name"
                />
              </div>
              <div>
                <BaseTextInput
                    input-class=""
                    counter="300"
                    v-model="model.description"
                    label="Descripción"
                    name="name"
                />
              </div>
              <div>
                <BaseSelectInput
                    name="assigned"
                    v-model="model.assigned_id"
                    :options="users"
                    item-text="name"
                    item-value="id"
                    label="Encargado"
                    />
              </div>
              <div>
                <BaseTextInput
                  v-model="model.start_date"
                  label="Fecha de inicio"
                  type="date"
                  name="startDate"
                  :disabled="false"
                  />
              </div>
              <div>
                <BaseTextInput
                    v-model="model.end_date"
                    label="Fecha fin"
                    type="date"
                    name="endDate"
                    :disabled="false"
                />
              </div>
            </div>
          </div>
          <div class="my-2">
            <BaseButton :disabled="disabled" text="Guardar" />
          </div>
        </div>
      </form>
    </div>
  </template>
</BaseModal>
</template>

<style scoped>

</style>