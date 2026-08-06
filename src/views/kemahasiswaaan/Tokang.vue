<script setup lang="ts">
import MainLayout from '@/layouts/MainLayout.vue';
import TokangHero from './sections/TokangHero.vue';
import TujuanProgram from './sections/TujuanProgram.vue';
import FilterAngkatan from './sections/FilterAngkatan.vue';
import DaftarAngkatan from './sections/DaftarAngkatan.vue';
import TokangSidebar from './sections/TokangSidebar.vue';
import HalamanDetailAngkatan from './sections/HalamanDetailAngkatan.vue';
import TokangCta from './sections/TokangCTA.vue';
</script>

<template>
  <MainLayout>
    <TokangHero />
    <TujuanProgram />
    <FilterAngkatan />

    <section class="bg-netral">
      <div class="max-w-7xl mx-auto px-4 lg:px-8 grid lg:grid-cols-3 gap-6 items-start pb-8">
        <div class="lg:col-span-2">
          <DaftarAngkatan />
        </div>
        <TokangSidebar />
      </div>
    </section>

    <HalamanDetailAngkatan />
    <TokangCta />
  </MainLayout>
</template>