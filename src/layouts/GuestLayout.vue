<script setup>

</script>

<template>
  <div class="bg-image-moved">
    <router-view/>
  </div>
</template>

<style>
  .bg-image-moved {
    background-image: url("/src/assets/img/svg/background-task.svg");
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