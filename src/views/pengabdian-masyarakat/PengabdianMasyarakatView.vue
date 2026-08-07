<script setup lang="ts">
import MainLayout from '@/layouts/MainLayout.vue';
import CTASection from '@/components/sections/CTASection.vue';
import PengabdianHero from './section/PengabdianHero.vue';
import PengabdianFokusSection from './section/PengabdianFokusSection.vue';
import PengabdianProgramSection from './section/PengabdianProgramSection.vue';
import { usePengabdianStore } from '@/stores/pengabdian.ts';
import { onMounted } from 'vue';

const pengabdianStore = usePengabdianStore()

onMounted(async()=>{
await pengabdianStore.fetchPengabdian()
})
</script>

<template>
  <MainLayout>
    <PengabdianHero />
    <PengabdianFokusSection />
    <PengabdianProgramSection />
    <CTASection />
  </MainLayout>
</template>