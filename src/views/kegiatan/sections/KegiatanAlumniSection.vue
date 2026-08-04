<script setup lang="ts">
import TitleSection from '@/components/TitleSection.vue';
import TextSection from '@/components/TextSection.vue';
import SectionLayout from '@/layouts/SectionLayout.vue';
// import type { Testimoni } from '@/core/types/testimoni';

defineProps<{
  testimoni: any[]
}>();
</script>

<template>
  <SectionLayout>
    <div class="mx-auto text-center lg:w-1/2 w-full">
      <div class="space-y-4 lg:space-y-6">
        <TitleSection text="Kisah Alumni Fakultas Teknik UNPAS"></TitleSection>
        <TextSection>
          Berbagai cerita perjalanan karier alumni yang telah berkontribusi di berbagai bidang industri.
        </TextSection>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-10">
      <div v-for="item in testimoni.slice(0, 3)" :key="item.id"
        class="p-5 flex flex-col gap-4 rounded-[20px] transition-all duration-300 group cursor-pointer hoverAnimation shadow-gray-300/5 hover:shadow-black/5 shadow-xl hover:shadow-xl">
        <div class="flex items-center gap-3">
          <img :src="item.image" :alt="item.name" class="w-12 h-12 rounded-full object-cover" />
          <div>
            <p class="font-bold text-[15px] text-gray-800">{{ item.name }}</p>
          </div>
        </div>
        <TextSection class="line-clamp-3">{{ item.message }}</TextSection>
      </div>
    </div>
  </SectionLayout>
</template>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>