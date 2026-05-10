<template>
  <div
    class="flex flex-col bg-white rounded-3xl p-5 mt-4 border border-gray-300 shadow-sm max-w-80 hover:border-gray-500"
  >
    <div
      class="w-70 h-70 relative aspect-square mb-4 bg-gray-100 rounded-2xl overflow-hidden cursor-pointer hover:scale-105"
      @click="navigateTo(`/product/${product.id}`)"
    >
      <NuxtImg
        :src="product.thumbnail"
        :alt="product.title"
        class="w-full h-full object-cover"
      />

      <div
        class="absolute top-3 right-3 bg-white/80 px-2 py-1 rounded-lg flex items-center gap-1 border border-gray-100"
      >
        <Icon name="lucide:star" class="w-3 h-3 text-yellow-500" />
        <span class="text-[10px] font-black">{{ product.rating }}</span>
      </div>

      <div
        v-if="product.stock <= 0"
        class="absolute inset-0 bg-red-800 bg-opacity-20 flex items-center justify-center"
      >
        <span class="text-white font-bold text-lg">Sold Out</span>
      </div>
    </div>

    <div class="flex flex-col">
      <span
        class="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-1"
      >
        {{ product.category }}
      </span>

      <h3
        class="text-lg font-bold text-gray-900 leading-tight mb-2 h-12 line-clamp-2"
      >
        {{ product.title }}
      </h3>

      <div class="mb-5">
        <span class="text-2xl font-black text-gray-900"
          >${{ product.price }}</span
        >
      </div>

      <div class="mt-auto pt-4 border-t border-gray-50">
        <QuantityChanger :productID="product.id" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Product } from "~/types/product";

interface Props {
  product: Product;
}
const props = defineProps<Props>();
</script>
