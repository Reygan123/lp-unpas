<script setup lang="ts">
import MainLayout from '@/layouts/MainLayout.vue';
import CTASection from '@/components/sections/CTASection.vue';
import PengabdianHero from './section/PengabdianHero.vue';
import PengabdianList from './section/PengabdianList.vue';
</script>

<template>
  <MainLayout>
    <PengabdianHero />
    <PengabdianList />
    <CTASection />
  </MainLayout>
</template>