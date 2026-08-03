<script lang="ts" setup>
import Button from '@/components/Button.vue';
import TextSection from '@/components/TextSection.vue';
import TitleSection from '@/components/TitleSection.vue';
import type { Fasilitas } from '@/core/types/fasilitas';
import { ref, computed, onMounted } from 'vue';

// Replace with your project's actual Department type/import if one exists
interface Department {
  id: number;
  name: string;
  slug: string;
}

const baseUrl = import.meta.env.VITE_APP_IMG_URL;

const props = defineProps<{
  fasilitas: Fasilitas[];
  departements: Department[];
  isLoading?: boolean;
}>();

const selectedFacility = ref<Fasilitas | null>(null);
const showAll = ref(true);
const imagesLoaded = ref(false);
const activeProdi = ref("semua"); // department id as string, or 'semua'

const getImageUrl = (imagePath: string | null) => {
  if (!imagePath) return '';
  return `${baseUrl}/${imagePath}`;
};

// Fasilitas filtered by the selected prodi
const filteredFasilitas = computed(() => {
  if (activeProdi.value === "semua") return props.fasilitas;
  return props.fasilitas.filter(f => String((f as any).id_departement) === activeProdi.value);
});

const resetAnimation = () => {
  imagesLoaded.value = false;
  setTimeout(() => {
    imagesLoaded.value = true;
  }, 100);
};

const filterFacility = (facility: Fasilitas | null) => {
  selectedFacility.value = facility;
  showAll.value = facility === null;
  resetAnimation();
};

const setProdiFilter = (deptId: string) => {
  if (activeProdi.value === deptId) return;

  activeProdi.value = deptId;
  // Reset facility selection since the available list changes
  selectedFacility.value = null;
  showAll.value = true;
  resetAnimation();
};

onMounted(() => {
  // Start animation after component is mounted
  setTimeout(() => {
    imagesLoaded.value = true;
  }, 100);
});
</script>

<template>
  <div
    class="w-full px-[20px] py-[32px] md:px-[60px] md:py-[60px] lg:px-[160px] lg:py-[136px] space-y-10 md:space-y-14 lg:space-y-16">
    <div class="grid gap-2 lg:gap-4 text-center w-full lg:w-1/2 mx-auto">
      <TitleSection text="Fasilitas"></TitleSection>
      <TextSection>Scenes that unfold like a movie, with each image telling a cinematic story.</TextSection>

      <!-- Filter per Prodi -->
      <div id="prodi-scroll" class="relative overflow-x-scroll scroll-hidden mx-[10px] lg:-mx-[60px]">
        <div class="flex pb-3 gap-3 whitespace-nowrap">
          <Button className="btn-primary" padding="px-4 py-2" @click="setProdiFilter('semua')">
            Semua Prodi
          </Button>
          <Button v-for="dept in departements" :key="dept.id"
            :className="activeProdi === String(dept.id) ? 'btn-primary' : 'btn-neutral'" padding="px-4 py-2"
            @click="setProdiFilter(String(dept.id))">
            {{ dept.name }}
          </Button>
        </div>
      </div>

      <!-- List Nama Fasilitas -->
      <div id="fasilitas-scroll" class="relative overflow-x-scroll scroll-hidden mx-[10px] lg:-mx-[60px]">
        <div class="flex pb-3 gap-3 whitespace-nowrap">
          <Button className="btn-primary" padding="px-4 py-2" @click="filterFacility(null)">
            Semua Fasilitas
          </Button>
          <Button v-for="item in filteredFasilitas" :key="item.id"
            :className="selectedFacility?.id === item.id ? 'btn-primary' : 'btn-neutral'" padding="px-4 py-2"
            @click="filterFacility(item)">
            {{ item.title }}
          </Button>
        </div>
      </div>
    </div>
    <div class="mt-10">
      <div v-if="showAll" class="lg:gap-10 md:gap-5 hidden md:grid">
        <!-- First Row - Two equal width columns -->
        <div class="flex w-full lg:gap-10 md:gap-5">
          <!-- Left Image -->
          <div class="w-1/2 h-40 md:h-52 lg:h-60 rounded-[20px] relative overflow-hidden group">
            <img v-if="filteredFasilitas[0]?.image1" :src="getImageUrl(filteredFasilitas[0].image1)"
              class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-0"
              :class="{ 'animate-fade-in': imagesLoaded }" :alt="filteredFasilitas[0]?.title || ''" />
          </div>

          <!-- Right Image -->
          <div class="w-1/2 h-40 md:h-52 lg:h-60 rounded-[20px] relative overflow-hidden group">
            <img v-if="filteredFasilitas[1]?.image1" :src="getImageUrl(filteredFasilitas[1].image1)"
              class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-0"
              :class="{ 'animate-fade-in-delay-1': imagesLoaded }" :alt="filteredFasilitas[1]?.title || ''" />
          </div>
        </div>

        <!-- Second Row - Grid layout -->
        <div class="grid grid-cols-3 lg:gap-10 md:gap-5">
          <!-- Text Content Cell -->
          <div class="w-full h-40 md:h-52 lg:h-60 flex flex-col justify-center gap-3">
            <h2 class="text-2xl font-bold">Fasilitas</h2>
            <TextSection>Fasilis-fasilitas yang tersedia.</TextSection>
          </div>

          <!-- Small Image Cell -->
          <div class="w-full h-40 md:h-52 lg:h-60 rounded-[20px] relative overflow-hidden group">
            <img v-if="filteredFasilitas[2]?.image1" :src="getImageUrl(filteredFasilitas[2].image1)"
              class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-0"
              :class="{ 'animate-fade-in-delay-2': imagesLoaded }" :alt="filteredFasilitas[2]?.title || ''" />
          </div>

          <!-- Tall Image Cell (spanning 2 rows) -->
          <div class="row-span-2 w-full h-full rounded-[20px] relative overflow-hidden group">
            <img v-if="filteredFasilitas[3]?.image1" :src="getImageUrl(filteredFasilitas[3].image1)"
              class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-0"
              :class="{ 'animate-fade-in-delay-3': imagesLoaded }" :alt="filteredFasilitas[3]?.title || ''" />
          </div>

          <!-- Bottom Row Images -->
          <div class="w-full h-40 md:h-52 lg:h-60 rounded-[20px] relative overflow-hidden group">
            <img v-if="filteredFasilitas[4]?.image1" :src="getImageUrl(filteredFasilitas[4].image1)"
              class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-0"
              :class="{ 'animate-fade-in-delay-4': imagesLoaded }" :alt="filteredFasilitas[4]?.title || ''" />
          </div>

          <div class="w-full h-40 md:h-52 lg:h-60 rounded-[20px] relative overflow-hidden group">
            <img v-if="filteredFasilitas[5]?.image1" :src="getImageUrl(filteredFasilitas[5].image1)"
              class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-0"
              :class="{ 'animate-fade-in-delay-5': imagesLoaded }" :alt="filteredFasilitas[5]?.title || ''" />
          </div>
        </div>
      </div>

      <!-- Single Facility View -->
      <div v-if="!showAll && selectedFacility" class="hidden md:grid lg:gap-10 md:gap-5">
        <div class="flex w-full lg:gap-10 md:gap-5">
          <!-- Left Image -->
          <div class="w-1/2 h-40 md:h-52 lg:h-60 rounded-[20px] relative overflow-hidden group">
            <img v-if="selectedFacility?.image1" :src="getImageUrl(selectedFacility.image1)"
              class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-0"
              :class="{ 'animate-fade-in': imagesLoaded }" :alt="selectedFacility.title || ''" />
          </div>

          <!-- Right Image -->
          <div class="w-1/2 h-40 md:h-52 lg:h-60 rounded-[20px] relative overflow-hidden group">
            <img v-if="selectedFacility?.image2" :src="getImageUrl(selectedFacility.image2)"
              class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-0"
              :class="{ 'animate-fade-in-delay-1': imagesLoaded }" :alt="selectedFacility.title || ''" />
          </div>
        </div>

        <!-- Second Row - Grid layout -->
        <div class="grid grid-cols-3 lg:gap-10 md:gap-5">
          <!-- Text Content Cell -->
          <div class="w-full h-40 md:h-52 lg:h-60 flex flex-col justify-center gap-3">
            <h2 class="text-2xl font-bold">{{ selectedFacility.title }}</h2>
            <TextSection><span v-html="selectedFacility.description" class="line-clamp-4 font-light"></span>
            </TextSection>
          </div>

          <!-- Small Image Cell -->
          <div class="w-full h-40 md:h-52 lg:h-60 rounded-[20px] relative overflow-hidden group">
            <img v-if="selectedFacility?.image3" :src="getImageUrl(selectedFacility.image3)"
              class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-0"
              :class="{ 'animate-fade-in-delay-2': imagesLoaded }" :alt="selectedFacility.title || ''" />
          </div>

          <!-- Tall Image Cell (spanning 2 rows) -->
          <div class="row-span-2 w-full h-full rounded-[20px] relative overflow-hidden group">
            <img v-if="selectedFacility?.image4" :src="getImageUrl(selectedFacility.image4)"
              class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-0"
              :class="{ 'animate-fade-in-delay-3': imagesLoaded }" :alt="selectedFacility.title || ''" />
          </div>

          <!-- Bottom Row Images -->
          <div class="w-full h-40 md:h-52 lg:h-60 rounded-[20px] relative overflow-hidden group">
            <img v-if="selectedFacility?.image5" :src="getImageUrl(selectedFacility.image5)"
              class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-0"
              :class="{ 'animate-fade-in-delay-4': imagesLoaded }" :alt="selectedFacility.title || ''" />
          </div>

          <div class="w-full h-40 md:h-52 lg:h-60 rounded-[20px] relative overflow-hidden group">
            <img v-if="selectedFacility?.image6" :src="getImageUrl(selectedFacility.image6)"
              class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-0"
              :class="{ 'animate-fade-in-delay-5': imagesLoaded }" :alt="selectedFacility.title || ''" />
          </div>
        </div>
      </div>

      <!-- Mobile View -->
      <div class="w-full mt-10 grid grid-cols-1 gap-5 md:hidden">
        <template v-if="showAll">
          <div v-for="(item, index) in filteredFasilitas" :key="index"
            class="w-full h-64 rounded-[20px] overflow-hidden relative group">
            <!-- Image with gradient overlay -->
            <img v-if="item.image1" :src="getImageUrl(item.image1)"
              class="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-105"
              :alt="item.title || ''" />
            <div class="absolute inset-0 bg-gradient-to-t from-colorPrimary/90 via-transparent to-transparent z-10">
            </div>
          </div>
        </template>

        <template v-else>
          <!-- Single Facility View on Mobile -->
          <div class="space-y-5">
            <div class="p-5 bg-white rounded-[20px]">
              <h2 class="text-2xl font-bold">{{ selectedFacility?.title }}</h2>
              <TextSection class="mt-3"><span v-html="selectedFacility?.description"></span></TextSection>
            </div>

            <div v-for="(img, idx) in [
              selectedFacility?.image1,
              selectedFacility?.image2,
              selectedFacility?.image3,
              selectedFacility?.image4
            ].filter(Boolean)" :key="idx" class="w-full h-64 rounded-[20px] overflow-hidden relative">
              <img :src="getImageUrl(img || '')" class="absolute inset-0 w-full h-full object-cover"
                :alt="`${selectedFacility?.title} image ${idx + 1}`" />
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>

#fasilitas-scroll,
#prodi-scroll {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

#fasilitas-scroll::-webkit-scrollbar,
#prodi-scroll::-webkit-scrollbar {
  display: none;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.6s ease forwards;
}

.animate-fade-in-delay-1 {
  animation: fadeIn 0.6s ease forwards;
  animation-delay: 200ms;
}

.animate-fade-in-delay-2 {
  animation: fadeIn 0.6s ease forwards;
  animation-delay: 400ms;
}

.animate-fade-in-delay-3 {
  animation: fadeIn 0.6s ease forwards;
  animation-delay: 600ms;
}

.animate-fade-in-delay-4 {
  animation: fadeIn 0.6s ease forwards;
  animation-delay: 800ms;
}

.animate-fade-in-delay-5 {
  animation: fadeIn 0.6s ease forwards;
  animation-delay: 1000ms;
}

.animate-fade-in-mobile {
  animation: fadeIn 0.6s ease forwards;
}
</style>