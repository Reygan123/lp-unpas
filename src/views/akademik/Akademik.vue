<script setup lang="ts">
import MainLayout from '@/layouts/MainLayout.vue';
import AkademikHero from './sections/AkademikHero.vue';
import AkademikMenu from './sections/AkademikMenu.vue';
import AkademikLayanan from './sections/AkademikLayanan.vue';
import ProdiProgramList from '../prodi/sections/ProdiProgramList.vue';
import { computed, onMounted, ref } from 'vue';
import { useDepartementStore } from '@/stores/departement.ts';
import { useFakultasStore } from '@/stores/fakultas.ts';

const prodiStore = useDepartementStore();
const fakultasStore = useFakultasStore();
const isLoading = ref(true);

onMounted(async () => {
  try {
    await Promise.all([
      prodiStore.fetchDepartements(),
      fakultasStore.fetchFakultas(),
    ]);
  } catch (error) {
    console.error('Error loading data:', error);
  } finally {
    isLoading.value = false;
  }
});

const prodi = computed(() => prodiStore.departements);
const fakultas = computed(() => fakultasStore.fakultas);
</script>

<template>
  <MainLayout>
    <AkademikHero />
    <AkademikMenu />
    <ProdiProgramList :prodiData="prodi" :fakultas="fakultas" :is-loading="isLoading" />
    <AkademikLayanan />
  </MainLayout>
</template>