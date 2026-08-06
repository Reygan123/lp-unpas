<script setup lang="ts">
import MainLayout from '@/layouts/MainLayout.vue';
import PeraturanHero from './sections/peraturan-akademik/PeraturanHero.vue';
import PeraturanQuickNav from './sections/peraturan-akademik/PeraturanQuickNav.vue';
import PapanPengumuman from './sections/peraturan-akademik/PapanPengumuman.vue';
import KalenderAkademik from './sections/peraturan-akademik/KalenderAkademik.vue';
import BukuPanduanDokumen from './sections/peraturan-akademik/BukuPanduanDokumen.vue';
import DaftarPeraturan from './sections/peraturan-akademik/DaftarPeraturan.vue';

import SectionLayout from '@/layouts/SectionLayout.vue';
</script>

<template>
  <MainLayout>
    <PeraturanHero />
    <PeraturanQuickNav />
    <SectionLayout class="grid grid-cols-1 lg:grid-cols-3">
        <PapanPengumuman />
        <KalenderAkademik />
        <div class="flex flex-col gap-6">
          <BukuPanduanDokumen />
          <DaftarPeraturan />
        </div>
    </SectionLayout>
  </MainLayout>
</template>