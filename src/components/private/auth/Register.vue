<script setup>

</script>

<template>
  <div class="w-full flex justify-center">
    <div class="w-6/12 relative min-h-screen flex flex-col sm:justify-center items-center">
      <div class="relative sm:max-w-sm w-full">
        <div class="relative w-full rounded-3xl  px-6 py-4 shadow-md">
          <label for="" class="block mt-3 text-sm text-gray-700 text-center font-semibold">
            Registrate
          </label>
          <form method="#" action="#" class="mt-10">
            <div>
              <input type="text" placeholder="Nombres" class="mt-1 px-3 block w-full border-none bg-gray-100 h-11
              rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0">
            </div>
            <div class="mt-7">
              <input type="email" placeholder="Correo electronico" class="mt-1 px-3 block w-full border-none
              bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0">
            </div>
            <div class="mt-7">
              <input type="password" placeholder="Contraseña" class="mt-1 px-3 block w-full border-none bg-gray-100 h-11
              rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0">
            </div>
            <div class="mt-7">
              <input type="password" placeholder="Confirmar contraseña" class="mt-1 px-3 block w-full border-none
              bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0">
            </div>
            <div class="mt-7">
              <button class="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner
              focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                Registrar
              </button>
            </div>

            <div class="flex mt-7 items-center text-center">
              <hr class="border-gray-300 border-1 w-full rounded-md">
              <label class="block font-medium text-sm text-gray-600 w-full">
                Registrate con
              </label>
              <hr class="border-gray-300 border-1 w-full rounded-md">
            </div>
            <div class="flex mt-7 justify-center w-full">
              <button class="mr-5 bg-blue-500 border-none px-4 py-2 rounded-xl cursor-pointer text-white shadow-xl
              hover:shadow-inner transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                Facebook
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