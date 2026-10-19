<script setup lang="ts">
import TextSection from '@/components/TextSection.vue';
import TitleSection from '@/components/TitleSection.vue';
import type { Faculty } from '@/core/types/fakultas';
import type { Unggulan } from '@/core/types/unggulan';
import Gedung from '@/assets/gedung.webp'
import { computed } from 'vue';
import TextBody from '@/components/TextBody.vue';

const baseUrl = import.meta.env.VITE_APP_IMG_URL;

const getImageUrl = (imagePath: string | null) => {
  if (!imagePath) return Gedung;
  return `${baseUrl}/${imagePath}`;
};

const props = defineProps<{
  unggulan: Unggulan[];
  fakultas: any | null;
}>();

const titleHTML = computed(() => {
  if (!props.fakultas?.name || !props.fakultas) return 'Kenapa Harus Memilih Unpas';
  return `Kenapa Harus Memilih <span class="text-colorPrimary font-bold">${props.fakultas.name || ''}</span> Unpas`;
});
</script>

<template>
  <div
    class="w-full px-[20px] py-[22px] md:px-[60px] md:py-[60px] lg:px-[203px] xl:px-[203px] lg:py-[60px] space-y-12 md:space-y-16 lg:space-y-20">
    <div class="w-full flex justify-center items-center">
      <div class="w-full flex flex-col justify-center items-center text-center lg:max-w-[75%] gap-4 md:gap-5 lg:gap-6">
        <div class="w-full lg:w-[86%]">
          <TitleSection class="md:text-center" :text="titleHTML" :html="true" :word-based="true"></TitleSection>
        </div>
        <div class="w-full flex flex-col gap-4 md:gap-5 lg:gap-6">
          <TextSection>Temukan berbagai program studi yang dirancang untuk mempersiapkan Anda
            menghadapi
            tantangan dunia kerja. Bergabunglah dengan kami dan kembangkan potensi Anda di bidang yang Anda
            cintai.</TextSection>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
      <div v-for="(feature, index) in unggulan" :key="index"
        class="w-full p-6 bg-colorPrimary/10 rounded-[8px] md:rounded-[16px] lg:rounded-[24px] space-y-6 md:space-y-9 lg:space-y-12 hover:-translate-y-2 transition duration-300 shadow-gray-300/5 hover:shadow-black/5 shadow-xl hover:shadow-xl drop-shadow-[0px_20px_40px_rgba(254, 242, 81, 0.5)]">
        <div class="p-4 rounded-full bg-colorPrimary/10 w-fit mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <g clip-path="url(#clip0_16438_6311)">
                            <mask id="mask0_16438_6311" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0"
                                y="0" width="24" height="24">
                                <path d="M24 0H0V24H24V0Z" fill="white" />
                            </mask>
                            <g mask="url(#mask0_16438_6311)">
                                <path
                                    d="M10.7901 15.1693C10.5901 15.1693 10.4001 15.0893 10.2601 14.9493L7.84006 12.5293C7.55006 12.2393 7.55006 11.7593 7.84006 11.4693C8.13006 11.1793 8.61006 11.1793 8.90006 11.4693L10.7901 13.3593L15.0901 9.0593C15.3801 8.7693 15.8601 8.7693 16.1501 9.0593C16.4401 9.3493 16.4401 9.8293 16.1501 10.1193L11.3201 14.9493C11.1801 15.0893 10.9901 15.1693 10.7901 15.1693Z"
                                    fill="#E27C00" />
                                <path
                                    d="M11.9999 22.75C11.3699 22.75 10.7399 22.54 10.2499 22.12L8.66988 20.76C8.50988 20.62 8.10988 20.48 7.89988 20.48H6.17988C4.69988 20.48 3.49988 19.28 3.49988 17.8V16.09C3.49988 15.88 3.35988 15.49 3.21988 15.33L1.86988 13.74C1.04988 12.77 1.04988 11.24 1.86988 10.27L3.21988 8.68C3.35988 8.52 3.49988 8.13 3.49988 7.92V6.2C3.49988 4.72 4.69988 3.52 6.17988 3.52H7.90988C8.11988 3.52 8.51988 3.37 8.67988 3.24L10.2599 1.88C11.2399 1.04 12.7699 1.04 13.7499 1.88L15.3299 3.24C15.4899 3.38 15.8899 3.52 16.0999 3.52H17.7999C19.2799 3.52 20.4799 4.72 20.4799 6.2V7.9C20.4799 8.11 20.6299 8.51 20.7699 8.67L22.1299 10.25C22.9699 11.23 22.9699 12.76 22.1299 13.74L20.7699 15.32C20.6299 15.48 20.4799 15.88 20.4799 16.09V17.79C20.4799 19.27 19.2799 20.47 17.7999 20.47H16.0999C15.8899 20.47 15.4899 20.62 15.3299 20.75L13.7499 22.11C13.2599 22.54 12.6299 22.75 11.9999 22.75ZM6.17988 5.02C5.52988 5.02 4.99988 5.55 4.99988 6.2V7.91C4.99988 8.48 4.72988 9.21 4.35988 9.64L3.00988 11.23C2.65988 11.64 2.65988 12.35 3.00988 12.76L4.35988 14.35C4.72988 14.79 4.99988 15.51 4.99988 16.08V17.79C4.99988 18.44 5.52988 18.97 6.17988 18.97H7.90988C8.48988 18.97 9.21988 19.24 9.65988 19.62L11.2399 20.98C11.6499 21.33 12.3699 21.33 12.7799 20.98L14.3599 19.62C14.7999 19.25 15.5299 18.97 16.1099 18.97H17.8099C18.4599 18.97 18.9899 18.44 18.9899 17.79V16.09C18.9899 15.51 19.2599 14.78 19.6399 14.34L20.9999 12.76C21.3499 12.35 21.3499 11.63 20.9999 11.22L19.6399 9.64C19.2599 9.2 18.9899 8.47 18.9899 7.89V6.2C18.9899 5.55 18.4599 5.02 17.8099 5.02H16.1099C15.5299 5.02 14.7999 4.75 14.3599 4.37L12.7799 3.01C12.3699 2.66 11.6499 2.66 11.2399 3.01L9.65988 4.38C9.21988 4.75 8.47988 5.02 7.90988 5.02H6.17988Z"
                                    fill="#E27C00" />
                            </g>
                        </g>
                        <defs>
                            <clipPath id="clip0_16438_6311">
                                <rect width="24" height="24" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
        </div>
        <div class="text-center space-y-4 md:space-y-5 lg:space-y-6">
          <h3 class="text-[14px] md:text-[18px] lg:text-[22px]">{{ feature.title }}</h3>
          <TextBody><span v-html="feature.description"></span></TextBody>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.border-beam-container {
  position: relative;
  overflow: hidden;
}

/* Grid 1 - bottom border left to right */
.border-beam-container:nth-child(1)::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: -30%;
  height: 2px;
  background: linear-gradient(to right, transparent, transparent 25%, #C22332 50%, transparent 75%, transparent);
  width: 80%;
  animation: borderWalkBottom 2.5s infinite linear;
}

/* Grid 2 - left border top to bottom */
.border-beam-container:nth-child(2)::after {
  content: '';
  position: absolute;
  top: -30%;
  left: 0;
  width: 2px;
  background: linear-gradient(to bottom, transparent, transparent 25%, #C22332 50%, transparent 75%, transparent);
  height: 80%;
  animation: borderWalkLeft 2.5s infinite linear;
}

/* Grid 3 - right border bottom to top */
.border-beam-container:nth-child(3)::after {
  content: '';
  position: absolute;
  bottom: -30%;
  right: 0;
  width: 2px;
  background: linear-gradient(to top, transparent, transparent 25%, #C22332 50%, transparent 75%, transparent);
  height: 80%;
  animation: borderWalkRight 2.5s infinite linear;
}

/* Grid 4 - top border right to left */
.border-beam-container:nth-child(4)::after {
  content: '';
  position: absolute;
  top: 0;
  right: -30%;
  height: 2px;
  background: linear-gradient(to left, transparent, transparent 25%, #C22332 50%, transparent 75%, transparent);
  width: 80%;
  animation: borderWalkTop 2.5s infinite linear;
}

@keyframes borderWalkBottom {
  0% {
    transform: translateX(0%);
  }

  100% {
    transform: translateX(600%);
  }
}

@keyframes borderWalkLeft {
  0% {
    transform: translateY(0%);
  }

  100% {
    transform: translateY(600%);
  }
}

@keyframes borderWalkRight {
  0% {
    transform: translateY(0%);
  }

  100% {
    transform: translateY(-600%);
  }
}

@keyframes borderWalkTop {
  0% {
    transform: translateX(0%);
  }

  100% {
    transform: translateX(-600%);
  }
}

@media (max-width: 767px) {

  /* Pertahankan animasi untuk semua child */
  .border-beam-container:nth-child(n)::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: -30%;
    height: 2px;
    background: linear-gradient(to right, transparent, transparent 25%, #C22332 50%, transparent 75%, transparent);
    width: 60%;
    animation: borderWalkBottom 2.5s infinite linear;
  }

  /* Hapus override yang menonaktifkan animasi */
  .border-beam-container:nth-child(2)::after,
  .border-beam-container:nth-child(3)::after,
  .border-beam-container:nth-child(4)::after {
    content: '';
    animation: borderWalkBottom 2.5s infinite linear;
  }
}
</style>
