<template>
  <div class="min-h-screen bg-gray-50 py-20 px-6">
    <div class="max-w-md mx-auto">
      <NuxtLink
        to="/account"
        class="group flex items-center gap-2 text-gray-400 hover:text-black transition-colors mb-8"
      >
        <Icon
          name="lucide:arrow-left"
          class="w-4 h-4 transition-transform group-hover:-translate-x-1"
        />
        <span class="text-[10px] font-black uppercase tracking-widest"
          >Back to Account</span
        >
      </NuxtLink>

      <div
        class="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm"
      >
        <header class="mb-10">
          <h1
            class="text-3xl font-black text-gray-900 tracking-tighter uppercase"
          >
            Security<span class="text-indigo-600">.</span>
          </h1>
          <p
            class="text-gray-400 text-xs font-bold uppercase mt-2 tracking-widest"
          >
            Update your password
          </p>
        </header>

        <form @submit.prevent="handleChangePassword" class="space-y-6">
          <div>
            <label
              class="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 ml-1"
              >Current Password</label
            >
            <div class="relative" key:showoldPassword>
              <input
                v-model="form.oldPassword"
                :type="showoldPassword ? 'text' : 'password'"
                required
                class="w-full px-6 py-4 bg-gray-100 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-500 focus:ring-0 transition-all font-bold"
                placeholder="••••••••"
              />

              <button
                type="button"
                @click="showoldPassword = !showoldPassword"
                class="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                <Icon
                  :name="showoldPassword ? 'lucide:eye-off' : 'lucide:eye'"
                  class="w-4 h-4 text-gray-400"
                />
              </button>
            </div>
          </div>

          <hr class="border-gray-100 my-4" />

          <div>
            <label
              class="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 ml-1"
              >New Password</label
            >
            <div class="relative" key:shownewPassword>
              <input
                v-model="form.newPassword"
                :type="shownewPassword ? 'text' : 'password'"
                required
                class="w-full px-6 py-4 bg-gray-100 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-500 focus:ring-0 transition-all font-bold"
                placeholder="••••••••"
              />

              <button
                type="button"
                @click="shownewPassword = !shownewPassword"
                class="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                <Icon
                  :name="shownewPassword ? 'lucide:eye-off' : 'lucide:eye'"
                  class="w-4 h-4 text-gray-400"
                />
              </button>
            </div>
          </div>

          <div>
            <label
              class="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 ml-1"
              >Confirm New Password</label
            >
            <div class="relative" key:showPassword>
              <input
                v-model="form.confirmPassword"
                :type="showPassword ? 'text' : 'password'"
                required
                class="w-full px-6 py-4 bg-gray-100 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-500 focus:ring-0 transition-all font-bold"
                placeholder="••••••••"
              />

              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                <Icon
                  :name="showPassword ? 'lucide:eye-off' : 'lucide:eye'"
                  class="w-4 h-4 text-gray-400"
                />
              </button>
            </div>
          </div>

          <p
            v-if="status.message"
            :class="status.error ? 'text-red-500' : 'text-green-500'"
            class="text-[10px] font-black uppercase text-center tracking-widest"
          >
            {{ status.message }}
          </p>

          <button
            type="submit"
            :disabled="status.loading"
            class="w-full bg-black text-white py-5 rounded-2xl font-black uppercase text-xs tracking-[0.3em] hover:bg-indigo-600 transition-colors disabled:bg-gray-200"
          >
            {{ status.loading ? "Updating..." : "Update Password" }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const showoldPassword = ref(false);
const shownewPassword = ref(false);
const showPassword = ref(false);

const form = reactive({
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const status = reactive({
  loading: false,
  message: "",
  error: false,
});

async function handleChangePassword() {
  if (form.newPassword !== form.confirmPassword) {
    status.error = true;
    status.message = "New passwords do not match";
    return;
  }

  status.loading = true;
  status.message = "";

  try {
    const response = await $fetch("/api/auth/changePassword", {
      method: "POST",
      body: {
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
      },
    });

    status.error = false;
    status.message = "Password updated successfully!";

    setTimeout(() => router.push("/account"), 1000);
  } catch (err: any) {
    status.error = true;
    status.message = err.data?.statusMessage || "Failed to update password";
  } finally {
    status.loading = false;
  }
}
</script>
