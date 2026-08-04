<script setup lang="ts">
import TitleSection from '@/components/TitleSection.vue';
import SectionLayout from '@/layouts/SectionLayout.vue';
import { RouterLink } from 'vue-router'

interface BeritaItem {
  image: string
  title: string
  desc: string
  date: string
  link?: string
}

defineProps<{
  beritaItems: BeritaItem[]
}>();
</script>

<template>
  <SectionLayout>
    <div class="flex items-center gap-3">
      <span class="w-1 h-6 bg-colorPrimary rounded-full"></span>
      <TitleSection text="Berita & Kegiatan" align="left" class="!text-left !mx-0" />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-8">
      <RouterLink v-for="(item, i) in beritaItems" :key="i" :to="item.link || '#'"
        class="flex flex-col rounded-[20px] overflow-hidden transition-all duration-300 group cursor-pointer hoverAnimation shadow-gray-300/5 hover:shadow-black/5 shadow-xl hover:shadow-xl">
        <div class="w-full h-40 md:h-44 overflow-hidden bg-[#F0F0F0]">
          <img :src="item.image" :alt="item.title"
            class="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" />
        </div>
        <div class="p-5 flex flex-col gap-2">
          <h4 class="font-bold text-[15px] md:text-[16px] text-gray-800 leading-tight line-clamp-2">
            {{ item.title }}
          </h4>
          <p class="text-[13px] text-gray-500 leading-relaxed line-clamp-2">
            {{ item.desc }}
          </p>
          <p class="text-[12px] text-gray-400 mt-1">
            {{ item.date }}
          </p>
        </div>
      </RouterLink>
    </div>

    <!-- <div class="mt-8 text-right">
      <RouterLink to="/berita"
        class="inline-flex items-center gap-2 text-colorPrimary font-semibold text-[14px]">
        Lihat Semua Berita
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </RouterLink>
    </div> -->
  </SectionLayout>
</template>