<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserProductStore } from '@/stores/user/product';
import { useUserCartStore } from '@/stores/user/cart'
import ProductList from '@/components/ProductList.vue';
import UserLayout from '@/layouts/UserLayout.vue';


const userProductStore = useUserProductStore();
const userCartStore = useUserCartStore()
const route = useRoute();
const router = useRouter();

const addToCart = (productData: any) => {
  userCartStore.addToCart(productData)
  router.push({ name: 'cart' })
}

const searchText = ref<string>('');
const filterProducts = ref<Array<any>>([]); // Replace `any` with the actual type of your products

watch(() => route.query.q, (newSearchText) => {
  searchText.value = newSearchText as string;
  filterProducts.value = userProductStore.filterProducts(searchText.value);
}, { immediate: true });
</script>

<template>
  <UserLayout>
    <div class="m-10">
      <h1 class="text-3xl">Search: <span class="font-bold">{{ searchText }}</span></h1>
    </div>
    <div v-if="filterProducts.length > 0">
      <ProductList
        :products="filterProducts"
        :addToCart="addToCart"
      >
      </ProductList>
    </div>
    <div class="m-10" v-else>
      <div class="text-center text-3xl">Product not found</div>
    </div>
  </UserLayout>
</template>
