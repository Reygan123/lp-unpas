<script setup lang="ts">
import { computed, ref } from 'vue';
import { HeartHandshake } from 'lucide-vue-next';
import TitleSection from '@/components/TitleSection.vue';
import TextSection from '@/components/TextSection.vue';
import InteractiveHoverButton from '@/components/ui/interactive-hover-button/InteractiveHoverButton.vue';
import SectionLayout from '@/layouts/SectionLayout.vue';
import PengabdianDetailModal from './PengabdianDetailModal.vue';
import MediaVideoPlayer from '@/components/MediaVideoPlayer.vue';
import { usePengabdianStore } from '@/stores/pengabdian.ts';

const pengabdianStore = usePengabdianStore();

const programItems = computed(() => {
  return (pengabdianStore.pengabdian || []).slice(0, 6).map((item: any) => ({
    id: item.id,
    judul: item.judul,
    slug: item.slug,
    kategori: item.kategori,
    lokasi: item.lokasi,
    tanggal: item.tanggal,
    deskripsi: item.deskripsi,
    gambar: `${import.meta.env.VITE_APP_IMG_URL}/${item.gambar}`,
    video: item.video,
    prodi: (item.departements || []).map((d: any) => d.name),
    dosenPenanggungJawab: item.dosen_penanggung_jawab || [],
    sumber: item.sumber,
  }));
});

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
        <div class="relative w-full h-40 md:h-44 lg:h-64 overflow-hidden bg-[#F0F0F0]">
          <MediaVideoPlayer
            :video="item.video"
            :poster="item.gambar"
            :autoplay="true"
            :muted="true"
            :loop="true"
            :controls="false"
            class-name="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
          <div v-if="item.video" class="absolute top-3 right-3 bg-black/60 text-white rounded-full p-1.5 shadow backdrop-blur-sm pointer-events-none">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          </div>
        </div>
        <div class="p-5 flex flex-col gap-3">
          <span class="inline-block w-fit text-xs font-semibold text-colorPrimary bg-colorPrimary/10 px-3 py-1 rounded-full">
            {{ item.kategori }}
          </span>
          <h4 class="font-bold text-[16px] md:text-[18px] text-gray-800 leading-tight line-clamp-2">
            {{ item.judul }}
          </h4>
          <TextSection class="transition-colors duration-300 group-hover:text-gray-800 line-clamp-2">
            {{ item.deskripsi }}
          </TextSection>
          <div class="w-fit" @click.stop="openDetail(item)">
            <InteractiveHoverButton text="Selengkapnya" :bg-color="'bg-transparent'" :border-color="'border-colorPrimary'" :text-color="'text-colorPrimary'" :bg-hover="'bg-colorPrimary'" :text-hover="'text-white'" />
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="!programItems || programItems.length === 0"
      class="flex flex-col items-center justify-center text-center"
    >
      <div class="w-14 h-14 rounded-full bg-colorPrimary/10 flex items-center justify-center mb-4">
        <HeartHandshake class="w-7 h-7 text-colorPrimary" stroke-width="1.5" />
      </div>
      <h3 class="font-bold text-gray-800 text-sm mb-1">Belum Ada Program Pengabdian</h3>
      <p class="text-gray-500 text-xs">Program pengabdian masyarakat akan muncul di sini</p>
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