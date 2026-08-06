<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';
import OrmawaHero from './sections/OrmawaHero.vue';
import OrmawaSidebarNav from './sections/OrmawaSidebarNav.vue';
import ProfilOrganisasi from './sections/ProfilOrganisasi.vue';
import StrukturKepengurusan from './sections/StrukturKepengurusan.vue';
import ProgramKerja from './sections/ProgramKerja.vue';
import BeritaKegiatan from './sections/BeritaKegiatan.vue';
import Galeri from './sections/Galeri.vue';
import DokumenOrganisasi from './sections/DokumenOrganisasi.vue';

const route = useRoute();
const isLoading = ref(true);

const ormawa = ref({
  logo: '/images/logo-hmti.png',
  kategori: 'ORMAWA',
  nama: 'HMTI',
  namaLengkap: 'Himpunan Mahasiswa Teknik Industri',
  unit: 'Fakultas Teknik – Universitas Pasundan',
  tagline: 'Bersinergi • Berintegritas • Berkarya',
  banner: '/images/hmti-banner.jpg',
  periode: '2025/2026',
  jumlahAnggota: '126 Mahasiswa',
  pembina: 'Dr. Ir. Yudi Rahayu, MT.',
  kontak: 'hmti@unpas.ac.id / @hmti.unpas',
});

const pengurusInti = ref([
  { foto: '/images/pengurus/raka.jpg', jabatan: 'Ketua', nama: 'Raka Pratama' },
  { foto: '/images/pengurus/salsa.jpg', jabatan: 'Wakil Ketua', nama: 'Salsa Anindita' },
  { foto: '/images/pengurus/dinda.jpg', jabatan: 'Sekretaris', nama: 'Dinda Aulia' },
  { foto: '/images/pengurus/fauzan.jpg', jabatan: 'Bendahara', nama: 'Fauzan Akbar' },
]);

const berita = ref([
  { foto: '/images/berita/industrial-visit.jpg', title: 'HMTI UNPAS Gelar Industrial Visit ke PT XYZ', tanggal: '20 Mei 2025', desc: 'Kegiatan ini bertujuan untuk menambah wawasan mahasiswa mengenai dunia industri...' },
  { foto: '/images/berita/seminar.jpg', title: 'Seminar Nasional Teknik Industri 2025', tanggal: '15 Mei 2025', desc: 'Mengangkat tema "Transformasi Industri untuk Masa Depan Berkelanjutan"...' },
  { foto: '/images/berita/pengabdian.jpg', title: 'Pengabdian Masyarakat di Desa Cileunyi', tanggal: '5 Mei 2025', desc: 'HMTI UNPAS melaksanakan kegiatan pengabdian masyarakat di bidang edukasi dan...' },
]);

const galeri = ref([
  { src: '/images/galeri/hmti-1.jpg' },
  { src: '/images/galeri/hmti-2.jpg' },
  { src: '/images/galeri/hmti-3.jpg' },
  { src: '/images/galeri/hmti-4.jpg' },
  { src: '/images/galeri/hmti-5.jpg', isVideo: true },
  { src: '/images/galeri/hmti-6.jpg', isVideo: true },
]);

onMounted(async () => {
  try {
  } catch (error) {
    console.error('Error loading data:', error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <MainLayout>
    <OrmawaHero :ormawa="ormawa" />

    <section class="bg-netral pt-14 lg:pt-16 pb-16 lg:pb-24">
      <div class="max-w-7xl mx-auto px-4 lg:px-8 grid lg:grid-cols-4 gap-6 items-start">
        <div class="lg:col-span-1">
          <OrmawaSidebarNav />
        </div>

        <div class="lg:col-span-3 flex flex-col">
          <ProfilOrganisasi />
          <StrukturKepengurusan
            :periode="ormawa.periode"
            :total-pengurus="'32 Orang'"
            :pengurus-inti="pengurusInti"
          />
          <ProgramKerja />

          <div id="kontak" class="grid lg:grid-cols-2 gap-6 mt-10 scroll-mt-24">
            <BeritaKegiatan :berita="berita" />
            <Galeri :galeri="galeri" />
          </div>

          <DokumenOrganisasi />
        </div>
      </div>
    </section>
  </MainLayout>
</template>