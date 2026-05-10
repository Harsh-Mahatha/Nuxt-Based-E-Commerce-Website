import type { checkoutResponse, order } from "~/types/cart";

export const useCart = () => {
  const toast = useToast();
  const productStore = useProductStore();
  const cartStore = useCartStore();

  function addToCart(id: number) {
    const existingItem = cartStore.cartItems.find((item) => item.id === id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      const product = productStore.products.find((p) => p.id === id);
      if (product) {
        cartStore.cartItems.push({
          id: product.id,
          title: product.title,
          price: product.price,
          quantity: 1,
          thumbnail: product.thumbnail,
        });
      }
    }

    productStore.updateStock(id, -1);
    toast.success({
      message: "Succesfully Added to Cart !",
      timeout: 2000,
      balloon: true,
    });
  }

  function removeFromCart(id: number) {
    const itemToRemove = cartStore.cartItems.find((t) => t.id === id);
    if (itemToRemove) {
      cartStore.cartItems = cartStore.cartItems.filter((t) => t.id != id);
      productStore.updateStock(id, itemToRemove.quantity);
    }
  }

  function updateQuantity(id: number, amount: number) {
    cartStore.cartItems.forEach((item) => {
      if (item.id === id) {
        item.quantity += amount;
        productStore.updateStock(id, -amount);
        if (item.quantity <= 0) removeFromCart(item.id);
      }
    });
  }

  async function checkout(order: order) {
    try {
      const data = await $fetch<checkoutResponse>("/api/orders/place", {
        method: "POST",
        body: order,
      });
      const orderId = data.id;
      cartStore.cartItems = [];
      return { success: true, orderId };
    } catch (err: any) {
      const message = err.data?.statusMessage || "Failed to place order !";
      return { success: false, message };
    }
  }
  return { addToCart, removeFromCart, updateQuantity, checkout };
};
