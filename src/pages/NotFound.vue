<template>
  <div class="grid place-items-center h-screen">
    <div class="text-center">
      <h2 class="text-9xl font-bold bg-gradient-to-r from-secondary-90 to-tertiary-90 bg-clip-text text-transparent animate-gradient">404</h2>
      <p class="mb-10">¿No encunetras lo que buscabas?</p>
      <button @click="router.push({name: 'home'})">intenta de nuevo</button>
    </div>
  </div>
</template>

<script setup>
import router from "@/router"
</script>

<style scoped>
  .animate-gradient {
    animation: gradientMove 3s linear infinite;
  }

  @keyframes gradientMove {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0 50%;
    }
  }


</style>
