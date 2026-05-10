import type { cartITem } from "~/types/cart";

export const useCartStore = defineStore(
  "Cart",
  () => {
    const cartItems = ref<cartITem[]>([]);

    const cartCount = computed(() => {
      let count = 0;
      cartItems.value.forEach((item) => {
        count += item.quantity;
      });
      return count;
    });

    const cartTotal = computed(() => {
      let total = 0;
      cartItems.value.forEach((item) => {
        total += item.price * item.quantity;
      });
      return total;
    });

    return {
      cartItems,
      cartCount,
      cartTotal,
    };
  },
  {
    persist: true,
  },
);
