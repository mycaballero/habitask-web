<script setup>
import {inject, onMounted} from 'vue'
import {useAuthStore} from '@/stores/auth.store.js'
import {useRoute, useRouter} from 'vue-router'
import {AUTH_CALLBACK_URL} from "@/constants/urlConstants.js"

const useFetch = inject('useFetchDefault')
const authStore = useAuthStore()
const router = useRouter()

const oauthCallback = async (params) => {
  try {
    const queryParams = new URLSearchParams(params).toString()
    const url = `${AUTH_CALLBACK_URL}/facebook/callback?${queryParams}`
    const {data} = await useFetch(url).json()
    authStore.setToken(data.value.token)
    authStore.setUser(data.value.user)
    await router.push({name: 'home'})
  } catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
  const queryParams = useRoute().query
  await oauthCallback(queryParams)
})
</script>

<template>
  <div class="w-full flex justify-center">
    <span class="loading loading-spinner loading-lg text-gray-500"></span>
  </div>
</template>

<style scoped>

</style>