<script setup lang="ts">
import { computed, ref } from 'vue';
import { Search, Pin } from 'lucide-vue-next';

const props = defineProps<{
  pengumuman: any[];
  isLoading: boolean;
}>();

const searchQuery = ref('');
const selectedKategori = ref('Semua Kategori');
const selectedTahun = ref('Semua Tahun');

const kategoriOptions = computed(() => {
  const unique = Array.from(new Set((props.pengumuman || []).map((item) => item.kategori).filter(Boolean)));
  return ['Semua Kategori', ...unique];
});

const tahunOptions = computed(() => {
  const unique = Array.from(
    new Set((props.pengumuman || []).map((item) => new Date(item.tanggal_publikasi).getFullYear()))
  ).sort((a, b) => b - a);
  return ['Semua Tahun', ...unique.map((y) => String(y))];
});

const filteredPengumuman = computed(() => {
  return (props.pengumuman || []).filter((item) => {
    const matchSearch = item.judul?.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchKategori = selectedKategori.value === 'Semua Kategori' || item.kategori === selectedKategori.value;
    const matchTahun =
      selectedTahun.value === 'Semua Tahun' ||
      new Date(item.tanggal_publikasi).getFullYear().toString() === selectedTahun.value;
    return matchSearch && matchKategori && matchTahun;
  });
});
</script>

<template>
  <div class="bg-white border border-outline rounded-xl p-5 flex flex-col w-full h-fit">
    <div class="flex flex-col gap-3 mb-5">
      <div class="flex-1 flex items-center gap-2 border border-outline rounded-lg px-3 py-2">
        <Search class="w-4 h-4 text-desc shrink-0" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Cari pengumuman..."
          class="flex-1 outline-none text-sm text-text placeholder:text-desc bg-transparent"
        />
      </div>
      <select v-model="selectedKategori" class="border border-outline rounded-lg px-3 py-2 text-sm text-text bg-white">
        <option v-for="item in kategoriOptions" :key="item" :value="item">{{ item }}</option>
      </select>
      <select v-model="selectedTahun" class="border border-outline rounded-lg px-3 py-2 text-sm text-text bg-white">
        <option v-for="item in tahunOptions" :key="item" :value="item">{{ item }}</option>
      </select>
    </div>

    <h2 class="font-sora font-bold text-text mb-4">Pengumuman Terbaru</h2>

    <div v-if="isLoading" class="flex-1 flex items-center justify-center py-10">
      <p class="text-desc text-sm">Memuat pengumuman...</p>
    </div>

    <div v-else-if="filteredPengumuman.length === 0" class="flex-1 flex items-center justify-center py-10">
      <p class="text-desc text-sm">Tidak ada pengumuman yang sesuai.</p>
    </div>

    <div v-else class="flex-1 divide-y divide-outline">
      <div
        v-for="item in filteredPengumuman"
        :key="item.id"
        class="flex gap-3 py-4 first:pt-0"
      >
        <div class="w-9 h-9 rounded-lg bg-colorPrimary/10 flex items-center justify-center shrink-0">
          <component :is="Pin" class="w-4 h-4 text-colorPrimary" />
        </div>
        <div class="flex-1">
          <span
            class="inline-block text-white text-[10px] font-semibold px-2 py-0.5 rounded mb-1.5"
            :class="item.is_pinned ? 'bg-red-500' : 'bg-blue-500'"
          >
            {{ item.is_pinned ? 'PENTING' : item.kategori.toUpperCase() }}
          </span>
          <p class="text-text text-sm font-semibold leading-snug mb-1">
            {{ item.judul }}
          </p>
          <p class="text-desc text-xs leading-relaxed mb-1.5">
            {{ item.ringkasan }}
          </p>
          <p class="text-desc text-xs">
            {{ item.penulis }} &nbsp;|&nbsp; {{ new Date(item.tanggal_publikasi).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) }}
          </p>
        </div>
        <div class="flex flex-col items-center leading-none shrink-0 w-10 text-right">
          <span class="text-colorPrimary font-sora font-bold text-lg">{{ new Date(item.tanggal_publikasi).getDate() }}</span>
          <span class="text-colorPrimary text-xs font-semibold">{{ new Date(item.tanggal_publikasi).toLocaleString('id-ID', { month: 'short' }).toUpperCase() }}</span>
          <span class="text-desc text-[10px]">{{ new Date(item.tanggal_publikasi).getFullYear() }}</span>
        </div>
      </div>
    </div>

    <!-- <router-link
      to="/akademik/pengumuman"
      class="inline-flex items-center gap-1 text-colorPrimary font-semibold text-sm hover:opacity-80 mt-4 pt-4 border-t border-outline"
    >
      Lihat Semua Pengumuman
      <i class="pi pi-arrow-right text-xs"></i>
    </router-link> -->
  </div>
</template>