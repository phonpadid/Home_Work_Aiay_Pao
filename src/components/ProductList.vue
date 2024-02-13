<script setup lang="ts">
import { defineProps } from 'vue'
import { useUserCartStore } from '@/stores/user/cart'
import { useRouter } from 'vue-router'

defineProps({
  products: Array<any>,
  addToCart: Function
})
const userCartStore = useUserCartStore()
const router = useRouter()
const addToCart = (productData:any) => {
  userCartStore.addToCart(productData)
  router.push({ name: 'cart' })
}
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 m-10">
    <div v-for="(product, index) in products" class="card w-full bg-base-100 shadow-xl" :key="index">
      <figure>
        <img class="w-full" :src="product.imageUrl" alt="Shoes" />
      </figure>
      <div class="card-body">
        <h2 class="card-title">{{ product.name }}</h2>
        <p>{{ product.about }}</p>
        <div class="card-actions justify-end">
          <button class="btn btn-primary" @click="addToCart(product)">Buy Now</button>
          
        </div>
      </div>
    </div>
  </div>
</template>