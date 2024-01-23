<script setup>
import {inject, ref} from 'vue'
import {FACEBOOK_REDIRECT_URL, REGISTER_URL} from "@/constants/urlConstants.js";
import router from "@/router/index.js";
import BaseTextInput from "@/components/global/inputs/BaseTextInput.vue";
import {date} from "yup";

const useFetch = inject('useFetchDefault')
const model = ref({
  email: null,
  name: null,
  password: null,
  confirmPassword: null,
})
const disabled = ref(false)
const errorMessages = ref([])
const validateErrors = ref({
  'email': 'El Correo debe ser válido.',
  'name': 'El Nombre es requerido y no debe tener más de 30 caracteres.',
  'password': 'La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial.',
  'confirmPassword': 'Las contraseñas deben coincidir.'
})
const handlerSubmit = () => {
  disabled.value = true
  errorMessages.value = []
  for (const fieldName in model.value) {
    const value = model.value[fieldName]
    if (!validateField(fieldName, value)) {
      errorMessages.value.push(validateErrors.value[fieldName])
    }
  }
  if (!errorMessages.value.length) {
    save()
  }
  disabled.value = false
}


const validateField = (fieldName, value) => {
  if (fieldName === 'email') {
    return /\S+@\S+\.\S+/.test(value)
  } else if (fieldName === 'name') {
    return value?.length < 31
  } else if (fieldName === 'password') {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)
  } else if (fieldName === 'confirmPassword') {
    return (value === model.value.password)
  }
  return true
}


const save = async () => {
  disabled.value = true
  try {
    const {response} = await useFetch(REGISTER_URL,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(model.value)
    }).json()
    if (response.value.ok) {
      await router.push({name: 'login'})
    } else {
      errorMessages.value.push('Al parecer este correo ya está registrado o no es válido.')
    }
  } catch (error) {
    console.error(error)
  }
  disabled.value = false
}

</script>

<template>
  <div class="w-full flex justify-center">
    <div class="w-full sm:w-6/12 relative min-h-screen flex flex-col sm:justify-center items-center">
      <div class="relative max-w-full sm:max-w-sm w-full">
        <div v-if="!disabled" class="relative w-full rounded-3xl  px-6 py-4 shadow-md bg-white/30">
          <h2 class="block my-3 text-sm text-gray-700 text-center font-semibold">
            Registrate
          </h2>
          <form @submit.prevent="handlerSubmit">
            <div>
              <BaseTextInput v-model="model.name" type="text" placeholder="Nombres" label-class="hidden" />
            </div>
            <div>
              <BaseTextInput v-model="model.email" type="email" placeholder="Correo electronico" label-class="hidden"/>
            </div>
            <div class="">
              <BaseTextInput  v-model="model.password" type="password" placeholder="Contraseña" label-class="hidden" />
            </div>
            <div class="">
              <BaseTextInput  v-model="model.confirmPassword" type="password" placeholder="Confirmar contraseña" label-class="hidden" />
            </div>
            <div v-if="errorMessages.length" class="p-2 mb-5 shadow-xl bg-white rounded-box text-red-600 transition-all">
              <span class="transition-all">{{errorMessages.join(' ')}}</span>
            </div>
            <div class="">
              <button :disabled="disabled" class="bg-blue-500 block w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner
              focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                Registrar
              </button>
            </div>
            <div class="mt-7">
              <div class="flex justify-center items-center">
                <label class="mr-2" >¿Ya tienes una cuenta?</label>
                <button @click="$router.push({name: 'login'})" class=" text-blue-500 transition duration-500 ease-in-out  transform hover:-translate-x
                hover:scale-105">
                  Iniciar sesion
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>