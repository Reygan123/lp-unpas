<script setup lang="ts">
import { berandaStore } from '@/stores'
import { onMounted } from 'vue'
import MainLayout from '@/layouts/MainLayout.vue'
import RisetHero from './sections/RisetHero.vue'
import RisetInovasi from './sections/RisetInovasi.vue'
import RisetJurnal from './sections/RisetJurnal.vue'
import CTASection from '@/components/sections/CTASection.vue'
import RisetFokusSection from './sections/RisetFokusSection.vue'
// import RIsetCapaianSection from './sections/RIsetCapaianSection.vue'
import { useFakultasStore } from '@/stores/fakultas.ts'

const fakultasStore = useFakultasStore();

onMounted(async () => {
  await berandaStore.getDataPortofolio()
  await berandaStore.getDataJurnal()
  await fakultasStore.fetchFakultas()
})

const fokusItems = [
  { title: 'Teknologi & Rekayasa', desc: 'Pengembangan teknologi terapan di bidang teknik mesin, elektro, industri, informatika, dan lainnya.', iconBg: 'bg-orange-100 text-orange-500', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
  { title: 'Lingkungan Keberlanjutan', desc: 'Riset untuk solusi lingkungan, energi terbarukan, dan pembangunan berkelanjutan.', iconBg: 'bg-green-100 text-green-600', icon: 'M12 3C7 8 4 11 4 15a8 8 0 0016 0c0-4-3-7-8-12z' },
  { title: 'Inovasi & Material Maju', desc: 'Pengembangan material maju dan inovasi teknologi untuk berbagai sektor industri.', iconBg: 'bg-purple-100 text-purple-500', icon: 'M12 2l2 7h7l-5.5 4.5L17 21l-5-4-5 4 1.5-7.5L3 9h7z' },
  { title: 'Sistem & Digitalisasi', desc: 'Riset di bidang sistem cerdas, IoT, AI, dan transformasi digital industri.', iconBg: 'bg-blue-100 text-blue-500', icon: 'M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18' },
  { title: 'Pangan & Bioteknologi', desc: 'Inovasi teknologi pangan dan bioproses untuk ketahanan pangan dan kesehatan.', iconBg: 'bg-yellow-100 text-yellow-600', icon: 'M12 2v6m0 0c-4 0-6 3-6 7a6 6 0 0012 0c0-4-2-7-6-7z' },
  { title: 'Kebijakan & Perencanaan', desc: 'Riset kebijakan, tata kelola, dan perencanaan wilayah untuk pembangunan berkelanjutan.', iconBg: 'bg-teal-100 text-teal-600', icon: 'M3 21h18M5 21V7l7-4 7 4v14M9 9h1m4 0h1m-6 4h1m4 0h1m-6 4h1m4 0h1' },
];

const capaianItems = [
  { value: '215+', label: 'Penelitian Aktif', icon: 'M9 3v6l-4 8a2 2 0 002 3h10a2 2 0 002-3l-4-8V3M9 3h6' },
  { value: '120+', label: 'Peneliti', icon: 'M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-7.13a4 4 0 11-8 0 4 4 0 018 0z' },
  { value: '340+', label: 'Publikasi (Scopus/WoS)', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  { value: '60+', label: 'Kerja Sama Industri & Institusi', icon: 'M9 20H4v-2a4 4 0 013-3.87m6-7.13a4 4 0 11-8 0 4 4 0 018 0zm6 12h4v-2a4 4 0 00-3-3.87m0-8.13a4 4 0 010 7.75' },
  { value: '25+', label: 'Hak Kekayaan Intelektual', icon: 'M12 15a4 4 0 100-8 4 4 0 000 8zm-6 6l2-5h8l2 5-6-3-6 3z' },
  { value: '15+', label: 'Kolaborasi Internasional', icon: 'M3 12h18M12 3a15 15 0 010 18M12 3a15 15 0 000 18' },
];

// const beritaItems = [
//   { image: '/images/berita1.jpg', title: 'Penandatanganan MoU Penelitian FT UNPAS dengan PT. XYZ', desc: 'Kolaborasi penelitian dan pengembangan teknologi untuk industri.', date: '22 Mei 2026', link: '/berita/mou-pt-xyz' },
//   { image: '/images/berita2.jpg', title: 'Dosen FT UNPAS Raih Hibah Penelitian Nasional 2026', desc: 'Pendanaan untuk riset inovatif di bidang energi terbarukan.', date: '15 Mei 2026', link: '/berita/hibah-nasional' },
//   { image: '/images/berita3.jpg', title: 'Seminar Nasional Hasil Penelitian & Pengabdian 2026', desc: 'Berbagi hasil riset dan inovasi untuk masa depan yang berkelanjutan.', date: '10 Mei 2026', link: '/berita/seminar-nasional' },
// ];
</script>

<template>
  <MainLayout>
    <RisetHero />
    <RisetFokusSection :fokus-items="fokusItems" />
    <!-- <RIsetCapaianSection :capaian-items="capaianItems" /> -->
    <RisetInovasi :inovasi="berandaStore.portofolioData"/>
    <BerandaBerita :fakultas="fakultasStore.fakultas" :post="berandaStore.beritaData.slice(0,3)" />
    <RisetJurnal v-if="berandaStore.jurnalData.length > 0" :jurnal="berandaStore.jurnalData"/>
    <CTASection />
  </MainLayout>
</template>
<style scoped>
.hoverAnimation:hover {
  transform: translateY(-5px);
  border: 1px solid #e5e7eb;
}
</style>