<template>
  <div class="h-12 w-40 flex items-center justify-center">
    <div
      v-if="cartItem && cartItem.quantity > 0"
      class="flex items-center justify-between w-full h-full bg-gray-100 rounded-xl p-1 border border-gray-200 shadow-sm"
    >
      <button
        @click="cart.updateQuantity(productID, -1)"
        class="w-10 h-full flex items-center justify-center bg-white rounded-lg shadow-sm text-gray-600 hover:text-red-500 hover:bg-red-50 transition-all duration-200 active:scale-90"
      >
        <span class="text-xl font-bold">−</span>
      </button>

      <span class="font-bold text-gray-800 tabular-nums">
        {{ cartItem.quantity }}
      </span>

      <button
        @click="cart.updateQuantity(productID, 1)"
        class="w-10 h-full flex items-center justify-center bg-white rounded-lg shadow-sm text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200 active:scale-90 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed disabled:hover:text-gray-400 disabled:hover:bg-gray-100"
        :disabled="(product?.stock ?? 0) <= 0"
      >
        <span class="text-xl font-bold">+</span>
      </button>
    </div>

    <div v-else class="w-full h-full">
      <button
        @click="cart.addToCart(productID)"
        class="w-full h-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2"
      >
        <Icon name="lucide:shopping-cart" class="w-4 h-4" />
        <span>Add to cart</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  productID: number;
}
const props = defineProps<Props>();
const cartStore = useCartStore();
const productStore = useProductStore();
const product = computed(() => {
  return productStore.products.find((item) => item.id === props.productID);
});
const cartItem = computed(() => {
  return cartStore.cartItems.find((item) => item.id === props.productID);
});
const cart = useCart();
</script>
