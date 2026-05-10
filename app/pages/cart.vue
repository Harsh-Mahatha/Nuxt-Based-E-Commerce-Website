<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-6xl mx-auto">
      <header class="mb-10">
        <h1
          class="text-4xl font-black text-gray-900 uppercase tracking-tighter"
        >
          Your Cart <span class="text-indigo-600">.</span>
        </h1>
        <p
          class="text-gray-400 font-bold uppercase text-xs tracking-widest mt-2"
        >
          {{ cartStore.cartItems.length }} Items selected
        </p>
      </header>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div class="lg:col-span-2 space-y-4">
          <div
            v-if="cartStore.cartItems.length === 0"
            class="bg-white p-20 rounded-[2.5rem] text-center shadow-sm border border-gray-100"
          >
            <Icon
              name="lucide:shopping-bag"
              class="w-12 h-12 text-gray-200 mx-auto mb-4"
            />
            <p class="text-gray-400 font-black uppercase">Your bag is empty</p>
            <NuxtLink
              to="/"
              class="mt-6 inline-block bg-black text-white px-8 py-3 rounded-full font-bold uppercase text-xs"
              >Start Shopping</NuxtLink
            >
          </div>

          <div
            v-for="item in cartStore.cartItems"
            :key="item.id"
            class="group bg-white p-6 rounded-[2.5rem] shadow-sm border border-transparent hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 flex flex-col sm:flex-row items-center gap-6"
          >
            <div
              class="w-32 h-32 bg-gray-50 rounded-[2rem] overflow-hidden flex-shrink-0 p-4"
            >
              <img
                :src="item.thumbnail"
                :alt="item.title"
                class="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            <div class="flex-grow w-full">
              <div class="flex justify-between items-start mb-2">
                <div>
                  <h3
                    class="font-black text-gray-900 uppercase tracking-tight text-lg leading-none"
                  >
                    {{ item.title }}
                  </h3>
                  <span
                    class="text-[10px] font-black text-indigo-500 uppercase tracking-widest leading-none"
                    >Unit Price: ${{ item.price }}</span
                  >
                </div>
                <button
                  @click="cart.removeFromCart(item.id)"
                  class="text-gray-300 hover:text-red-500 transition-colors p-2"
                >
                  <Icon name="lucide:trash-2" class="w-5 h-5" />
                </button>
              </div>

              <div class="flex justify-between items-end mt-6">
                <QuantityChanger :productID="item.id" />
                <div class="text-right">
                  <p
                    class="text-[10px] font-bold text-gray-400 uppercase tracking-widest"
                  >
                    Subtotal
                  </p>
                  <p class="font-black text-xl text-gray-900 tracking-tighter">
                    ${{ (item.price * item.quantity).toLocaleString() }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="lg:col-span-1">
          <div
            class="bg-black text-white p-10 rounded-[3rem] shadow-2xl sticky top-8 overflow-hidden relative"
          >
            <div
              class="absolute -top-10 -right-10 w-32 h-32 bg-indigo-600/20 rounded-full blur-3xl"
            ></div>

            <h2
              class="text-xl font-black uppercase tracking-tighter mb-8 flex items-center gap-2"
            >
              Order Summary
              <div class="w-2 h-2 bg-indigo-500 rounded-full"></div>
            </h2>

            <div class="space-y-4">
              <div class="flex justify-between items-center text-sm">
                <span class="text-gray-400 font-bold uppercase tracking-widest"
                  >Subtotal</span
                >
                <span class="font-black"
                  >${{ cartStore.cartTotal.toLocaleString() }}</span
                >
              </div>
              <div class="flex justify-between items-center text-sm">
                <span class="text-gray-400 font-bold uppercase tracking-widest"
                  >Shipping</span
                >
                <span
                  class="text-green-400 font-black tracking-widest uppercase text-[10px]"
                  >Free</span
                >
              </div>

              <div class="h-px bg-gray-800 my-8"></div>

              <div class="flex justify-between items-end mb-10">
                <div>
                  <p
                    class="text-gray-400 font-bold uppercase text-[10px] tracking-widest"
                  >
                    Grand Total
                  </p>
                  <p class="text-4xl font-black tracking-tighter">
                    ${{ cartStore.cartTotal.toLocaleString() }}
                  </p>
                </div>
              </div>

              <button
                class="group w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-6 rounded-[2rem] transition-all duration-300 flex items-center justify-center gap-2 uppercase tracking-widest text-sm shadow-lg shadow-indigo-600/30 active:scale-95"
                @click="handleCheckout"
              >
                Checkout Now
                <Icon
                  name="lucide:arrow-right"
                  class="w-4 h-4 group-hover:translate-x-1 transition-transform"
                />
              </button>
              <p
                class="text-red-500 text-md text-center font-bold"
                v-if="errMsg != ''"
              >
                {{ errMsg.toLocaleUpperCase() }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const cartStore = useCartStore();
const cart = useCart();
const toast = useToast();
const errMsg = ref("");

const handleCheckout = async () => {
  const order = {
    items: cartStore.cartItems,
    total: cartStore.cartTotal,
    time: new Date().toLocaleString(),
  };
  const result = await cart.checkout(order);

  if (result.success) {
    toast.success({
      message: `${result.orderId} Placed Succesfully !!`,
      timeout: 5000,
    });
  } else {
    errMsg.value = result.message;
  }
};

definePageMeta({});
</script>
