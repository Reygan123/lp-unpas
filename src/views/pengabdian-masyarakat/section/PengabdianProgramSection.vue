<script setup lang="ts">
import { ref } from 'vue';
import TitleSection from '@/components/TitleSection.vue';
import TextSection from '@/components/TextSection.vue';
import InteractiveHoverButton from '@/components/ui/interactive-hover-button/InteractiveHoverButton.vue';
import SectionLayout from '@/layouts/SectionLayout.vue';
import PengabdianDetailModal from './PengabdianDetailModal.vue';
import { pengabdianData } from '../data/pengabdian-data';

const programItems = pengabdianData.slice(0, 6);
const selectedItem = ref<any | null>(null);

const openDetail = (item: any) => {
  selectedItem.value = item;
};

const closeDetail = () => {
  selectedItem.value = null;
};
</script>

<template>
  <SectionLayout>
    <div class="mx-auto text-center lg:w-1/2 w-full">
      <div class="space-y-4 lg:space-y-6">
        <TitleSection text="Program Unggulan Pengabdian Masyarakat"></TitleSection>
        <TextSection>
          Berbagai program pengabdian yang telah dijalankan Fakultas Teknik Universitas Pasundan
          untuk memberi dampak nyata bagi masyarakat.
        </TextSection>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-10">
      <div v-for="item in programItems" :key="item.id" @click="openDetail(item)"
        class="flex flex-col rounded-[20px] overflow-hidden transition-all duration-300 group cursor-pointer hoverAnimation shadow-gray-300/5 hover:shadow-black/5 shadow-xl hover:shadow-xl">
        <div class="w-full h-40 md:h-44 overflow-hidden bg-[#F0F0F0]">
          <img :src="item.gambar" :alt="item.judul"
            class="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" />
        </div>
        <div class="p-5 flex flex-col gap-3">
          <span class="inline-block w-fit text-xs font-semibold text-colorPrimary bg-colorPrimary/10 px-3 py-1 rounded-full">
            {{ item.kategori }}
          </span>
          <h4 class="font-bold text-[16px] md:text-[18px] text-gray-800 leading-tight">
            {{ item.judul }}
          </h4>
          <TextSection class="transition-colors duration-300 group-hover:text-gray-800 line-clamp-3">
            {{ item.deskripsi }}
          </TextSection>
          <div class="w-fit" @click.stop="openDetail(item)">
            <InteractiveHoverButton text="Selengkapnya" :bg-color="'bg-transparent'" :border-color="'border-colorPrimary'" :text-color="'text-colorPrimary'" :bg-hover="'bg-colorPrimary'" :text-hover="'text-white'" />
          </div>
        </div>
      </div>
    </div>

    <PengabdianDetailModal :item="selectedItem" @close="closeDetail" />
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