<script setup lang="ts">
import { onMounted, onUnmounted, ref, defineAsyncComponent } from 'vue'
import { berandaStore } from '@/stores'
import { usePartnerStore } from '@/stores/partner'
import MainLayout from '@/layouts/MainLayout.vue'
import { useFakultasStore } from '@/stores/fakultas'
import { useTestimoniStore } from '@/stores/testimoni'
import { useOrmawaStore } from '@/stores/ormawa.ts'
import HomeSlider from '@/components/HomeSlider.vue'

const BerandaSambutan = defineAsyncComponent(() => import('./section/BerandaSambutan.vue'))
const BerandaTentang = defineAsyncComponent(() => import('./section/BerandaTentang.vue'))
const ProdiAlasan = defineAsyncComponent(() => import('../prodi/sections/ProdiAlasan.vue'))
const BerandaInovasi = defineAsyncComponent(() => import('./section/BerandaInovasi.vue'))
const MitraSection = defineAsyncComponent(() => import('@/components/sections/MitraSection.vue'))
const ProdiDetailPrestasi = defineAsyncComponent(() => import('../prodiDetail/sections/ProdiDetailPrestasi.vue'))
const ProdiDetailKegiatan = defineAsyncComponent(() => import('../prodiDetail/sections/ProdiDetailKegiatan.vue'))
const BerandaAgenda = defineAsyncComponent(() => import('./section/BerandaAgenda.vue'))
const BerandaFasilitas = defineAsyncComponent(() => import('./section/BerandaFasilitas.vue'))
const TestimonialsSection = defineAsyncComponent(() => import('@/components/sections/TestimonialsSection.vue'))
const BerandaBerita = defineAsyncComponent(() => import('./section/BerandaBerita.vue'))
const CTASection = defineAsyncComponent(() => import('@/components/sections/CTASection.vue'))

const partnerStore = usePartnerStore();
const fakultasStore = useFakultasStore();
const testimoniStore = useTestimoniStore();
const organisasiStore = useOrmawaStore();

const isLoading = ref(true);
const deferRender = ref(false);
const triggerRef = ref<HTMLElement | null>(null);
let observer: IntersectionObserver | null = null;

onMounted(async () => {
  observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      deferRender.value = true;
      if (triggerRef.value && observer) {
        observer.unobserve(triggerRef.value);
      }
    }
  }, { rootMargin: '500px' });

  if (triggerRef.value) {
    observer.observe(triggerRef.value);
  }

  // Fallback in case observer fails to trigger (e.g. fast network but observer not firing)
  setTimeout(() => {
    if (!deferRender.value) deferRender.value = true;
  }, 2000);

  try {
    await Promise.all([
      berandaStore.getInitialData(),
      partnerStore.fetchPartnersHome(),
      fakultasStore.fetchFakultas(),
      testimoniStore.fetchTestimoni(),
      organisasiStore.fetchOrmawa()
    ]);
  } finally {
    isLoading.value = false;
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
})
</script>

<template>
  <MainLayout>
    <HomeSlider />
    <BerandaSambutan :fakultas="fakultasStore.fakultas" :dosen="berandaStore.dosenData" />
    <div ref="triggerRef"></div>
    <template v-if="deferRender">
      <BerandaTentang :fakultas="fakultasStore.fakultas" />
      <ProdiAlasan :unggulan="berandaStore.ungulanData" :fakultas="fakultasStore.fakultas" />
      <BerandaInovasi :fakultas="fakultasStore.fakultas"/>
      <MitraSection :partners="partnerStore.partners" />
      <ProdiDetailPrestasi :prestasi="berandaStore.prestasiData" />
      <ProdiDetailKegiatan :organisasi="organisasiStore.ormawa" />
      <BerandaAgenda v-if="berandaStore.agendaData.length > 0" :agenda="berandaStore.agendaData" />
      <BerandaFasilitas :fasilitas="berandaStore.fasilitasData" />
      <TestimonialsSection v-if="testimoniStore.testimoni" :testimoni="testimoniStore.testimoni" />
      <BerandaBerita v-if="berandaStore.beritaData.length > 0" :fakultas="fakultasStore.fakultas" :post="berandaStore.beritaData.slice(0,3)" />
      <CTASection />
    </template>
  </MainLayout>
</template>

<style scoped>
#prestasi-scroll {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

#prestasi-scroll::-webkit-scrollbar {
  display: none;
}

.hoverAnimation:hover {
  transform: scale(1.02) translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}
</style>