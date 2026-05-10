<template>
  <div
    class="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center"
  >
    <h1
      class="text-[10rem] font-black text-gray-900 tracking-tighter leading-none"
    >
      {{ error?.statusCode }}<span class="text-indigo-600">.</span>
    </h1>

    <p
      class="text-sm font-black uppercase tracking-[0.3em] text-gray-400 mt-4 mb-10"
    >
      {{ error?.statusCode === 404 ? "Page Not Found" : "An Error Occurred" }}
    </p>

    <button
      @click="handleError"
      class="bg-black text-white p-5 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-indigo-600 transition-colors"
    >
      Back to Home
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps({
  error: Object,
});

const handleError = () => clearError({ redirect: "/" });
</script>
