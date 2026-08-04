<script setup lang="ts">
import { computed, ref } from 'vue';
import type { Organization } from '@/core/types/organisasi';

const baseUrl = import.meta.env.VITE_APP_IMG_URL;

const getImageUrl = (imagePath: string | null) => {
  if (!imagePath) return 'https://placehold.co/200x200';
  return `${baseUrl}/${imagePath}`;
};

const props = defineProps<{
  organisasi: Organization[]
}>();

const visibleCount = ref(7);

const organisasiOnly = computed(() => {
  return props.organisasi.filter(org => org.category === 'Organisasi').slice(0, visibleCount.value);
});
</script>

<template>
  <div id="organisasi" class="w-full px-[20px] py-[24px] md:px-[60px] lg:px-[120px]">
    <div class="flex items-center justify-between mb-5">
      <h3 class="font-bold text-[18px] md:text-[20px] text-gray-800">Organisasi Mahasiswa</h3>
      <RouterLink to="/kemahasiswaan-dan-alumni/organisasi" class="text-colorPrimary text-[13px] font-semibold">Lihat Semua Organisasi</RouterLink>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4 lg:gap-5">
      <RouterLink v-for="org in organisasiOnly" :key="org.id" :to="`/kemahasiswaan-dan-alumni/organisasi/${org.id}`"
        class="border border-gray-200 rounded-[16px] p-5 flex flex-col items-center gap-2 text-center hover:shadow-lg transition-shadow duration-300">
        <img :src="getImageUrl(org.image)" :alt="org.name" class="w-14 h-14 object-contain" loading="lazy" />
        <p class="font-bold text-[13px] text-gray-800">{{ org.name }}</p>
        <p class="text-[11px] text-gray-500 leading-snug">{{ org.description }}</p>
      </RouterLink>
    </div>
  </div>
</template>