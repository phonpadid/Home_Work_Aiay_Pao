<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  message: String,
  status: String
});
</script>

<template>
  <div class="toast z-10">
    <div :class="`alert alert-${status}`">
      <span>{{ message }} {{ status }}</span>
    </div>
  </div>
</template>
