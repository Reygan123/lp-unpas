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

defineProps<{
  fokusItems: FokusItem[]
}>();
</script>

<template>
  <SectionLayout>
    <div class="flex items-center gap-3">
      <span class="w-1 h-6 bg-colorPrimary rounded-full"></span>
      <TitleSection text="Fokus Penelitian" align="left" class="!text-left !mx-0" />
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
      <RouterLink to="/penelitian/fokus"
        class="flex items-center gap-2 w-fit border border-colorPrimary text-colorPrimary hover:bg-colorPrimary hover:text-white font-semibold text-[14px] px-6 py-3 rounded-full transition-colors duration-300">
        Lihat Semua Fokus Penelitian
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </RouterLink>
    </div> -->
  </SectionLayout>
</template>