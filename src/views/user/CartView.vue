<script setup lang="ts">
import UserLayout from '@/layouts/UserLayout.vue';
import RightIcon from '@/components/icons/Right.vue';
import CloseIcon from '@/components/icons/Close.vue';
import { RouterLink, useRouter } from 'vue-router';
import { useUserCartStore } from '@/stores/user/cart';

const userCartStore = useUserCartStore();
const router = useRouter();

const changeQuantity = (event: Event, index: number): void => {
  userCartStore.updateQuantity(index, (event.target as HTMLInputElement).value);
};


const removeItemInCart = (index: number): void => {
  userCartStore.removeItemInCart(index);
  if (userCartStore.items.length === 0) {
    router.push({ name: 'home' });
  }
};
</script>

<template>
  <UserLayout>
    <div class="container mx-auto my-4">
      <h1 class="font text-4xl mb-4 font-bold">Shopping cart</h1>
      <div class="flex">
        <section class="flex-auto w-64">
          <div v-if="userCartStore.items.length === 0" class="px-8 py-32 bg-base-200">
            Cart is empty Sorry
          </div>
          
          <ul v-else class="px-8 bg-base-200">
            <li v-for="(item, index) in userCartStore.items" class="flex w-full py-10" :key="index">
              <div class="shrink-0">
                <img class="w-48" :src="item.imageUrl">
              </div>
              <div class="flex flex-1 flex-col justify-between pl-4">
                <div class="grid grid-cols-2 gap-6 relative">
                  <div>
                    <div class="text-xl font-bold">{{ item.name }}</div>
                    <div>{{ item.about }}</div>
                    <div>{{ item.price }} KIP</div>
                  </div>
                  <div>
                    <select class="p-1.5" v-model="item.quantity" @change="changeQuantity($event, index)">
                      <option disabled selected>Quantity</option>
                      <option v-for="quantity in [1,2,3,4,5]">{{ quantity }}</option>
                    </select>
                    <div @click="removeItemInCart(index)" class="absolute top-0 right-0 cursor-pointer">
                      <CloseIcon class="w-5"></CloseIcon>
                    </div>
                  </div>
                </div>
                <p class="flex">
                  <RightIcon class="w-5 shrink-0"></RightIcon>
                  <span>In stock</span>
                </p>
              </div>
            </li>
          </ul>
        </section>
        <section class="flex-auto w-32 bg-slate-200 p-8">
          <h2 class="text-2xl">Order summary</h2>
          <div class="mt-4 m-0 divide-y divide-base-200">
            <div class="flex align-middle justify-between mb-2">
              <div class="font font-bold">ລາຄາສິນຄ້າທັງໝົດ</div>
              <div>{{ userCartStore.summaryPrice }}</div>
            </div>
            <div class="flex align-middle justify-between mb-2">
              <div class="font font-bold">ຄ່າສົ່ງ</div>
              <div>0</div>
            </div>
            <div class="flex align-middle justify-between mb-2">
              <div class="font font-bold">ລາຄ່າທັງໝົດ</div>
              <div>{{ userCartStore.summaryPrice }}</div>
            </div>
            <RouterLink to="/checkout" class="font btn btn-primary w-full">
              ຊຳລະເງີນ
            </RouterLink>
          </div>
        </section>
      </div>
    </div>
  </UserLayout>
</template>

<style scoped>
.font{
  font-family: 'Noto Sans Lao', sans-serif;
}
</style>