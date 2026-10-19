<script setup lang="ts">
import { ref, computed } from 'vue';
import { pengabdianData, pengabdianKategori } from '../data/pengabdian-data';
import PengabdianDetailModal from './PengabdianDetailModal.vue';
// import type { Pengabdian } from '@/core/types/pengabdian';

const activeKategori = ref('Semua');
const selectedItem = ref<any | null>(null);

const filteredList = computed(() => {
  if (activeKategori.value === 'Semua') return pengabdianData;
  return pengabdianData.filter((item) => item.kategori === activeKategori.value);
});

const setKategori = (kategori: string) => {
  activeKategori.value = kategori;
};

const openDetail = (item: any) => {
  selectedItem.value = item;
};

const closeDetail = () => {
  selectedItem.value = null;
};
</script>

<template>
  <section class="w-full py-12 md:py-16 px-4 md:px-8 lg:px-16">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-2xl md:text-3xl font-bold text-center text-[#444444] mb-2">
        Program Pengabdian Masyarakat
      </h2>
      <p class="text-center text-gray-500 mb-8 max-w-2xl mx-auto">
        Beberapa kegiatan pengabdian yang telah dilaksanakan oleh dosen dan mahasiswa
        Fakultas Teknik UNPAS bersama masyarakat.
      </p>

      <div class="flex flex-wrap justify-center gap-2 mb-10">
        <button
          v-for="kategori in pengabdianKategori"
          :key="kategori"
          @click="setKategori(kategori)"
          class="px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300"
          :class="activeKategori === kategori
            ? 'bg-colorPrimary text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
        >
          {{ kategori }}
        </button>
      </div>

      <div v-if="filteredList.length === 0" class="text-center text-gray-400 py-12">
        Belum ada program pengabdian pada kategori ini.
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="item in filteredList"
          :key="item.id"
          @click="openDetail(item)"
          class="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100 cursor-pointer"
        >
          <img :src="item.gambar" :alt="item.judul" class="w-full h-48 object-cover" />
          <div class="p-5">
            <span class="inline-block text-xs font-semibold text-colorPrimary bg-colorPrimary/10 px-3 py-1 rounded-full mb-3">
              {{ item.kategori }}
            </span>
            <h3 class="text-lg font-bold text-[#444444] mb-2 leading-snug line-clamp-2 ">
              {{ item.judul }}
            </h3>
            <p class="text-sm text-gray-500 mb-3 line-clamp-3">
              {{ item.deskripsi }}
            </p>
            <div class="text-xs text-gray-400 space-y-1 border-t border-gray-100 pt-3">
              <div><span class="font-medium text-gray-500">Lokasi:</span> {{ item.lokasi }}</div>
              <div><span class="font-medium text-gray-500">Prodi:</span> {{ item.prodi.join(', ') }}</div>
              <div><span class="font-medium text-gray-500">Tanggal:</span> {{ item.tanggal }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <PengabdianDetailModal :item="selectedItem" @close="closeDetail" />
  </section>
</template>

<style scoped>

</style>