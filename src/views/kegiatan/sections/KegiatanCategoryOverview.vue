<script setup lang="ts">
import TitleSection from '@/components/TitleSection.vue';
import SectionLayout from '@/layouts/SectionLayout.vue';
import { RouterLink } from 'vue-router'

const fokusItems: any[] = [
  {
    title: 'Kehidupan Mahasiswa',
    desc: 'Kehidupan kampus, kegiatan, prestasi, dan galeri mahasiswa.',
    iconBg: 'bg-orange-100 text-orange-500',
    icon: 'M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-7.13a4 4 0 11-8 0 4 4 0 018 0z',
    label: 'Kunjungi',
    to: '/kemahasiswaan-dan-alumni/kehidupan'
  },
  {
    title: 'Organisasi Mahasiswa',
    desc: 'Himpunan dan organisasi kemahasiswaan di lingkungan FT UNPAS.',
    iconBg: 'bg-blue-100 text-blue-600',
    icon: 'M12 15a4 4 0 100-8 4 4 0 000 8zm-6 6l2-5h8l2 5-6-3-6 3z',
    label: 'Kunjungi',
    to: '/kemahasiswaan-dan-alumni/organisasi'
  },
  {
    title: 'Karier',
    desc: 'Informasi magang, lowongan kerja, dan webinar karier.',
    iconBg: 'bg-green-100 text-green-600',
    icon: 'M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18',
    label: 'Kunjungi',
    to: '/kemahasiswaan-dan-alumni/karir'
  },
  {
    title: 'Tokoh Angkatan',
    desc: 'Inspirasi dari representatif terbaik setiap angkatan.',
    iconBg: 'bg-purple-100 text-purple-500',
    icon: 'M12 4a4 4 0 100 8 4 4 0 000-8zM6 20a6 6 0 0112 0',
    label: 'Kunjungi',
    to: '/kemahasiswaan-dan-alumni/tokoh-angkatan'
  },
  {
    title: 'Alumni',
    desc: 'Berita alumni, IKA FT, dan pembaruan data alumni.',
    iconBg: 'bg-yellow-100 text-yellow-600',
    icon: 'M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.42A12.083 12.083 0 0112 20.055 12.083 12.083 0 015.84 10.58L12 14z',
    label: 'Kunjungi',
    to: '/kemahasiswaan-dan-alumni/alumni'
  }
];
</script>

<template>
  <SectionLayout>
    <div class="flex items-center gap-3">
      <span class="w-1 h-6 bg-colorPrimary rounded-full"></span>
      <TitleSection text="Jelajahi Layanan Kemahasiswaan" align="left" class="!text-left !mx-0" />
    </div>

    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 md:gap-8 mt-8">
      <div v-for="(item, i) in fokusItems" :key="i"
        class="bg-white p-5 flex flex-col justify-between gap-4 rounded-[20px] transition-all duration-300 group cursor-pointer hoverAnimation shadow-gray-300/5 hover:shadow-black/5 shadow-xl hover:shadow-xl">
        <div class="space-y-3">
          <div
            :class="['flex items-center justify-center rounded-2xl shrink-0 w-12 h-12 md:w-14 md:h-14', item.iconBg]">
            <svg class="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="item.icon" />
            </svg>
          </div>
          <h4 class="font-bold text-[15px] md:text-[17px] text-gray-800 leading-tight">
            {{ item.title }}
          </h4>
          <p class="text-[13px] md:text-[14px] text-gray-500 leading-relaxed">
            {{ item.desc }}
          </p>
        </div>

        <router-link :to="item.to"
          class="inline-flex items-center gap-1 text-colorPrimary font-semibold text-sm hover:opacity-80">
          {{ item.label }}
          <i class="pi pi-arrow-right text-xs"></i>
        </router-link>
      </div>
    </div>
  </SectionLayout>
</template>