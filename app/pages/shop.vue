<template>
  <SortBar />
  <div class="grid grid-cols-4 justify-items-center items-start">
    <ProductCard
      :product="product"
      v-for="product in productsToShow"
      :key="product.id"
    />
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const product = useProducts();
const productStore = useProductStore();

onMounted(() => {
  if (productStore.products.length === 0) {
    product.fetchProducts();
  }
  if (route.query.filter)
    productStore.filterByValue = route.query.filter as string;
  if (route.query.sort) productStore.sortByValue = route.query.sort as string;
});

const productsToShow = computed(() => {
  let final = [...productStore.products];

  // Filter by search query
  if (route.query.search) {
    const searchTerm = (route.query.search as string).toLowerCase();
    final = final.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm) ||
        item.category.toLowerCase().includes(searchTerm),
    );
  }

  // Filter by category
  if (productStore.filterByValue != "") {
    final = final.filter(
      (item) => item.category === productStore.filterByValue,
    );
  }

  // Sort
  if (productStore.sortByValue != "") {
    if (productStore.sortByValue === "a-z") {
      final = final.sort((a, b) => a.title.localeCompare(b.title));
    } else if (productStore.sortByValue === "z-a") {
      final = final.sort((a, b) => b.title.localeCompare(a.title));
    } else if (productStore.sortByValue === "lowToHigh") {
      final = final.sort((a, b) => a.price - b.price);
    } else if (productStore.sortByValue === "highToLow") {
      final = final.sort((a, b) => b.price - a.price);
    } else if (productStore.sortByValue === "ratingIncreasing") {
      final = final.sort((a, b) => a.rating - b.rating);
    } else if (productStore.sortByValue === "ratingDecreasing") {
      final = final.sort((a, b) => b.rating - a.rating);
    }
  }
  return final;
});
</script>
