<script setup lang="ts">
import {ref, onMounted} from 'vue'
import Userlayout from '@/layouts/UserLayout.vue'
import { useUserCartStore } from '@/stores/user/cart'


const userCartStore = useUserCartStore();
const orderData = ref<Object>({})

onMounted(()=>{
  userCartStore.loadCheckout()  
  if(userCartStore.checkout.orderNumber){
    orderData.value = userCartStore.checkout
  }
  // console.log(userCartStore.checkout)
})
</script>
<template>
    <Userlayout>
        <div class=" max-w-2xl mx-auto border border-base-200 shadow-xl p-8 my-4">
            <div>
              <div class=" text-2xl font-bold">Your Order is successful</div>
              <div>Hi {{ orderData.name }}</div>
              <div class="fontcss font-bold">ກຽມຮັບສິນຄ້າໄດ້ເລີຍ</div>
            </div>
            <div class="divider"></div>
            <div class=" grid grid-cols-4 gap-2 ">
              <div>
                <div class=" font-bold">Order date</div>
                <div>{{ orderData.createdAt }}</div>
              </div>
              <div>
                <div class=" font-bold">Order Number</div>
                <div>{{ orderData.orderNumber }}</div>
              </div>
              <div>
                <div class=" font-bold">Payment method</div>
                <div>{{ orderData.paymentMethod }}</div>
              </div>
              <div>
                <div class=" font-bold">Address</div>
                <div>{{ orderData.address }}</div>
              </div>
            </div>
            <div class="divider"></div>
            <div v-for="product in orderData.products" class=" grid grid-cols-4 gap-2 mb-2 items-center">
                <div>
                  <img class="w-full" :src="product.imageUrl" >
                </div>
                <div class="fontcss font-bold">ຊື: {{ product.name }}</div>
                <div class="fontcss font-bold">ຈຳນວນ: {{ product.quantity }}</div>
                <div class="fontcss font-bold">ລາຄ່າລວມ: {{ product.price * product.quantity }}</div>
              </div>
            <div class="divider"></div>
            <div class=" flex justify-between">
              <div class="fontcss font-bold">ລາຄາສິນຄ້າທັງໝົດ</div>
              <div>{{ orderData.totalPrice }}</div>
            </div>
            <div class=" flex justify-between mt-4">
              <div class="fontcss font-bold">ຄ່າສົ່ງ</div>
              <div>0</div>
            </div>
            <div class="divider"></div>
            <div class="flex justify-between">
              <div class="fontcss font-bold">ລາຄ່າລວມ</div>
              <div>{{orderData.totalPrice}}</div>
            </div>
            <div class="divider"></div>
           <div class=" flex justify-between">
            <div class="fontcss font-bold">ຂອບໃຈທີມາອຸດໜູນຮ້ານເຮົາ</div>
            <div class="fontcss font-bold">ເຈົ້າຂ້ອງຮ້ານ : ພອນປະດິດ ພົນສຸຄຳ</div>
           </div>
        </div>
    </Userlayout>
</template>
<style scoped>
.fontcss{
  font-family: 'Noto Sans Lao', sans-serif;
}
</style>