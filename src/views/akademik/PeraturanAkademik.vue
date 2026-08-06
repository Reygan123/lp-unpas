<script setup lang="ts">
import MainLayout from '@/layouts/MainLayout.vue';
import PeraturanHero from './sections/peraturan-akademik/PeraturanHero.vue';
// import PeraturanQuickNav from './sections/peraturan-akademik/PeraturanQuickNav.vue';
import PapanPengumuman from './sections/peraturan-akademik/PapanPengumuman.vue';
import KalenderAkademik from './sections/peraturan-akademik/KalenderAkademik.vue';
import BukuPanduanDokumen from './sections/peraturan-akademik/BukuPanduanDokumen.vue';
import DaftarPeraturan from './sections/peraturan-akademik/DaftarPeraturan.vue';
import SectionLayout from '@/layouts/SectionLayout.vue';
import { onMounted, ref } from 'vue';
import { usePengumumanStore } from '@/stores/pengumuman.ts';
import { useDokumenStore } from '@/stores/dokumen.ts';

const pengumumanStore = usePengumumanStore();
const dokumenStore = useDokumenStore();
const isLoading = ref(true);

onMounted(async () => {
  try {
    await Promise.all([
      pengumumanStore.fetchPengumuman(),
      dokumenStore.fetchDokumen(),
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
    <PeraturanHero />
    <!-- <PeraturanQuickNav /> -->
    <div class="w-full px-[20px] py-[0px] md:px-[60px] md:py-[40px] lg:px-[120px] lg:py-[0px] grid grid-cols-1 lg:grid-cols-3 gap-6 items-start h-full">
      <PapanPengumuman :pengumuman="pengumumanStore.pengumuman" :is-loading="isLoading" />
      <KalenderAkademik />
      <div class="flex flex-col gap-6">
        <BukuPanduanDokumen :dokumen="dokumenStore.dokumen" :is-loading="isLoading" />
        <DaftarPeraturan />
      </div>
    </div>
  </MainLayout>
</template>