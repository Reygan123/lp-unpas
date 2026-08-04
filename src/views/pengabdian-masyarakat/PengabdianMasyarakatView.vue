<script setup lang="ts">
import MainLayout from '@/layouts/MainLayout.vue';
import CTASection from '@/components/sections/CTASection.vue';
import PengabdianHero from './section/PengabdianHero.vue';
import PengabdianFokusSection from './section/PengabdianFokusSection.vue';
import PengabdianProgramSection from './section/PengabdianProgramSection.vue';
</script>

<template>
  <MainLayout>
    <PengabdianHero />
    <PengabdianFokusSection />
    <PengabdianProgramSection />
    <CTASection />
  </MainLayout>
</template>