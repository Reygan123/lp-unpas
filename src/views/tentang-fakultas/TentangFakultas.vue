```vue
<script setup lang="ts">
import Timeline from '@/components/insipra-ui/Timeline.vue'
import { berandaStore, tentangStore } from '@/stores'
import { computed, onMounted, ref, watch, nextTick, onUnmounted } from 'vue'
import TitleSection from '@/components/TitleSection.vue'
import TestimonialsSection from '@/components/sections/TestimonialsSection.vue'
import { usePartnerStore } from '@/stores/partner'
import DosenCard from '../prodi/components/DosenCard.vue'
import { useTeamStore } from '@/stores/team'
import MainLayout from '@/layouts/MainLayout.vue'
import TentangHero from './sections/TentangHero.vue'
import TentangSejarah from './sections/TentangSejarah.vue'
import { useFakultasStore } from '@/stores/fakultas'
import TentangVisiMisi from './sections/TentangVisiMisi.vue'
import TentangStatistik from './sections/TentangStatistik.vue'
import MitraSection from '@/components/sections/MitraSection.vue'
import SectionLayout from '@/layouts/SectionLayout.vue'
import CTASection from '@/components/sections/CTASection.vue'
import SejarahImg from '@/assets/sejarah.png'
import { useDepartementStore } from '@/stores/departement.ts'

const partnerStore = usePartnerStore();
const teamStore = useTeamStore();
const fakultasStore = useFakultasStore();

const baseUrl = import.meta.env.VITE_APP_IMG_URL;

const getImageUrl = (imagePath: string | null) => {
  if (!imagePath) return 'https://placehold.co/600x400';
  return `${baseUrl}/${imagePath}`;
};

const historyTimeline = computed(() => {
  return tentangStore.timelineData.map((item) => ({
    id: String(item.id),
    label: item.title,
    description: item.description,
    date: item.date,
  }));
});

const itemsPerPage = 4
const currentPage = ref(1)

const animationKey = ref(0)
const sectionRef = ref<HTMLElement | null>(null)
const isSectionVisible = ref(false)

let observer: IntersectionObserver | null = null

const PRIORITY_IDS = [1, 5, 103, 104]

const sortedTeams = computed(() => {
  return [...(teamStore.teams ?? [])].sort((a, b) => {
    const ai = PRIORITY_IDS.indexOf(a.id)
    const bi = PRIORITY_IDS.indexOf(b.id)
    if (ai !== -1 && bi !== -1) return ai - bi
    if (ai !== -1) return -1
    if (bi !== -1) return 1
    return 0
  })
})

const totalPages = computed(() => Math.ceil(sortedTeams.value.length / itemsPerPage))

const paginatedTeams = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return sortedTeams.value.slice(start, start + itemsPerPage)
})

const visiblePages = computed(() => {
  const pages: (number | string)[] = []
  const total = totalPages.value
  const current = currentPage.value

  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i)
    return pages
  }

  pages.push(1)

  if (current > 4) pages.push('...')

  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)

  for (let i = start; i <= end; i++) pages.push(i)

  if (current < total - 3) pages.push('...')

  pages.push(total)

  return pages
})

function goToPage(page: number) {
  currentPage.value = page
  if (isSectionVisible.value) {
    triggerAnimation()
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--
    if (isSectionVisible.value) {
      triggerAnimation()
    }
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    if (isSectionVisible.value) {
      triggerAnimation()
    }
  }
}

function triggerAnimation() {
  animationKey.value++
}

function initializeObserver() {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          isSectionVisible.value = true
          triggerAnimation()
          observer?.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1 }
  )

  if (sectionRef.value) {
    observer.observe(sectionRef.value)
  }
}

watch(() => paginatedTeams.value, () => {
  if (isSectionVisible.value) {
    nextTick(() => {
      triggerAnimation()
    })
  }
}, { immediate: true })

onMounted(async () => {
  await tentangStore.getInitialData()
  await berandaStore.getDataTestimoni()
  await partnerStore.fetchPartnersHome()
  await teamStore.fetchTeamHome()
  await fakultasStore.fetchFakultas()

  nextTick(() => {
    initializeObserver()
  })
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>
<template>
  <MainLayout>
    <TentangHero :fakultas="fakultasStore.fakultas" />
    <SectionLayout>
      <div class="flex flex-col lg:flex-row md:justify-between relative">
        <div class="lg:w-[45%] w-full h-full lg:sticky lg:top-40">
          <img :src="getImageUrl(fakultasStore.fakultas?.image3 || SejarahImg)" alt=""
            class="w-full h-full lg:sticky lg:top-28 z-10 rounded-[16px] md:rounded-[24px] lg:rounded-[32px]">
        </div>
        <div class="lg:w-1/2 w-full mt-10 md:mt-20 lg:mt-0">
          <Timeline v-if="tentangStore.timelineData.length > 0" :items="historyTimeline" />
        </div>
      </div>
    </SectionLayout>

    <TentangSejarah :fakultas="fakultasStore.fakultas" />
    <TentangVisiMisi :fakultas="fakultasStore.fakultas" />
    <TentangStatistik :fakultas="fakultasStore.fakultas" />
    <MitraSection :partners="partnerStore.partners" />
    <SectionLayout v-if="sortedTeams.length > 0">
      <div class="grid gap-2 lg:gap-5">
        <h6 class="font-bold text-2xl">Tim</h6>
        <TitleSection v-if="fakultasStore?.fakultas?.name"
          :text="`<span class='text-colorPrimary'>${fakultasStore?.fakultas?.name}</span> Unpas`" :html="true">
        </TitleSection>
      </div>

      <div ref="sectionRef" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6 mt-12 md:mt-16 lg:mt-20" :key="animationKey">
        <template v-for="(dosen, index) in paginatedTeams" :key="dosen.id">
          <div class="dosen-card-animate" :class="{ 'animate-on-visible': isSectionVisible }"
            :style="{ 'animation-delay': `${index * 100}ms` }">
            <DosenCard
              :name="dosen.name"
              :title="dosen.title"
              :image="getImageUrl(dosen.image)"
              :facebook="dosen.fb"
              :instagram="dosen.ig"
              :youtube="dosen.yt"
              :tiktok="dosen.tiktok"
            />
          </div>
        </template>
      </div>

      <div v-if="sortedTeams.length > 0" class="w-full flex justify-end mt-8">
        <div class="inline-flex items-center gap-2">
          <button :disabled="currentPage === 1" @click="prevPage"
            class="w-8 h-8 flex items-center justify-center rounded bg-white outline outline-1 outline-zinc-200 disabled:cursor-not-allowed disabled:opacity-50">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </button>

          <template v-for="(page, i) in visiblePages" :key="i">
            <span v-if="page === '...'"
              class="w-8 h-8 flex items-center justify-center text-gray-400 text-sm">
              ...
            </span>
            <button v-else @click="goToPage(page as number)"
              class="w-8 h-8 relative rounded outline outline-1 outline-offset-[-1px]"
              :class="currentPage === page ? 'bg-white outline-Color-FH' : 'bg-white outline-zinc-200'">
              <div class="w-6 h-5 absolute left-[4px] top-[5px] text-center text-sm font-bold"
                :class="currentPage === page ? 'text-Color-FH' : 'text-gray-800'">
                {{ page }}
              </div>
            </button>
          </template>

          <button :disabled="currentPage === totalPages" @click="nextPage"
            class="w-8 h-8 flex items-center justify-center rounded bg-white outline outline-1 outline-zinc-200 disabled:cursor-not-allowed disabled:opacity-50">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </SectionLayout>
    <TestimonialsSection :testimoni="berandaStore.testimoniData" :is-loading="false" />
    <CTASection />
  </MainLayout>
</template>

<style scoped>
.outline-Color-FH {
  --tw-outline-color: #E27C00;
  outline-color: var(--tw-outline-color);
}

.text-Color-FH {
  color: #E27C00;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dosen-card-animate {
  opacity: 0;
}

.dosen-card-animate.animate-on-visible {
  animation: fadeInUp 0.6s ease-out forwards;
}
</style>
```