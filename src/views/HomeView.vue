<script setup>
</script>

<template>
  <main>
      <div class="min-h-screen w-full flex items-center bg-image-moved-tasker">
        <div class="w-full">
          <div class="flex items-center justify-center">
            <img class="drop-shadow-lg" :src="'./src/assets/img/png/Haitask-logo.png'">
          </div>
          <div class="flex justify-center">
            <h2 class="drop-shadow-lg text-secondary-90 font-semibold">Binevenido a la comunidad donde logramos nuestras metas.</h2>
          </div>
        </div>
      </div>
  </main>
</template>

<style>
.bg-image-moved-tasker {
  background-image: url("/src/assets/img/png/habitask -background.png");
  background-repeat: no-repeat;
  background-size: cover;
  animation: moved 30s linear infinite;
}
@keyframes moved{
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 100% 0;
  }
  100% {
    background-position: 0 0;
  }
}
</style>
