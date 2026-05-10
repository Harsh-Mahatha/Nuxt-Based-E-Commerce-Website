<template>
  <div class="min-h-screen bg-white">
    <ProductCorousel />

    <div class="max-w-7xl mx-auto px-6 py-12">
      <div
        class="flex items-baseline justify-between mb-8 border-b border-gray-100 pb-4"
      >
        <h2 class="text-2xl font-black text-black uppercase tracking-tighter">
          Collections
        </h2>
        <span class="text-xs font-bold text-gray-400 uppercase tracking-widest"
          >{{ productStore.categories.size + 2 }} categories</span
        >
      </div>

      <div class="flex items-center gap-4 overflow-x-auto pb-4">
        <button
          class="whitespace-nowrap px-8 py-4 rounded-full cursor-pointer bg-black text-white text-lg font-black uppercase tracking-widest hover:bg-indigo-600 transition-colors"
          @click="navigateTo('/shop')"
        >
          Shop All
        </button>

        <button
          class="whitespace-nowrap px-8 py-4 rounded-full cursor-pointer bg-gray-100 text-gray-900 text-lg font-black uppercase tracking-widest hover:bg-gray-200 transition-colors"
          @click="navigateTo('/shop?sort=ratingDecreasing')"
        >
          Top Rated
        </button>

        <div class="w-px h-8 bg-gray-200 mx-2 shrink-0"></div>

        <button
          v-for="category in productStore.categories"
          :key="category"
          class="whitespace-nowrap px-8 py-4 rounded-full cursor-pointer border border-gray-200 text-gray-500 text-lg font-black uppercase tracking-widest hover:border-indigo-600 hover:text-indigo-600 transition-all"
          @click="navigateTo(`/shop?filter=${category}`)"
        >
          {{ category }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const product = useProducts();
const productStore = useProductStore();

onMounted(() => {
  if (productStore.products.length === 0) {
    product.fetchProducts();
  }
});
</script>
