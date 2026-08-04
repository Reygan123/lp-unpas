<script setup lang="ts">
import MainLayout from '@/layouts/MainLayout.vue';
import KegiatanHero from './sections/KegiatanHero.vue';
import { onMounted, ref } from 'vue';
import { useOrganisasiStore } from '@/stores/organisasi';
import CTASection from '@/components/sections/CTASection.vue';
import KegiatanList from './sections/KegiatanList.vue';
import { useDepartementStore } from '@/stores/departement.ts';
import { useTestimoniStore } from '@/stores/testimoni.ts';
import KegiatanCategoryOverview from './sections/KegiatanCategoryOverview.vue';
import KegiatanAlumniSection from './sections/KegiatanAlumniSection.vue';
import TestimonialsSection from '@/components/sections/TestimonialsSection.vue';

const organisasiStore = useOrganisasiStore();
const departementStore = useDepartementStore();
const testimoniStore = useTestimoniStore();
const isLoading = ref(true);

onMounted(async () => {
  try {
    await organisasiStore.fetchOrganisasi();
    await departementStore.fetchDepartements()
    await testimoniStore.fetchTestimoni()
  } catch (error) {
    console.error('Error loading organisasi:', error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <MainLayout>
    <KegiatanHero :organisasi="organisasiStore.organizations" :is-loading="isLoading" />
    <KegiatanCategoryOverview />
    <KegiatanList
      :organisasi="organisasiStore.organizations"
      :departements="departementStore.departements"
      :is-loading="isLoading"
    />
    <TestimonialsSection v-if="testimoniStore.testimoni" :testimoni="testimoniStore.testimoni" />
    <CTASection />
  </MainLayout>
</template>

<style scoped>
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>