<template>
  <div class="min-h-screen bg-gray-50 py-20 px-6">
    <div class="max-w-3xl mx-auto">
      <header class="mb-12 text-center sm:text-left">
        <p
          class="text-indigo-600 font-black uppercase text-xs tracking-[0.3em] mb-2"
        >
          Customer Dashboard
        </p>
        <h1
          class="text-5xl font-black text-gray-900 tracking-tighter uppercase"
        >
          Welcome, {{ authStore.user?.name.split(" ")[0]
          }}<span class="text-indigo-600">.</span>
        </h1>
      </header>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <NuxtLink
          to="/account/orders"
          class="group bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300"
        >
          <div
            class="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors"
          >
            <Icon
              name="lucide:package"
              class="w-6 h-6 text-indigo-600 group-hover:text-white"
            />
          </div>
          <h2 class="text-xl font-black text-gray-900 uppercase tracking-tight">
            My Orders
          </h2>
          <p
            class="text-gray-400 text-xs font-bold uppercase mt-1 tracking-widest"
          >
            View purchase history
          </p>
        </NuxtLink>

        <button
          class="group bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 text-left"
          @click="navigateTo('/account/security')"
        >
          <div
            class="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-black transition-colors"
          >
            <Icon
              name="lucide:key-round"
              class="w-6 h-6 text-gray-400 group-hover:text-white"
            />
          </div>
          <h2 class="text-xl font-black text-gray-900 uppercase tracking-tight">
            Security
          </h2>
          <p
            class="text-gray-400 text-xs font-bold uppercase mt-1 tracking-widest"
          >
            Change Password
          </p>
        </button>
      </div>

      <div
        class="mt-12 pt-8 border-t border-gray-500 flex flex-col sm:flex-row items-center justify-between gap-6"
      >
        <div class="flex items-center gap-4 text-gray-400">
          <div class="w-2 h-2 bg-green-500 rounded-full"></div>
          <span class="text-[10px] font-black uppercase tracking-widest"
            >Session Active: {{ authStore.user?.email }}</span
          >
        </div>

        <button
          @click="authStore.logout"
          class="flex items-center gap-2 text-gray-400 hover:text-red-500 font-black uppercase text-xs tracking-widest transition-colors"
        >
          <Icon name="lucide:log-out" class="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const authStore = useAuthStore();

definePageMeta({});
</script>
