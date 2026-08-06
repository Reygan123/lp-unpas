<script setup lang="ts">
import { onMounted, ref } from "vue";
import MainLayout from '@/layouts/MainLayout.vue';
import SectionLayout from '@/layouts/SectionLayout.vue';
import IkaftAlumniHero from './sections/IkaftAlumniHero.vue';
import IkaftAlumniQuickNav from './sections/IkaftAlumniQuickNav.vue';
import IkaftProfil from './sections/IkaFtProfil.vue';
import AlumniUpdateForm from './sections/AlumniUpdateForm.vue';
import { useIkaFtStore } from '@/stores/ikaFt';
import { useAlumniUpdateStore } from '@/stores/alumniUpdate';
import { useDepartementStore } from "@/stores/departement.ts";

const ikaFtStore = useIkaFtStore();
const alumniUpdateStore = useAlumniUpdateStore();
const departementStore = useDepartementStore();
const isLoading = ref(true);

onMounted(async () => {
  try {
    await Promise.all([
      ikaFtStore.fetchIkaFt(),
      departementStore.fetchDepartements()
    ]);
  } catch (error) {
    console.error('Error loading data:', error);
  } finally {
    isLoading.value = false;
  }
});

const handleAlumniUpdateSubmit = (payload: any) => {
  alumniUpdateStore.submitAlumniUpdateRequest(payload);
};
</script>

<template>
  <MainLayout>
    <IkaftAlumniHero />
    <IkaftAlumniQuickNav />
    <SectionLayout>
      <IkaftProfil :ikaft="ikaFtStore.ikaft" :is-loading="isLoading" />
      <AlumniUpdateForm
        :submitting="alumniUpdateStore.submitting"
        :success="alumniUpdateStore.success"
        :error="alumniUpdateStore.error"
        @submit="handleAlumniUpdateSubmit"
        :departements="departementStore.departements"
      />
    </SectionLayout>
  </MainLayout>
</template>