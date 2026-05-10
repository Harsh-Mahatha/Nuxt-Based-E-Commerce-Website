<template>
  <div class="bg-white">
    <nav class="max-w-5xl mx-auto px-6 py-8 flex justify-between items-center">
      <button
        @click="$router.back()"
        class="flex items-center gap-2 text-gray-400 hover:text-black transition-colors group"
      >
        <Icon name="lucide:chevron-left" />
        <span class="text-xs font-black uppercase tracking-widest">Back</span>
      </button>

      <div v-if="product" class="flex items-center gap-2">
        <span class="text-xs font-bold text-gray-400 uppercase tracking-tighter"
          >Rating</span
        >
        <span class="text-sm font-black">{{ product.rating }}</span>
      </div>
    </nav>

    <main
      v-if="product"
      class="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center"
    >
      <div class="relative flex justify-center py-10 md:py-20">
        <span
          class="absolute inset-0 flex items-center justify-center text-[10rem] font-black text-gray-50 select-none -z-10 uppercase"
        >
          {{ product.category }} hello
        </span>

        <NuxtImg
          :src="product.thumbnail"
          class="w-full max-w-[500px] h-auto object-contain drop-shadow-3xl transform hover:scale-105 transition-transform duration-1000"
        />
      </div>

      <div class="flex flex-col space-y-10 py-10">
        <div>
          <div class="mb-4">
            <span
              v-if="product.stock <= 0"
              class="text-red-500 text-xs font-black uppercase tracking-widest"
              >Sold Out</span
            >
            <span
              v-else-if="product.stock < 5"
              class="text-orange-500 text-xs font-black uppercase tracking-widest animate-pulse"
              >Limited Edition — Only {{ product.stock }} Left</span
            >
            <span
              v-else
              class="text-indigo-600 text-xs font-black uppercase tracking-widest"
              >New Arrival</span
            >
          </div>

          <h1
            class="text-3xl lg:text-5xl font-black text-black leading-[0.9] tracking-tighter mb-6"
          >
            {{ product.title }}
          </h1>

          <p class="text-xl text-gray-600 leading-relaxed max-w-lg">
            {{ product.description }}
          </p>
        </div>

        <div class="flex flex-col">
          <span class="text-sm font-bold text-gray-400 uppercase mb-1"
            >MSRP / Value</span
          >
          <div class="flex items-baseline gap-2">
            <span class="text-3xl font-black text-black"
              >${{ product.price }}</span
            >
            <span class="text-gray-400 font-medium">USD</span>
          </div>
        </div>

        <div
          class="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-10 border-t border-gray-100"
        >
          <div>
            <button
              class="bg-orange-400 shadow-lg shadow-amber-300 hover:bg-orange-500 text-xl text-white font-bold active:scale-95 p-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
              :disabled="(product?.stock ?? 0) <= 0"
              @click="handleBuyNow"
            >
              <Icon name="lucide:handbag" class="" /> Buy Now
            </button>
          </div>
          <QuantityChanger
            :productID="product.id"
            class="scale-110 origin-left"
            v=""
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const productStore = useProductStore();
const cart = useCart();

const product = computed(() => {
  return productStore.products.find(
    (item) => item.id === Number(route.params.id),
  );
});

const handleBuyNow = () => {
  cart.addToCart(Number(route.params.id));
  navigateTo("/cart");
};
</script>
