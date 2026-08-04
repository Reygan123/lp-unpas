<script setup lang="ts">
import TitleMain from '@/components/TitleMain.vue';
import TextSection from '@/components/TextSection.vue';
import InteractiveHoverButton from '@/components/ui/interactive-hover-button/InteractiveHoverButton.vue';
import HeroImage from '@/assets/gedung.jpg'
// import { ref } from 'vue';

// const searchQuery = ref('');
</script>

<template>
  <div class="w-full px-[20px] py-[24px] md:px-[60px] md:py-[40px] lg:px-[120px] lg:py-[40px]">
    <!-- <p class="text-[12px] text-gray-400 mb-6">
      <RouterLink to="/" class="hover:text-colorPrimary">Beranda</RouterLink>
      <span class="mx-2">/</span>
      <span class="text-colorPrimary">Kemahasiswaan & Alumni</span>
    </p> -->

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
      <div class="flex flex-col gap-4">
        <TitleMain :text="'Kemahasiswaan & Alumni'" class="!text-left"></TitleMain>
        <TextSection class="text-black/40 !text-left">
          Ruang tumbuh dan berprestasi bagi mahasiswa FT Unpas. Temukan kegiatan, organisasi,
          dukungan karier, komunitas angkatan, serta informasi alumni dalam satu tempat.
        </TextSection>
        <div class="flex flex-wrap gap-4 mt-2">
          <a href="#organisasi">
            <InteractiveHoverButton :text="'Jelajahi Kegiatan'" />
          </a>
          <RouterLink to="/alumni">
            <InteractiveHoverButton :text="'Info Alumni'" :bg-color="'bg-white'" :border-color="'border-gray-300'" :text-color="'text-gray-700'" :bg-hover="'bg-colorPrimary'" :text-hover="'text-white'" />
          </RouterLink>
        </div>
      </div>

      <div class="relative rounded-[24px] overflow-hidden h-[220px] md:h-[280px] lg:h-[480px]">
        <img :src="HeroImage" alt="Kemahasiswaan Fakultas Teknik UNPAS" class="w-full h-full object-cover" loading="lazy" />
        <div class="absolute bottom-0 right-0 w-16 h-16 md:w-20 md:h-20 bg-colorPrimary" style="clip-path: polygon(100% 0, 100% 100%, 0 100%)"></div>
      </div>
    </div>

    <!-- <div class="w-full bg-white shadow-lg rounded-full flex items-center gap-3 px-4 py-2 md:px-6 md:py-3 -mt-6 md:-mt-8 relative z-10 mx-auto max-w-3xl">
      <svg class="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
      </svg>
      <input v-model="searchQuery" type="text" placeholder="Cari kegiatan mahasiswa, organisasi, layanan karier, atau informasi alumni"
        class="flex-1 outline-none text-[13px] md:text-[14px] text-gray-600 placeholder:text-gray-400" />
      <button class="bg-colorPrimary text-white text-[13px] md:text-[14px] font-semibold px-5 py-2 rounded-full hover:opacity-90 transition-opacity duration-300 shrink-0">
        Cari
      </button>
    </div> -->
  </div>
</template>