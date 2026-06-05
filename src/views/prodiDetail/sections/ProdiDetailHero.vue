<script setup lang="ts">
import ContactAdminButton from '@/components/ContactAdminButton.vue';
import TextSection from '@/components/TextSection.vue';
import InteractiveHoverButton from '@/components/ui/interactive-hover-button/InteractiveHoverButton.vue';
import type { Departement } from '@/core/types/departement';

const baseUrl = import.meta.env.VITE_APP_IMG_URL;

const getImageUrl = (imagePath: string | null) => {
  if (!imagePath) return '';
  return `${baseUrl}/${imagePath}`;
};

defineProps<{
  prodiDetail: Departement | null;
  isLoading?: boolean;
}>();
</script>

<template>
  <div class="w-full p-0 md:px-[24px] md:py-[24px] lg:px-[32px] lg:py-[32px]">
    <div class="w-full h-[80vh] lg:h-[80vh] relative">
      <template v-if="isLoading">
        <div class="w-full h-full bg-gray-300 animate-pulse rounded-b-[32px] md:rounded-[16px] lg:rounded-[32px]"></div>
      </template>
      <template v-else-if="prodiDetail">
        <div class="w-full h-full">
          <img :src="getImageUrl(prodiDetail.image1)" alt=""
            class="absolute inset-0 w-full h-full object-cover rounded-b-[32px] md:rounded-[16px] lg:rounded-[32px]">
          <div
            class="absolute inset-0 bg-gradient-to-r from-colorPrimary/50 via-transparent to-transparent rounded-b-[32px] md:rounded-[16px] lg:rounded-[32px] hidden md:block">
          </div>
          <div
            class="absolute inset-0 bg-black/50 rounded-b-[32px] md:rounded-[16px] lg:rounded-[32px] md:hidden block">
          </div>
        </div>

        <div
          class="w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:p-14 p-14 flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
          <div class="w-full md:w-1/2 lg:w-[60%] animate-fade-in-left space-y-4 lg:space-y-6">
            <h1
              class="text-[22px] md:text-[34px] lg:text-[46px] font-bold leading-tight text-center md:text-left text-white line-clamp-3">
              {{ prodiDetail.tagline }}</h1>

            <div
              class="flex gap-4 md:gap-5 lg:gap-6 justify-center items-center md:justify-start md:items-start animate-fade-in-right">
              <a href="https://situ2.unpas.ac.id/spmbfront/jalur-seleksi" target="_blank">
                <InteractiveHoverButton :text="'Daftar Sekarang'" />
              </a>
              <ContactAdminButton :bg-color="'bg-transparent'" :bg-hover="'bg-white'" :border-color="'border-white'"
                :text="'Hubungi Admin'" :text-color="'text-white'" :text-hover="'group-hover:text-colorPrimary'" />
            </div>
          </div>
        </div>

        <div class="absolute bottom-0 left-0 hidden md:block">
          <div class="w-[10px] h-[10px] bg-transparent curved">
            <div class="concaved"></div>
          </div>
          <div class="flex items-end">
          <div class="w-full bg-[#f3f4f4] pt-4 pr-4 rounded-tr-[4px] md:rounded-tr-[8px] lg:rounded-tr-[16px]">
          <div
            class="w-fit px-10 py-6 bg-colorPrimary/25 backdrop-blur-lg rounded-[4px] md:rounded-[8px] lg:rounded-[16px] items-center animate-fade-in-bottom flex info-box">
            <div class="border-white/25 text-[#444444] px-10">
              <h6 class="text-[18px] md:text-[20px] lg:text-[22px] font-medium">Akreditasi</h6>
              <TextSection :weight-text="'font-light'">{{ prodiDetail.akreditasi }}</TextSection>
            </div>
            <div class="border-l-2 border-r-2 border-white/25 text-[#444444] px-10">
              <h6 class="text-[18px] md:text-[20px] lg:text-[22px] font-medium">Fasilitas</h6>
              <TextSection :weight-text="'font-light'">Modern</TextSection>
            </div>
            <div class="border-white/25 text-[#444444] px-10">
              <h6 class="text-[18px] md:text-[20px] lg:text-[22px] font-medium">Dosen</h6>
              <TextSection :weight-text="'font-light'">Berpengalaman</TextSection>
            </div>
          </div>
          </div>
          <div class="w-[10px] h-[10px] bg-transparent curved-2">
                <div class="concaved-2"></div>
              </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style>
.curved {
  height: 20px;
  overflow: hidden;
  position: relative;
  transform: rotateX(180deg);
  width: 20px;
}

.concaved {
  border-radius: 50%;
  box-shadow: -20px -20px #f3f4f4;
  height: 40px;
  width: 40px;
  position: absolute;
  top: 0;
  left: 0;
}

.curved-2 {
  height: 20px;
  overflow: hidden;
  position: relative;
  transform: rotateX(180deg) ;
  width: 20px;
}

.concaved-2 {
  border-radius: 50%;
  box-shadow: -20px -20px #f3f4f4;
  height: 40px;
  width: 40px;
  position: absolute;
  top: 0;
  left: 0;
}

.animate-fade-in-left {
  animation: fadeInLeft 1s ease-out forwards;
}

.animate-fade-in-right {
  animation: fadeInRight 1s ease-out forwards;
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-70px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(70px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
