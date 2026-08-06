<script setup lang="ts">
import MainLayout from '@/layouts/MainLayout.vue';
import AkademikHero from './sections/AkademikHero.vue';
import AkademikMenu from './sections/AkademikMenu.vue';
import AkademikLayanan from './sections/AkademikLayanan.vue';
import ProdiProgramList from '../prodi/sections/ProdiProgramList.vue';
import AkademikInfo from './sections/AkademikInfo.vue';
import { computed, onMounted, ref } from 'vue';
import { useDepartementStore } from '@/stores/departement.ts';
import { useFakultasStore } from '@/stores/fakultas.ts';
import { useLayananStore } from '@/stores/layanan.ts';
import { usePengumumanStore } from '@/stores/pengumuman.ts';
import { useKalenderStore } from '@/stores/kalender.ts';
import { useDokumenStore } from '@/stores/dokumen.ts';

const prodiStore = useDepartementStore();
const fakultasStore = useFakultasStore();
const layananStore = useLayananStore();
const pengumumanStore = usePengumumanStore();
const kalenderStore = useKalenderStore();
const dokumenStore = useDokumenStore();
const isLoading = ref(true);

onMounted(async () => {
  try {
    await Promise.all([
      prodiStore.fetchDepartements(),
      fakultasStore.fetchFakultas(),
      layananStore.fetchLayanan(),
      pengumumanStore.fetchPengumuman(),
      kalenderStore.fetchKalender(),
      dokumenStore.fetchDokumen(),
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
    <AkademikInfo :pengumuman="pengumumanStore.pengumuman" :kalender="kalenderStore.kalender" :dokumen="dokumenStore.dokumen" />
    <AkademikLayanan :layanan="layananStore.layanan" :is-loading="layananStore.loading" />
  </MainLayout>
</template>