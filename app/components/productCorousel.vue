<template>
  <div
    class="relative w-full max-w-6xl mx-auto my-10 overflow-hidden cursor-pointer bg-white border border-gray-100 shadow-2xl rounded-[2rem] min-h-[450px] flex items-center p-6 md:p-12"
    @click="navigateTo(`/product/${topProducts[currentIndex]?.id}`)"
  >
    <Transition name="slide" mode="out-in">
      <div
        :key="currentIndex"
        class="flex flex-col md:flex-row items-center justify-between w-full gap-10"
      >
        <div
          class="flex flex-col items-center md:items-start text-center md:text-left space-y-6 md:w-3/5"
        >
          <span
            class="px-4 py-1 text-xs font-bold tracking-widest text-indigo-600 uppercase bg-indigo-50 rounded-full w-fit"
          >
            Most Selling Products
          </span>

          <h1
            class="text-4xl lg:text-6xl font-black text-gray-900 leading-tight"
          >
            {{ topProducts[currentIndex]?.title }}
          </h1>

          <div
            class="inline-flex items-center px-3 py-1 space-x-2 bg-red-50 rounded-lg w-fit"
          >
            <span class="relative flex h-3 w-3">
              <span
                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"
              ></span>
              <span
                class="relative inline-flex rounded-full h-3 w-3 bg-red-500"
              ></span>
            </span>
            <h3 class="text-lg font-bold text-red-600">
              Only {{ topProducts[currentIndex]?.stock }} Remaining !!
            </h3>
          </div>

          <p class="text-gray-500 text-lg max-w-md">
            Grab our top-rated {{ topProducts[currentIndex]?.category }} before
            it's gone. Limited stock available for this exclusive item.
          </p>
        </div>

        <div class="md:w-2/5 flex justify-center">
          <div class="relative group">
            <div
              class="absolute -inset-4 bg-indigo-100 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition duration-500"
            ></div>

            <NuxtImg
              :src="topProducts[currentIndex]?.thumbnail"
              class="relative object-contain max-h-[350px] w-auto drop-shadow-2xl transition-transform duration-700 hover:rotate-3 hover:scale-110"
            />
          </div>
        </div>
      </div>
    </Transition>

    <div
      class="absolute bottom-8 left-1/2 md:left-12 -translate-x-1/2 md:translate-x-0 flex space-x-3"
    >
      <div
        v-for="(_, index) in topProducts"
        :key="index"
        class="h-2 rounded-full transition-all duration-500"
        :class="
          index === currentIndex ? 'w-10 bg-indigo-600' : 'w-2 bg-gray-200'
        "
      ></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const productStore = useProductStore();

const topProducts = computed(() => {
  return [...productStore.products]
    .sort((a, b) => a.stock - b.stock)
    .slice(0, 4);
});

const currentIndex = ref(0);

const nextProduct = () => {
  if (topProducts.value.length > 0) {
    currentIndex.value = (currentIndex.value + 1) % topProducts.value.length;
  }
};

let timer: ReturnType<typeof setInterval>;
onMounted(() => {
  timer = setInterval(nextProduct, 4000);
});

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<style scoped>
/* We still need a tiny bit of CSS for the Transition Logic */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(80px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-80px);
}
</style>
