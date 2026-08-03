<!-- ProdiDetailAkreditasi.vue -->
<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import TitleSection from '@/components/TitleSection.vue';
import TextSection from '@/components/TextSection.vue';
import InteractiveHoverButton from '@/components/ui/interactive-hover-button/InteractiveHoverButton.vue';

import TP from '@/assets/akreditasi/tp.png';
import TP2 from '@/assets/akreditasi/TP - IFT.jpeg';
import PWK from '@/assets/akreditasi/PWK.png';
import TI from '@/assets/akreditasi/TI.jpeg';
import TI2 from '@/assets/akreditasi/TI - PII.png';
import TM from '@/assets/akreditasi/TM.png';
import TL from '@/assets/akreditasi/TL.png';
import TINDUSTRI from '@/assets/akreditasi/TINDUSTRI.png';

interface Sertifikat {
  label: string;
  image: string;
  file?: string; // path PDF asli untuk didownload, opsional
}

interface AkreditasiData {
  peringkat: string;
  berlakuSampai: string;
  sertifikat: Sertifikat[];
}

// GANTI KEY di bawah ini sesuai slug asli masing-masing prodi
const akreditasiMap: Record<string, AkreditasiData> = {
  'teknologi-pangan': {
    peringkat: 'Unggul',
    berlakuSampai: '6 Mei 2030',
    sertifikat: [
      { label: 'BAN-PT', image: TP },
      { label: 'IFT', image: TP2 },
    ],
  },
  'perencanaan-wilayah-dan-kota': {
    peringkat: 'Unggul',
    berlakuSampai: '2030',
    sertifikat: [{ label: 'BAN-PT', image: PWK }],
  },
  'teknik-informatika': {
    peringkat: 'Unggul',
    berlakuSampai: '2030',
    sertifikat: [
      { label: 'BAN-PT', image: TI },
      { label: 'PII', image: TI2 },
    ],
  },
  'teknik-mesin': {
    peringkat: 'Baik Sekali',
    berlakuSampai: '2030',
    sertifikat: [{ label: 'BAN-PT', image: TM }],
  },
  'teknik-lingkungan': {
    peringkat: 'Baik Sekali',
    berlakuSampai: '2030',
    sertifikat: [{ label: 'BAN-PT', image: TL }],
  },
  'teknik-industri': {
    peringkat: 'Unggul',
    berlakuSampai: '2030',
    sertifikat: [{ label: 'BAN-PT', image: TINDUSTRI }],
  },
};

const route = useRoute();
const slug = computed(() => route.params.slug as string);
const data = computed(() => akreditasiMap[slug.value]);

const openImage = (img: string) => {
  window.open(img, '_blank');
};
</script>

<template>
  <div
    v-if="data"
    class="w-full px-[20px] py-[32px] md:px-[60px] md:py-[60px] lg:px-[120px] lg:py-[60px] space-y-12 md:space-y-16 lg:space-y-20"
  >
    <div class="w-full flex flex-col gap-4 md:gap-5 lg:gap-6">
      <div class="w-full lg:w-3/5">
        <TitleSection
          :text="`Akreditasi <span class='text-colorPrimary'>${data.peringkat}</span>`"
          :html="true"
        />
      </div>
      <div class="w-full lg:w-3/5">
        <TextSection>
          Program studi ini telah terakreditasi
          <span class="font-semibold text-colorPrimary">{{ data.peringkat }}</span>
          oleh BAN-PT dan berlaku sampai dengan {{ data.berlakuSampai }}.
        </TextSection>
      </div>
    </div>

    <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
      <div
        v-for="(item, index) in data.sertifikat"
        :key="index"
        class="w-full aspect-[4/3] rounded-[16px] md:rounded-[24px] lg:rounded-[32px] overflow-hidden relative group cursor-pointer"
        @click="openImage(item.image)"
      >
        <div class="absolute inset-0 bg-gradient-to-t from-colorPrimary/90 via-transparent to-transparent z-10"></div>
        <img
          :src="item.image"
          :alt="`Sertifikat Akreditasi ${item.label}`"
          class="w-full h-full object-contain bg-white group-hover:scale-105 transition duration-500"
        />
        <div
          class="absolute bottom-0 left-0 z-20 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500"
        >
          <TextSection class="text-white" :weight-text="'font-bold'">
            Sertifikat {{ item.label }} — Klik untuk perbesar
          </TextSection>
        </div>
      </div>
    </div>

    <div class="w-full flex justify-start">
      <InteractiveHoverButton
        @click="openImage(data.sertifikat[0].image)"
        :text="'Lihat Sertifikat Lengkap'"
      />
    </div>
  </div>
</template>