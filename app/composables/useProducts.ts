import type { productApiResponse } from "~/types/product";

export const useProducts = () => {
  const productStore = useProductStore();
  async function fetchProducts() {
    const data = await $fetch<productApiResponse>("/api/products");
    productStore.setProducts(data.products);
  }
  return { fetchProducts };
};
