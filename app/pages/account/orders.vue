<script setup lang="ts">
const { data: orders, pending } = await useFetch("/api/orders");
</script>

<template>
  <div class="max-w-4xl mx-auto p-6">
    <h1 class="text-3xl font-black uppercase mb-8">
      Order History<span class="text-indigo-600">.</span>
    </h1>

    <div v-if="pending" class="text-gray-400 font-bold uppercase animate-pulse">
      Loading your history...
    </div>

    <div v-else-if="orders && orders.length > 0" class="space-y-6">
      <div
        v-for="order in orders"
        :key="order.id"
        class="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm"
      >
        <div class="flex justify-between items-start mb-4">
          <div>
            <p
              class="text-[10px] font-black text-indigo-600 uppercase tracking-widest"
            >
              Order ID
            </p>
            <h2 class="font-black text-gray-900 uppercase">{{ order.id }}</h2>
          </div>
          <div class="text-right">
            <p
              class="text-[10px] font-black text-gray-400 uppercase tracking-widest"
            >
              Total Paid
            </p>
            <p class="font-black text-xl">
              ${{ order.total.toLocaleString() }}
            </p>
          </div>
        </div>

        <div class="flex justify-between items-center">
          <div class="flex gap-2 overflow-x-auto pb-2">
            <img
              v-for="item in order.items"
              :key="item.id"
              :src="item.thumbnail"
              class="w-12 h-12 rounded-lg bg-gray-50 border border-gray-100 object-contain p-1"
            />
          </div>
          <p class="text-sm text-gray-500 font-bold">
            {{ order.time.toLocaleString() }}
          </p>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-20 bg-white rounded-[3rem]">
      <p class="text-gray-400 font-black uppercase">No orders found yet.</p>
    </div>
  </div>
</template>
