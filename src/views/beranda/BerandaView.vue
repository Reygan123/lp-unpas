<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { berandaStore } from '@/stores'
import TestimonialsSection from '@/components/sections/TestimonialsSection.vue'
import ProdiDetailKegiatan from '../prodiDetail/sections/ProdiDetailKegiatan.vue'
import MitraSection from '@/components/sections/MitraSection.vue'
import { usePartnerStore } from '@/stores/partner'
import BerandaSambutan from './section/BerandaSambutan.vue'
import MainLayout from '@/layouts/MainLayout.vue'
import { useSliderStore } from '@/stores/slider'
import { useFakultasStore } from '@/stores/fakultas'
import { useTestimoniStore } from '@/stores/testimoni'
import BerandaTentang from './section/BerandaTentang.vue'
import ProdiAlasan from '../prodi/sections/ProdiAlasan.vue'
import BerandaInovasi from './section/BerandaInovasi.vue'
import BerandaAgenda from './section/BerandaAgenda.vue'
import BerandaBerita from './section/BerandaBerita.vue'
import BerandaFasilitas from './section/BerandaFasilitas.vue'
import HomeSlider from '@/components/HomeSlider.vue'
import ProdiDetailPrestasi from '../prodiDetail/sections/ProdiDetailPrestasi.vue'
import CTASection from '@/components/sections/CTASection.vue'
import { useOrmawaStore } from '@/stores/ormawa.ts'

const partnerStore = usePartnerStore();
const sliderStore = useSliderStore();
const fakultasStore = useFakultasStore();
const testimoniStore = useTestimoniStore();
const organisasiStore = useOrmawaStore();

const isLoading = ref(true);

onMounted(async () => {
  try {
    await Promise.all([
      berandaStore.getInitialData(),
      partnerStore.fetchPartnersHome(),
      sliderStore.fetchSlider(),
      fakultasStore.fetchFakultas(),
      testimoniStore.fetchTestimoni(),
      organisasiStore.fetchOrmawa()
    ]);
  } finally {
    isLoading.value = false;
  }
})
</script>

<template>
  <MainLayout>
    <HomeSlider :sliders="sliderStore.sliders ?? []" :is-loading="isLoading" />
    <BerandaSambutan :fakultas="fakultasStore.fakultas" :dosen="berandaStore.dosenData" />
    <BerandaTentang :fakultas="fakultasStore.fakultas" />
    <ProdiAlasan :unggulan="berandaStore.ungulanData" :fakultas="fakultasStore.fakultas" />
    <BerandaInovasi :fakultas="fakultasStore.fakultas"/>
    <MitraSection :partners="partnerStore.partners" />
    <ProdiDetailPrestasi :prestasi="berandaStore.prestasiData" />
    <ProdiDetailKegiatan :organisasi="organisasiStore.ormawa" />
    <BerandaAgenda v-if="berandaStore.agendaData.length > 0" :agenda="berandaStore.agendaData" />
    <BerandaFasilitas :fasilitas="berandaStore.fasilitasData" />
    <TestimonialsSection v-if="testimoniStore.testimoni" :testimoni="testimoniStore.testimoni" />
    <BerandaBerita :fakultas="fakultasStore.fakultas" :post="berandaStore.beritaData.slice(0,3)" />
    <CTASection />
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
