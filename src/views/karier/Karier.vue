<script setup lang="ts">
import { onMounted, ref } from "vue";
import MainLayout from '@/layouts/MainLayout.vue';
import SectionLayout from '@/layouts/SectionLayout.vue';
import KarierHero from './sections/KarierHEro.vue';
import KarierQuickNav from './sections/KarierQuickNav.vue';
import MagangSection from './sections/MagangSection.vue';
import LowonganSection from './sections/LowonganSection.vue';
import WebinarSection from './sections/WebinarSection.vue';
import AlumniNetworkingSection from './sections/AlumniNetworkingSection.vue';
import TracerStudySection from './sections/TracerStudySection.vue';
import CvReviewForm from './sections/CVReviewForm.vue';
import { useMagangStore } from '@/stores/magang';
import { useLowonganStore } from '@/stores/lowongan';
import { useWebinarStore } from '@/stores/webinar';
import { useAlumniNetworkingStore } from '@/stores/alumniNetworking';
import { useTracerStudyPartisipasiStore } from '@/stores/tracerStudyPartisipasi';
import { useCvReviewStore } from '@/stores/cvReview';

const magangStore = useMagangStore();
const lowonganStore = useLowonganStore();
const webinarStore = useWebinarStore();
const alumniNetworkingStore = useAlumniNetworkingStore();
const tracerStudyPartisipasiStore = useTracerStudyPartisipasiStore();
const cvReviewStore = useCvReviewStore();

const isLoading = ref(true);

onMounted(async () => {
  try {
    await Promise.all([
      magangStore.fetchMagang(),
      lowonganStore.fetchLowongan(),
      webinarStore.fetchWebinar(),
      alumniNetworkingStore.fetchAlumniNetworking(),
      tracerStudyPartisipasiStore.fetchTracerStudyPartisipasi(),
    ]);
  } catch (error) {
    console.error('Error loading data:', error);
  } finally {
    isLoading.value = false;
  }
});

const handleCvReviewSubmit = (payload: any) => {
  cvReviewStore.submitCvReviewRequest(payload);
};
</script>

<template>
  <MainLayout>
    <KarierHero />
    <KarierQuickNav />
    <SectionLayout>
      <MagangSection :magang="magangStore.magang" :is-loading="isLoading" />
      <LowonganSection :lowongan="lowonganStore.lowongan" :is-loading="isLoading" />
      <WebinarSection :webinar="webinarStore.webinar" :is-loading="isLoading" />
      <AlumniNetworkingSection :alumni-networking="alumniNetworkingStore.alumniNetworking" :is-loading="isLoading" />
      <TracerStudySection :tracer-study-partisipasi="tracerStudyPartisipasiStore.tracerStudyPartisipasi" :is-loading="isLoading" />
      <CvReviewForm
        :submitting="cvReviewStore.submitting"
        :success="cvReviewStore.success"
        :error="cvReviewStore.error"
        @submit="handleCvReviewSubmit"
      />
    </SectionLayout>
  </MainLayout>
</template>