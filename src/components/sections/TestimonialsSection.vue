<script setup lang="ts">
import SectionLayout from '@/layouts/SectionLayout.vue';
import TitleSection from '@/components/TitleSection.vue';
import TextSection from '@/components/TextSection.vue';
import type { Testimonial } from '@/core/types/testimoni';
import Gedung from '@/assets/gedung.jpg'
import InteractiveHoverButton from '../ui/interactive-hover-button/InteractiveHoverButton.vue';
import { computed, ref } from 'vue';
import TestimonialsSectionMobile from '../TestimonialsSectionMobile.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const props = defineProps<{
  testimoni: Testimonial[];
}>();

const baseUrl = import.meta.env.VITE_APP_IMG_URL;
const activeIndex = ref(1);
const swiperInstance = ref<any>(null);

const limitedTestimonials = computed(() => {
  return props.testimoni.slice(0, 6);
});

const getImageUrl = (imagePath: string | null) => {
  if (!imagePath) return Gedung;
  return `${baseUrl}/${imagePath}`;
};

const onSwiper = (swiper: any) => {
  swiperInstance.value = swiper;
};

const onSlideChange = (swiper: any) => {
  activeIndex.value = swiper.realIndex;
};

const prevSlide = () => {
  swiperInstance.value?.slidePrev();
};

const nextSlide = () => {
  swiperInstance.value?.slideNext();
};

const modules = [Navigation, Pagination, Autoplay];
</script>

<template>
  <div class="bg-[#EFF0F0]">
    <SectionLayout>
      <div class="w-full text-center flex flex-col justify-center items-center gap-4">
        <div class="w-fit py-2 px-5 bg-colorPrimary/10 rounded-[16px] md:rounded-[24px] lg:rounded-[32px]">
          <p class="text-colorPrimary text-sm lg:text-base">Testimonials</p>
        </div>
        <TitleSection :text="'Apa Kata Mereka'"></TitleSection>
        <TextSection class="lg:max-w-2xl">Kisah sukses dan pengalaman nyata dari mereka yang telah merasakan transformasi digital serta efisiensi terbaik bersama kami.</TextSection>
      </div>
    </SectionLayout>

    <div class="w-full px-[20px] py-[32px] md:px-[60px] md:py-[32px] lg:px-[240px] hidden lg:block">
      <div class="w-full relative h-[65vh] flex flex-col justify-end">
        <div class="w-[30%] xl:w-[32%] absolute top-10 right-0 space-y-8">
          <TextSection>
            <span class="line-clamp-5 xl:line-clamp-6" v-html="testimoni[activeIndex]?.description"></span>
          </TextSection>
          <div class="space-y-1">
            <p class="text-[10px] md:text-[12px] lg:text-[15px]">{{ testimoni[activeIndex]?.name }}</p>
            <p class="text-[8px] md:text-[10px] lg:text-[11px]">{{ testimoni[activeIndex]?.title }}</p>
          </div>
        </div>

        <!-- Swiper for profile testimoni -->
<Swiper
  v-if="testimoni && testimoni.length"
  :modules="modules"
  :slides-per-view="3"
  :space-between="20"
  :centered-slides="true"
  :loop="true"
  :autoplay="{
    delay: 3000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
    waitForTransition: true
  }"
  @swiper="onSwiper"
  @slide-change="onSlideChange"
  class="w-full h-full"
>
          <SwiperSlide v-for="(item, index) in limitedTestimonials" :key="index">
            <div class="transition-all duration-500 ease-in-out cursor-pointer w-full pb-5" :class="{
              'h-[25vh]': activeIndex !== index,
              'h-[65vh] pt-8': activeIndex === index
            }">
              <img :src="getImageUrl(item.image)"
                class="w-full h-full object-cover object-center rounded-[8px] md:rounded-[16px] lg:rounded-[24px] transition-all duration-500" />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <div class="w-full flex justify-between items-center mt-6">
        <!-- pagination -->
        <div class="flex gap-2">
          <div v-for="(item, index) in limitedTestimonials" :key="index"
            class="w-10 h-[5px] rounded-[8px] cursor-pointer" :class="{
              'bg-colorPrimary': activeIndex === index,
              'bg-gray-300': activeIndex !== index
            }"></div>
        </div>

        <!-- navigation -->
        <div class="flex gap-4">
          <div @click="prevSlide"
            class="w-6 h-6 md:w-8 md:h-8 lg:w-12 lg:h-12 rounded-full bg-transparent border border-colorPrimary cursor-pointer flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 text-colorPrimary"
              fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </div>
          <div @click="nextSlide"
            class="w-6 h-6 md:w-8 md:h-8 lg:w-12 lg:h-12 rounded-full bg-transparent border border-colorPrimary cursor-pointer flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 text-colorPrimary"
              fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile -->
    <TestimonialsSectionMobile class="lg:hidden" :testimoni="testimoni.slice(0, 5)"></TestimonialsSectionMobile>

    <div class="w-full flex justify-center items-center py-[32px] md:py-[32px] lg:py-[60px]">
      <InteractiveHoverButton @click="$router.push('/testimoni')" :text="'Lihat Lainnya'"></InteractiveHoverButton>
    </div>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.swiper {
  width: 100% !important;
  height: 100%;
}

.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  opacity: 0.8 !important;
  transition: all 0.3s ease;
}

.swiper-slide-active {
  opacity: 1 !important;
}
</style>
