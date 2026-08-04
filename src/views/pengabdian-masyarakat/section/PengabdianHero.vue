<script setup lang="ts">
import ContactAdminButton from '@/components/ContactAdminButton.vue';
import TextSection from '@/components/TextSection.vue';
import TitleSection from '@/components/TitleSection.vue';
import InteractiveHoverButton from '@/components/ui/interactive-hover-button/InteractiveHoverButton.vue';
import SectionLayout from '@/layouts/SectionLayout.vue';
import Gedung from '@/assets/gedung.jpg'

const features = [
  {
    title: 'Pemberdayaan Masyarakat',
    desc: 'Mendorong kemandirian dan kesejahteraan masyarakat',
    iconBg: 'bg-orange-100 text-orange-500',
    icon: 'M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-7.13a4 4 0 11-8 0 4 4 0 018 0z'
  },
  {
    title: 'Kolaborasi Multipihak',
    desc: 'Bersinergi dengan pemerintah, industri, dan komunitas',
    iconBg: 'bg-blue-100 text-blue-600',
    icon: 'M12 4a4 4 0 100 8 4 4 0 000-8zM6 20a6 6 0 0112 0'
  },
  {
    title: 'Berkelanjutan',
    desc: 'Program dirancang untuk memberi dampak jangka panjang',
    iconBg: 'bg-green-100 text-green-600',
    icon: 'M12 3C7 8 4 11 4 15a8 8 0 0016 0c0-4-3-7-8-12z'
  }
];
</script>

<template>
  <!-- <SectionLayout> -->
    <div class="relative w-full overflow-hidden">
      <div class="absolute top-[3vh] left-[2vw] grid grid-cols-6 gap-[1vw] opacity-40 pointer-events-none">
        <span v-for="n in 30" :key="n" class="w-[0.4vw] h-[0.4vw] rounded-full bg-gray-400"></span>
      </div>

      <div class="relative w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-[2vh] lg:gap-0">
        <div class="relative z-10 flex flex-col justify-center text-center lg:text-left gap-[1vh] lg:gap-[1.3vh] px-[5vw] lg:pl-[5vw] lg:pr-[2vw] py-[4vh] lg:py-0">
          <TitleSection text="Pengabdian kepada Masyarakat"></TitleSection>
          <TextSection>
            Wujud nyata kontribusi Fakultas Teknik Universitas Pasundan dalam menerapkan
            ilmu pengetahuan dan teknologi untuk kesejahteraan masyarakat.
          </TextSection>

          <div class="flex flex-wrap items-center justify-center lg:justify-start gap-[2vw] lg:gap-[1vw] mt-[1.5vh]">
            <a href="https://pmb.unpas.ac.id/" target="_blank">
              <InteractiveHoverButton :text="'Daftar Sekarang'" />
            </a>
            <ContactAdminButton text="Hubungi Admin" bg-color="bg-none" border-color="border-colorPrimary"
              text-color="text-colorPrimary" bg-hover="bg-colorPrimary" text-hover="text-white" />
          </div>
        </div>

        <div class="relative w-full h-[32vh] lg:h-[65vh] order-first lg:order-last">
          <img
            :src="Gedung"
            alt="Pengabdian Masyarakat Fakultas Teknik UNPAS"
            class="w-full h-full object-cover rounded-[3vw] lg:rounded-none"
            loading="lazy" />
          <div class="hidden lg:block absolute inset-y-0 left-0 w-[15vw] bg-gradient-to-r from-white to-transparent"></div>
        </div>

        <div class="hidden lg:flex flex-col gap-[1.4vh] absolute top-1/2 -translate-y-1/2 right-[1.2vw] w-[16vw] z-20">
          <div v-for="(feature, i) in features" :key="i"
            class="flex items-start gap-[0.9vw] bg-white rounded-[0.9vw] p-[1vw] shadow-lg">
            <div :class="['flex items-center justify-center rounded-full shrink-0 w-[2.6vw] h-[2.6vw]', feature.iconBg]">
              <svg class="w-[1.3vw] h-[1.3vw]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="feature.icon" />
              </svg>
            </div>
            <div>
              <p class="font-bold text-[0.85vw] text-gray-800 leading-tight">{{ feature.title }}</p>
              <p class="text-[0.72vw] text-gray-500 leading-snug mt-[0.3vh]">{{ feature.desc }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="flex lg:hidden flex-col gap-[1vh] px-[5vw] pt-[2vh]">
        <div v-for="(feature, i) in features" :key="i"
          class="flex items-start gap-[2vw] bg-white rounded-[2vw] p-[2.5vw] shadow-md">
          <div :class="['flex items-center justify-center rounded-full shrink-0 w-[7vw] h-[7vw]', feature.iconBg]">
            <svg class="w-[3.5vw] h-[3.5vw]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="feature.icon" />
            </svg>
          </div>
          <div>
            <p class="font-bold text-[2.6vw] text-gray-800 leading-tight">{{ feature.title }}</p>
            <p class="text-[2.3vw] text-gray-500 leading-snug mt-[0.3vh]">{{ feature.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  <!-- </SectionLayout> -->
</template>