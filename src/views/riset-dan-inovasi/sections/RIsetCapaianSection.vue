<script setup lang="ts">
import TitleSection from '@/components/TitleSection.vue';
import SectionLayout from '@/layouts/SectionLayout.vue';
import { RouterLink } from 'vue-router'

interface CapaianItem {
  value: string
  label: string
  icon: string
}

defineProps<{
  capaianItems: CapaianItem[]
}>();
</script>

<template>
  <SectionLayout>
    <div class="flex items-center gap-3">
      <span class="w-1 h-6 bg-colorPrimary rounded-full"></span>
      <TitleSection text="Capaian Penelitian" align="left" class="!text-left !mx-0" />
    </div>

    <div class="bg-[#0e2a52] rounded-[20px] p-6 md:p-10 grid grid-cols-2 md:grid-cols-3 gap-x-6 md:gap-x-10 gap-y-8 mt-8">
      <div v-for="(item, i) in capaianItems" :key="i" class="flex items-center gap-3 md:gap-4">
        <svg class="w-8 h-8 md:w-10 md:h-10 text-white shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" :d="item.icon" />
        </svg>
        <div>
          <p class="text-white font-extrabold text-[22px] md:text-[28px] leading-none">
            {{ item.value }}
          </p>
          <p class="text-white/70 text-[12px] md:text-[13px] mt-1 leading-snug">
            {{ item.label }}
          </p>
        </div>
      </div>
    </div>

    <!-- <div class="mt-8">
      <RouterLink to="/penelitian/capaian"
        class="flex items-center gap-2 w-fit text-colorPrimary font-semibold text-[14px]">
        Lihat Semua Capaian
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </RouterLink>
    </div> -->
  </SectionLayout>
</template>