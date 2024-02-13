<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import UserLayout from '@/layouts/UserLayout.vue'

interface UserFormData {
  name: string;
  field: string;
}

const userForm = ref<UserFormData[]>([
  { name: 'Email', field: 'email' },
  { name: 'Name', field: 'name' }
])

interface UserData {
  imageUrl: string;
  email: string;
  name: string;
}

const userData = reactive<UserData>({
  imageUrl: 'https://lh3.googleusercontent.com/ogw/ANLem4b8z2JwgkrrkDZD_QPQYcVSEpjdCnQnskoQ-s14OQ=s32-c-mo',
  email: '',
  name: ''
})

onMounted(() => {
  const savedUserProfile = localStorage.getItem('user-profile')
  if (savedUserProfile) {
    const userProfile = JSON.parse(savedUserProfile)
    userData.imageUrl = userProfile.imageUrl
    userData.email = userProfile.email
    userData.name = userProfile.name
  }
})

const handleFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]

  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      userData.imageUrl = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

const updateProfile = () => {
  localStorage.setItem('user-profile', JSON.stringify(userData))
  alert("Update Success")
}
</script>

<template>
  <UserLayout>
    <div
      class="container mx-auto max-w-2xl p-4 bg-base-100 my-4 border border-base-200 shadow-md"
    >
      <h1 class="text-2xl">Your profile</h1>
      <div class="flex flex-col items-center">
        <div class="avatar">
          <div class="w-24 rounded-full">
            <img :src="userData.imageUrl" />
          </div>
        </div>

        <input type="file" @change="handleFileChange">

        <div v-for="item in userForm" class="form-control w-full">
          <label class="label">
            <span class="label-text">{{ item.name }}</span>
            <span class="label-text-alt"></span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            class="input input-bordered w-full"
            v-model="userData[item.field]"
          />
        </div>

        <button class="btn btn-primary w-full mt-4" @click="updateProfile">Update profile</button>
      </div>
    </div>
  </UserLayout>
</template>