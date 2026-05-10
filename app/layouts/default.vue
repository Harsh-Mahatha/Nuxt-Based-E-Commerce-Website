<script setup>
const cartStore = useCartStore();
</script>

<template>
  <header class="bg-white shadow-md rounded-lg sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="shrink-0">
          <h1
            class="text-3xl font-bold text-indigo-600 cursor-pointer"
            @click="navigateTo('/')"
          >
            Sass Bazaar
          </h1>
        </div>

        <div class="flex items-center gap-4 sm:gap-6">
          <div class="flex-1 max-w-md sm:max-w-lg">
            <SearchBar />
          </div>

          <div class="flex items-center gap-3 sm:gap-4">
            <div class="relative">
              <button
                aria-label="View cart"
                class="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 cursor-pointer focus:ring-blue-500 transition"
                @click="navigateTo('/cart')"
              >
                <Icon
                  name="ph:shopping-cart-bold"
                  class="w-6 h-6 text-gray-700"
                />
              </button>
              <span
                v-if="cartStore.cartCount > 0"
                class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
              >
                {{ cartStore.cartCount }}
              </span>
            </div>

            <button
              aria-label="Account"
              class="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 cursor-pointer focus:ring-blue-500 transition"
              @click="navigateTo('/account')"
            >
              <Icon
                name="lucide:circle-user-round"
                class="w-6 h-6 text-gray-700"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>

  <slot />

  <footer class="bg-gray-50 border-t border-gray-200 py-6 mt-8">
    <div class="max-w-7xl mx-auto px-4 text-center">
      <p class="text-sm text-gray-500">
        &copy; {{ new Date().getFullYear() }} Sass Bazaar. All rights reserved.
      </p>
      <p class="text-sm text-gray-500">Powered By - Nuxt 4</p>
    </div>
  </footer>
</template>
