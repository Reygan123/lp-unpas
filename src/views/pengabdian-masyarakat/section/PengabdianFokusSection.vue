<script setup lang="ts">
import TitleSection from '@/components/TitleSection.vue';
import SectionLayout from '@/layouts/SectionLayout.vue';
import { RouterLink } from 'vue-router'

interface FokusItem {
  title: string
  desc: string
  iconBg: string
  icon: string
}

const fokusItems: FokusItem[] = [
  {
    title: 'Pendidikan',
    desc: 'Peningkatan kualitas pendidikan dan literasi di masyarakat.',
    iconBg: 'bg-orange-100 text-orange-500',
    icon: 'M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.42A12.083 12.083 0 0112 20.055 12.083 12.083 0 015.84 10.58L12 14z'
  },
  {
    title: 'Kesehatan',
    desc: 'Edukasi dan layanan kesehatan berbasis teknologi tepat guna.',
    iconBg: 'bg-red-100 text-red-500',
    icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
  },
  {
    title: 'Lingkungan',
    desc: 'Pengelolaan lingkungan dan energi terbarukan untuk masyarakat.',
    iconBg: 'bg-green-100 text-green-600',
    icon: 'M12 3C7 8 4 11 4 15a8 8 0 0016 0c0-4-3-7-8-12z'
  },
  {
    title: 'Ekonomi Masyarakat',
    desc: 'Pendampingan UMKM dan penguatan ekonomi kerakyatan.',
    iconBg: 'bg-yellow-100 text-yellow-600',
    icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V6m0 10v2'
  },
  {
    title: 'Teknologi Tepat Guna',
    desc: 'Penerapan teknologi sederhana untuk kebutuhan masyarakat.',
    iconBg: 'bg-blue-100 text-blue-500',
    icon: 'M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18'
  },
  {
    title: 'Kebencanaan',
    desc: 'Mitigasi dan edukasi kesiapsiagaan bencana bagi masyarakat.',
    iconBg: 'bg-purple-100 text-purple-500',
    icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
  }
];
</script>

<template>
  <SectionLayout>
    <div class="flex items-center gap-3">
      <span class="w-1 h-6 bg-colorPrimary rounded-full"></span>
      <TitleSection text="Fokus Pengabdian" align="left" class="!text-left !mx-0" />
    </div>

    <div class="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-8 mt-8">
      <div v-for="(item, i) in fokusItems" :key="i"
        class="p-5 flex flex-col gap-3 rounded-[20px] transition-all duration-300 group cursor-pointer hoverAnimation shadow-gray-300/5 hover:shadow-black/5 shadow-xl hover:shadow-xl">
        <div :class="['flex items-center justify-center rounded-2xl shrink-0 w-12 h-12 md:w-14 md:h-14', item.iconBg]">
          <svg class="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="item.icon" />
          </svg>
        </div>
        <h4 class="font-bold text-[15px] md:text-[17px] lg:text-[20px] text-gray-800 leading-tight">
          {{ item.title }}
        </h4>
        <p class="text-[13px] md:text-[14px] lg:text-[16px] text-gray-500 leading-relaxed">
          {{ item.desc }}
        </p>
      </div>
    </div>

    <!-- <div class="mt-8">
      <RouterLink to="/pengabdian-masyarakat/fokus"
        class="flex items-center gap-2 w-fit border border-colorPrimary text-colorPrimary hover:bg-colorPrimary hover:text-white font-semibold text-[14px] px-6 py-3 rounded-full transition-colors duration-300">
        Lihat Semua Fokus Pengabdian
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </RouterLink>
    </div> -->
  </SectionLayout>
</template>