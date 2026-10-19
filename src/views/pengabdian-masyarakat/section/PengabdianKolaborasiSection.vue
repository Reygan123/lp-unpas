<script setup lang="ts">
import kolaborasiIllustration from '@/assets/org.webp'
import ContactAdminButton from '@/components/ContactAdminButton.vue';

const points = [
  {
    title: 'Ajukan Permohonan',
    desc: 'Sampaikan kebutuhan pengabdian masyarakat Anda kepada kami.',
    iconBg: 'bg-orange-500',
    icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
  },
  {
    title: 'Kolaborasi Program',
    desc: 'Kita rancang solusi dan program yang tepat bersama.',
    iconBg: 'bg-[#0e2a52]',
    icon: 'M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-7.13a4 4 0 11-8 0 4 4 0 018 0zm6 12h4v-2a4 4 0 00-3-3.87m0-8.13a4 4 0 010 7.75'
  },
  {
    title: 'Wujudkan Dampak',
    desc: 'Bersama menciptakan perubahan positif yang berkelanjutan.',
    iconBg: 'bg-green-600',
    icon: 'M12 3C7 8 4 11 4 15a8 8 0 0016 0c0-4-3-7-8-12z'
  }
];
</script>

<template>
  <div class="w-full px-[20px] py-[40px] md:px-[60px] md:py-[50px] lg:px-[120px] lg:py-[60px]">
    <div class="relative rounded-3xl bg-[#FDF3E7] overflow-hidden">
      <div class="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] items-center gap-6 lg:gap-10 px-6 md:px-10 lg:px-12 py-8 lg:py-6">

        <div class="w-full lg:w-[180px] flex justify-center">
          <img :src="kolaborasiIllustration" alt="Kolaborasi Pengabdian Masyarakat" class="w-[160px] md:w-[180px] object-contain" loading="lazy" />
        </div>

        <div class="flex flex-col gap-4">
          <div>
            <h3 class="font-bold text-[18px] md:text-[20px] text-gray-800 leading-tight">
              Mari Berkolaborasi untuk Kebaikan Bersama
            </h3>
            <p class="text-[13px] md:text-[14px] text-gray-500 mt-1 max-w-xl">
              Bersama Fakultas Teknik Universitas Pasundan, wujudkan program pengabdian yang berdampak nyata bagi masyarakat dan lingkungan.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            <div v-for="(point, i) in points" :key="i" class="flex items-start gap-3">
              <div :class="['flex items-center justify-center rounded-full shrink-0 w-9 h-9', point.iconBg]">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="point.icon" />
                </svg>
              </div>
              <div>
                <p class="font-semibold text-[13px] text-gray-800 leading-tight">{{ point.title }}</p>
                <p class="text-[12px] text-gray-500 leading-snug mt-0.5">{{ point.desc }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="w-full lg:w-auto flex justify-center lg:justify-end">
          <ContactAdminButton text="Hubungi Kami" bg-color="bg-colorPrimary" border-color="border-colorPrimary" text-color="text-white" bg-hover="bg-white" text-hover="text-colorPrimary" />
        </div>

      </div>
    </div>
  </div>
</template>