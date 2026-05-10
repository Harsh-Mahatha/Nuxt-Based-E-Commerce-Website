import type { Product } from "~/types/product";

export const useProductStore = defineStore(
  "Product",
  () => {
    const products = ref<Product[]>([]);
    const searchQuery = ref("");
    const filterByValue = ref("");
    const sortByValue = ref("");

    const categories = computed(() => {
      const allCategories = products.value.map((item) => item.category);
      return new Set(allCategories);
    });

    function setProducts(payload: Product[]) {
      products.value = payload;
    }

    function updateStock(id: number, value: number) {
      const product = products.value.find((p) => p.id === id);
      if (product) {
        product.stock += value;
      }
    }
    return {
      products,
      searchQuery,
      setProducts,
      categories,
      filterByValue,
      sortByValue,
      updateStock,
    };
  },
  {
    persist: true,
  },
);
