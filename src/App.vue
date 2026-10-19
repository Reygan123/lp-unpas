<script setup lang="ts">
import { RouterView } from 'vue-router'
import PopupBannerModal from '@/components/PopupBannerModal.vue'
</script>

<template>
  <router-view :key="$route.fullPath" />
  <PopupBannerModal />
</template>
