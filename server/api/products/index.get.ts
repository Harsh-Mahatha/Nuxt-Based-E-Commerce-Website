import type { productApiResponse } from "~/types/product";
export default defineEventHandler(async (event) => {
  return await $fetch<productApiResponse[]>("https://dummyjson.com/products");
});
