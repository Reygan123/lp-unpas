<script setup lang="ts">
import { computed, onMounted } from 'vue';
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
import { useOrmawaDetailStore } from '@/stores/ormawaDetail';
import CTASection from '@/components/sections/CTASection.vue';

const route = useRoute();
const slug = route.params.slug as string;
const ormawaDetailStore = useOrmawaDetailStore();
const isLoading = computed(() => ormawaDetailStore.loading);

const baseUrl = import.meta.env.VITE_APP_IMG_URL

const getImageUrl = (imagePath: string | null) => {
  if (!imagePath) return ''
  return `${baseUrl}/${imagePath}`
}

const ormawa = computed(() => {
  const data = ormawaDetailStore.ormawa || {};
  return {
    logo: getImageUrl(data.logo),
    kategori: data.departement?.jenjang || 'ORMAWA',
    nama: data.singkatan || '-',
    namaLengkap: data.nama || '-',
    unit: data.departement?.name ? `${data.departement.name} - Fakultas Teknik Universitas Pasundan` : 'Fakultas Teknik Universitas Pasundan',
    tagline: data.deskripsi_singkat || '-',
    banner: getImageUrl(data.departement?.image1),
    periode: data.periode_kepengurusan || '-',
    jumlahAnggota: ormawaDetailStore.pengurus?.length ? `${ormawaDetailStore.pengurus.length} Pengurus` : '-',
    pembina: data.ketua || '-',
    kontak: data.media_sosial || '-',
    visi: data.visi || '-',
    misi: data.misi || '-',
    tujuan: data.tujuan || '-',
    nilaiOrganisasi: data.nilai_organisasi || '-',
    ruangLingkup: data.ruang_lingkup || '-',
  };
});

const pengurusInti = computed(() => {
  return (ormawaDetailStore.pengurus || [])
    .slice()
    .sort((a: any, b: any) => (a.urutan || 0) - (b.urutan || 0))
    .map((item: any) => ({
      foto: getImageUrl(item.foto),
      jabatan: item.jabatan,
      nama: item.nama,
      namaBidang: item.nama_bidang,
    }));
});

const totalPengurus = computed(() => `${ormawaDetailStore.pengurus?.length || 0} Orang`);

const programKerja = computed(() => {
  return (ormawaDetailStore.programKerja || []).map((item: any) => ({
    kategori: item.kategori,
    namaProgram: item.nama_program,
    deskripsi: item.deskripsi,
    tanggalPelaksanaan: item.tanggal_pelaksanaan,
    status: item.status,
  }));
});

const galeri = computed(() => {
  return (ormawaDetailStore.galeri || []).map((item: any) => ({
    src: getImageUrl(item.file),
    isVideo: item.tipe === 'video',
    caption: item.caption,
  }));
});

const dokumen = computed(() => {
  return (ormawaDetailStore.dokumen || []).map((item: any) => ({
    id: item.id,
    title: item.judul,
    kategori: item.kategori,
    tahun: item.tahun,
    url: getImageUrl(item.file),
  }));
});

onMounted(async () => {
  try {
    await Promise.all([
      await ormawaDetailStore.fetchOrmawaDetail(slug),
      await ormawaDetailStore.fetchPengurus(slug),
      await ormawaDetailStore.fetchProgramKerja(slug),
      await ormawaDetailStore.fetchBerita(slug),
      await ormawaDetailStore.fetchGaleri(slug),
      await ormawaDetailStore.fetchDokumen(slug),
    ]);
  } catch (error) {
    console.error('Error loading data:', error);
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
          <ProfilOrganisasi :ormawa="ormawa" :is-loading="isLoading" />
          <StrukturKepengurusan
            :periode="ormawa.periode"
            :total-pengurus="totalPengurus"
            :pengurus-inti="pengurusInti"
            :is-loading="isLoading"
          />
          <ProgramKerja :program-kerja="programKerja" :is-loading="isLoading" />

          <div id="kontak" class="grid lg:grid-cols-2 gap-6 mt-10 scroll-mt-24">
            <!-- <BeritaKegiatan :berita="berita" /> -->
            <Galeri :galeri="galeri" :is-loading="isLoading" />
          </div>

          <DokumenOrganisasi :dokumen="dokumen" :is-loading="isLoading" />
        </div>
      </div>
    </section>

    <CTASection />
  </MainLayout>
</template>