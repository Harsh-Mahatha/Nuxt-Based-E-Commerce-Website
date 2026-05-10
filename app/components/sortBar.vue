<template>
  <div class="max-w-7xl mx-auto px-6 py-8">
    <div
      class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b-1 border-black pb-6"
    >
      <div class="flex flex-col">
        <h2 class="text-3xl font-black uppercase tracking-tighter leading-none">
          Catalog
        </h2>
        <p
          class="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-2"
        >
          Refine your selection
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-4 w-full md:w-auto">
        <div class="relative flex-grow md:flex-initial group">
          <label
            class="absolute -top-2.5 left-4 bg-white px-2 text-[10px] font-black uppercase tracking-widest text-indigo-600 z-10"
          >
            Filter By
          </label>
          <select
            v-model="productStore.filterByValue"
            class="w-full md:w-56 bg-white border-2 border-gray-100 rounded-xl px-4 py-3 text-sm font-bold appearance-none cursor-pointer focus:border-black focus:ring-0 transition-all outline-none uppercase tracking-tight"
          >
            <option value="">All Categories</option>
            <option
              v-for="category in productStore.categories"
              :key="category"
              :value="category"
            >
              {{ category }}
            </option>
          </select>
          <Icon
            name="lucide:chevron-down"
            class="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none group-focus-within:rotate-180 transition-transform"
          />
        </div>

        <div class="relative flex-grow md:flex-initial group">
          <label
            class="absolute -top-2.5 left-4 bg-white px-2 text-[10px] font-black uppercase tracking-widest text-indigo-600 z-10"
          >
            Sort By
          </label>
          <select
            v-model="productStore.sortByValue"
            class="w-full md:w-56 bg-white border-2 border-gray-100 rounded-xl px-4 py-3 text-sm font-bold appearance-none cursor-pointer focus:border-black focus:ring-0 transition-all outline-none uppercase tracking-tight"
          >
            <option value="">Default Order</option>
            <option value="a-z">Name: A - Z</option>
            <option value="z-a">Name: Z - A</option>
            <option value="ratingDecreasing">Rating: High - Low</option>
            <option value="ratingIncreasing">Rating: Low - High</option>
            <option value="lowToHigh">Price: Low - High</option>
            <option value="highToLow">Price: High - Low</option>
          </select>
          <Icon
            name="lucide:arrow-down-wide-narrow"
            class="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none group-focus-within:text-black transition-colors"
          />
        </div>

        <button
          v-if="productStore.filterByValue || productStore.sortByValue"
          @click="resetFilters"
          class="p-3 rounded-xl bg-gray-50 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
          title="Clear Filters"
        >
          <Icon name="lucide:rotate-ccw" class="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const productStore = useProductStore();
onMounted(() => {
  productStore.filterByValue = "";
  productStore.sortByValue = "";
});

const resetFilters = () => {
  productStore.filterByValue = "";
  productStore.sortByValue = "";
};
</script>
