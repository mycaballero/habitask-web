<template>
  <section :class="isOpen? 'w-80' : 'w-16'"
           class=" flex flex-col justify-between bg-red-350 h-screen pt-6 transition-all">
    <div :class="isOpen ? 'px-4' : 'px-2'">
      <div class="px-2 h-10 mb-5">
        <button class="block" @click="changeSection('/')">
          <img
              :class="isOpen? 'scale-100' : 'scale-0'"
              class="hover:drop-shadow-[0_1px_4px_rgba(255,255,255,0.50)] block absolute h-8 transition-all"
              :src="'./src/assets/img/svg/HaBitask-logo-large.svg'"
              alt="logo Active One"
          />
          <img
              :class="isOpen? 'scale-0' : 'scale-100'"
              class="hover:drop-shadow-[0_1px_4px_rgba(255,255,255,0.50)] block absolute h-8 transition-all"
              :src="'./src/assets/img/svg/Habitask-logo.svg'"
              alt="logo Active One"
          />
        </button>
      </div>
      <nav class="overflow-y-auto max-h-80" :class="isOpen ? 'pl-3' : ''">
        <ul>
          <li v-for="item in list" :key="item.name"
              :class="`${isOpen? 'px-3' : 'justify-center px-2'} ${item.route === currentRoutePath? 'bg-tertiary-90/80 ':''}`"
              class="h-10 group w-full hover:bg-tertiary-90/80 rounded-lg mb-2 flex align-middle">
            <button class="w-full" @click="changeSection(item.route)">
              <span class="text-lg text-white/50 font-medium group-hover:text-white transition-all">
                <span v-if="isOpen" class="flex align-middel text-white">
                  <Icon :icon="item.icon" class="mr-2" height="25px"/> {{item.name}}
                </span>
                <span v-else class="text-white"> <Icon class="mx-auto" :icon="item.icon" height="25px"/> </span>
              </span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
    <div class="flex flex-wrap">
      <div v-if="!phone" :class="isOpen? 'justify-end mr-2' : 'justify-center'" class="flex w-full mb-2">
        <button class="btn px-2.5 text-white" @click="isOpen = !isOpen">
          <span>
            <Icon :icon="isOpen? 'ic:baseline-menu-open' : 'ic:baseline-menu'" height="25px"/>
          </span>
        </button>
      </div>
      <div class="flex flex-nowrap items-stretch w-full bg-gray-600">
        <div :class="isOpen? 'w-3/12 p-2' : 'w-full'" class="flex justify-end items-center">
          <button class="avatar" @click="changeSection('/')">
            <img class="rounded-full hover:drop-shadow-[0_1px_4px_rgba(255,255,255,0.50)] transition-all"
                 referrerpolicy="no-referrer"
                 :src="'./src/assets/img/png/tasker.png'"
                 :alt="user.name"
            />
          </button>
        </div>
        <div :class="isOpen? 'w-7/12' : 'hidden'" class="flex items-center transition-all">
          <div class="text-white">
            <p class="font-medium cursor-default" v-text="userName"></p>
          </div>
        </div>
        <div :class="isOpen? 'w-2/12' : 'hidden'" class="flex justify-center pt-2">
          <div class="tooltip" data-tip="Cerrar sesión">
            <button class="h-6" @click="logout()">
              <Icon icon="ic:baseline-log-out" class="hover:text-white transition-all"/>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import {computed, inject, onBeforeUnmount, onMounted, ref} from 'vue'
import {Icon} from '@iconify/vue'
import {LOGOUT_URL} from '@/constants/urlConstants'
import {useAuthStore} from "@/stores/auth.store"
import {useRouter} from "vue-router"

const router = useRouter()
const authStore = useAuthStore()
const useFetch = inject('useFetchDefault')
const list = ref([])
const phone = ref(false)
const isOpen = ref(true)
const user = ref({
  name: authStore.user?.name,
})
const updatePhoneStatus = () => {
  phone.value = window.innerWidth < 500
  if (phone.value) {
    isOpen.value = false
  }
}

onBeforeUnmount(() => {
  window.removeEventListener('resize', updatePhoneStatus)
})

const userName = computed(() => {
  return authStore.user?.name.length > 22 ? authStore.user?.name.slice(0, 22) : authStore.user?.name;
})

const currentRoutePath = computed(() => router.currentRoute.value.path)

const logout = async () => {
  try {
    const {response} = await useFetch(LOGOUT_URL)
    if (response.value.ok) {
      authStore.logout()
      await router.push({name: 'login'})
    }
  } catch (error) {
    console.error(error)
  }
}

const changeSection = async (route) => {
  await router.push({path: route})
}

onMounted(async () => {
  updatePhoneStatus()
  window.addEventListener('resize', updatePhoneStatus)
  list.value = [
    {
      name: 'Inicio',
      icon: 'ic:round-home',
      route: '/',
    },
    {
      name: 'Tareas',
      icon: 'ic:outline-inventory',
      route: '/tasks',
    },
  ]
})

</script>
