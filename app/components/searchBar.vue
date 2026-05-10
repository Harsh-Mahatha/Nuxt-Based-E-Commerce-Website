<template>
  <div class="relative flex items-center gap-2 w-full">
    <!-- Search container -->
    <div class="relative flex-1 sm:flex-none">
      <!-- Input field -->
      <input
        type="text"
        v-model="searchQuery"
        @input="showSuggestions = true"
        @keyup.enter="handleSearch"
        placeholder="Search products..."
        class="w-full sm:w-64 px-3 py-2 pr-10 border border-gray-300 rounded-md text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow shadow-sm"
      />

      <!-- Clear button -->
      <button
        v-if="searchQuery !== ''"
        type="button"
        @click="searchQuery = ''"
        class="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition"
      >
        <Icon name="ph:x-bold" class="w-4 h-4 text-gray-500" />
      </button>

      <!-- Suggestions dropdown -->
      <div
        v-if="showSuggestions && searchQuery && suggestions.length > 0"
        class="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-50 max-h-96 overflow-y-auto"
      >
        <div
          v-for="product in suggestions"
          :key="product.id"
          @click="navigateToProduct(product.id)"
          class="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0 transition"
        >
          <img
            :src="product.thumbnail"
            :alt="product.title"
            class="w-10 h-10 object-cover rounded"
          />
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 truncate">
              {{ product.title }}
            </p>
            <p class="text-xs text-gray-600">${{ product.price.toFixed(2) }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Search button -->
    <button
      @click="handleSearch"
      type="button"
      class="px-4 py-2 bg-blue-500 text-white rounded-md text-sm font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition disabled:opacity-50 disabled:cursor-not-allowed"
      :disabled="!searchQuery.trim()"
    >
      <Icon name="ph:magnifying-glass-bold" class="w-4 h-4" />
    </button>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter();
const productStore = useProductStore();
const searchQuery = ref("");
const showSuggestions = ref(false);

const suggestions = computed(() => {
  if (!searchQuery.value.trim()) return [];

  const searchTerm = searchQuery.value.toLowerCase();
  return productStore.products
    .filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm) ||
        item.category.toLowerCase().includes(searchTerm),
    )
    .slice(0, 8);
});

const navigateToProduct = (productId: number) => {
  searchQuery.value = "";
  showSuggestions.value = false;
  router.push(`/product/${productId}`);
};

const handleSearch = () => {
  if (!searchQuery.value.trim()) return;

  router.push(`/shop?search=${encodeURIComponent(searchQuery.value)}`);
  searchQuery.value = "";
  showSuggestions.value = false;
};
</script>
