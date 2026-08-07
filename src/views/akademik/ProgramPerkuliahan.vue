<script setup lang="ts">
import MainLayout from '@/layouts/MainLayout.vue';
import ProgramHero from './sections/program-perkuliahan/ProgramHero.vue';
import ProgramCards from './sections/program-perkuliahan/ProgramCards.vue';
// import ProgramComparison from './sections/program-perkuliahan/ProgramComparison.vue';
import ProgramFaq from './sections/program-perkuliahan/ProgramFaq.vue';
import { onMounted, ref } from 'vue';
import { useProgramStore } from '@/stores/program.ts';
import { useFaqStore } from '@/stores/faq.ts';

const programStore = useProgramStore();
const faqStore = useFaqStore();
const isLoading = ref(true);

onMounted(async () => {
  try {
    await Promise.all([
      programStore.fetchProgram(),
      faqStore.fetchFaq(),
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
    <ProgramHero />
    <ProgramCards v-if="programStore.program.length > 0" :programs="programStore.program" />
    <!-- <ProgramComparison /> -->
    <ProgramFaq :faq="faqStore.faqs" />
  </MainLayout>
</template>