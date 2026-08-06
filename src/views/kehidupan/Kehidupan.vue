<script setup lang="ts">
import { onMounted, ref } from "vue";
import MainLayout from '@/layouts/MainLayout.vue';
import SectionLayout from '@/layouts/SectionLayout.vue';
import KehidupanHero from './sections/KehidupanHero.vue';
import AktivitasKampus from './sections/AktivitasKampus.vue';
import PrestasiMahasiswa from './sections/PrestasiMahasiswa.vue';
import { useActivityStore } from "@/stores/campusActivity";
import { usePrestasiStore } from "@/stores/prestasi";

const activityStore = useActivityStore();
const prestasiStore = usePrestasiStore();
const isLoading = ref(true);

onMounted(async () => {
  try {
    await Promise.all([
      activityStore.fetchActivity(),
      prestasiStore.fetchPrestasis(),
    ]);
  } catch (error) {
    console.error('Error loading data:', error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <MainLayout>
    <KehidupanHero />
    <SectionLayout>
      <AktivitasKampus :activity="activityStore.activity" :is-loading="isLoading" />
      <PrestasiMahasiswa :prestasi="prestasiStore.prestasis" :is-loading="isLoading" />
    </SectionLayout>
  </MainLayout>
</template>