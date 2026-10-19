<script setup lang="ts">
import TextSection from '../TextSection.vue';
import TitleSection from '../TitleSection.vue';
import type { Partner } from '@/core/types/partner';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Pagination } from 'swiper/modules';
import '@/lib/swiper-styles'

const modules = ref([Autoplay, Pagination]);

const baseUrl = import.meta.env.VITE_APP_IMG_URL;
const getImageUrl = (imagePath: string | null) => {
  if (!imagePath) return '';
  return `${baseUrl}/${imagePath}`;
};

const props = defineProps<{
  partners: Partner[]
}>();

const titleHTML = 'Mitra <span class="text-colorPrimary">Kerjasama</span>';

const getItemsPerSlide = () => {
  if (typeof window === 'undefined') return 5;
  if (window.innerWidth >= 1024) return 5;
  if (window.innerWidth >= 768) return 3;
  return 2;
};

const itemsPerSlide = ref(getItemsPerSlide());

const updateItemsPerSlide = () => {
  itemsPerSlide.value = getItemsPerSlide();
};

onMounted(() => {
  updateItemsPerSlide();
  window.addEventListener('resize', updateItemsPerSlide);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateItemsPerSlide);
});

const groupedPartners = computed(() => {
  const partnersToShow = props.partners?.slice(0, 15) || [];

  const desiredGroupCount = Math.max(1, Math.ceil(partnersToShow.length / itemsPerSlide.value));

  const partnersPerGroup = Math.ceil(partnersToShow.length / desiredGroupCount);

  const groups = [];
  for (let i = 0; i < partnersToShow.length; i += partnersPerGroup) {
    groups.push(partnersToShow.slice(i, i + partnersPerGroup));
  }

  return groups;
});
</script>

<template>
  <div>
    <div
      class="w-full px-[20px] py-[32px] md:px-[60px] md:py-[60px] lg:px-[120px] lg:py-[60px] space-y-12 md:space-y-16 lg:space-y-0">
      <div class="w-full flex justify-center items-center">
        <TitleSection :text="titleHTML" :html="true" :delay="60" />
      </div>
    </div>
    <div class="lg:mb-10 px-4">
      <swiper v-if="groupedPartners.length > 0" :key="itemsPerSlide" :modules="modules" :slides-per-view="1"
        :space-between="30" :speed="650" :loop="true" :autoplay="{
          delay: 2800,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }" :pagination="{
          clickable: true,
          bulletClass: 'custom-bullet',
          bulletActiveClass: 'custom-bullet-active'
        }">
        <swiper-slide v-for="(group, groupIndex) in groupedPartners" :key="groupIndex">
          <div class="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-12 w-full">
            <div v-for="(partner, index) in group" :key="index"
              class="w-[calc((100%_-_1rem)/2)] md:w-[calc((100%_-_3rem)/3)] lg:w-[calc((100%_-_12rem)/5)] h-40 md:h-44 lg:h-40 flex items-center justify-center lg:mb-10 border-2 border-colorPrimary rounded-[16px] md:rounded-[24px] lg:rounded-[32px] p-4 md:p-6 bg-colorPrimary/10">
              <img :src="getImageUrl(partner?.image || '')" :alt="partner?.name"
                class="w-full h-full object-contain rounded-[8px] md:rounded-[16px] lg:rounded-[24px]" loading="lazy" />
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
    <div class="w-full flex justify-center items-center px-[30px] md:px-[60px] lg:px-[120px] mt-6 lg:mt-0">
      <TextSection class="mb-12 md:mb-16 lg:mb-20 lg:max-w-xl text-center">
        Sinergi bersama para pemimpin industri dalam menghadirkan transformasi nyata dan pertumbuhan yang berkelanjutan.
      </TextSection>
    </div>
  </div>
</template>

<style>
.swiper-wrapper {
  transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1) !important;
  align-items: center;
  will-change: transform;
}

.swiper-pagination {
  position: relative;
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0 1rem;
}

.swiper-slide {
  transition: all 0.65s cubic-bezier(0.25, 0.1, 0.25, 1);
  transform: scale(0.98);
  opacity: 0.7;
  will-change: transform, opacity;
  backface-visibility: hidden;
  transform-style: preserve-3d;
}

.swiper-slide-active {
  transform: scale(1);
  opacity: 1;
  z-index: 1;
}

.swiper-slide img {
  transition: transform 0.65s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.swiper-slide-active img {
  transform: scale(1.03);
}

.custom-bullet {
  width: 20px;
  height: 6px;
  display: inline-block;
  border-radius: 3px;
  background: #DDD;
  opacity: 1;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.custom-bullet-active {
  background: rgb(var(--color-primary-r), var(--color-primary-g), var(--color-primary-b));
  width: 40px;
  height: 6px;
}

@media (min-width: 640px) {
  .custom-bullet {
    width: 25px;
    height: 8px;
  }

  .custom-bullet-active {
    width: 50px;
    height: 8px;
  }
}

@media (min-width: 1024px) {
  .swiper-pagination {
    margin-top: 4rem;
  }

  .custom-bullet {
    width: 35px;
    height: 10px;
  }

  .custom-bullet-active {
    width: 70px;
    height: 10px;
  }
}

.swiper-container-horizontal>.swiper-pagination-bullets {
  transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.swiper-wrapper.no-transition {
  transition: none !important;
}
</style>