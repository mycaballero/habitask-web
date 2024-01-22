<script setup>

import SideBar from '@/layouts/components/SideBar.vue'

</script>

<template>
  <div class="flex max-h-screen">
    <SideBar class="flex-none"/>
    <div class="grow max-h-full overflow-hidden overflow-y-auto">
    <router-view/>
    </div>
  </div>
</template>

<style scoped>

</style>