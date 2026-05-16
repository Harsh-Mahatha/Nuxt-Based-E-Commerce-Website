<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="w-full max-w-sm p-8 bg-white rounded-xl shadow-sm">
      <h1 class="text-2xl font-medium text-gray-900 mb-6 text-center">
        Login to your Account
      </h1>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <input
            id="email"
            type="text"
            v-model="userEmail"
            placeholder="Email address"
            class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>

        <div class="relative">
          <input
            id="password"
            :type="showPassword ? 'text' : 'password'"
            v-model="password"
            placeholder="Password"
            class="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
          <button
            type="button"
            @click="showPassword = !showPassword"
            class="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer flex items-center justify-center text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            <Icon
              :name="showPassword ? 'lucide:eye-off' : 'lucide:eye'"
              class="w-4 h-4"
            />
          </button>
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
        >
          Login
        </button>
      </form>

      <p v-if="errMsg" class="mt-4 text-sm text-red-500 text-center">
        {{ errMsg }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});
const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();
const userEmail = ref("");
const password = ref("");
const showPassword = ref(false);
const errMsg = ref("");

async function handleLogin() {
  const result = await authStore.login({
    email: userEmail.value,
    password: password.value,
  });
  if (result.success) {
    const redirectTo = (route.query.redirect as string) || "/account";

    router.push(redirectTo);
  } else {
    errMsg.value = result.message;
  }
}
</script>
