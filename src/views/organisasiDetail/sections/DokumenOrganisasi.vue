<script setup lang="ts">
import { FileText, Download } from 'lucide-vue-next';

defineProps<{
  dokumen: Array<{ id: number; title: string; kategori: string; tahun: string; url: string | null }>;
  isLoading: boolean;
}>();

const formatKategori = (kategori: string) => kategori ? kategori.replace(/_/g, ' ') : '-';
</script>

<template>
  <section id="dokumen" class="scroll-mt-24 mt-10">
    <h2 class="font-sora font-bold text-colorPrimary mb-4">
      E. DOKUMEN ORGANISASI
    </h2>

    <div v-if="isLoading" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-5">
      <div v-for="n in 6" :key="n" class="bg-white rounded-xl border border-outline h-20 animate-pulse"></div>
    </div>

    <div v-else-if="dokumen.length === 0" class="bg-white rounded-xl border border-outline p-10 text-center mb-5">
      <p class="text-desc text-sm">Belum ada dokumen yang tersedia.</p>
    </div>

    <div v-else class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-5">
      <a
        v-for="item in dokumen"
        :key="item.id"
        :href="item.url || '#'"
        target="_blank"
        class="bg-white rounded-xl border border-outline p-4 flex items-center gap-3 hover:shadow-md transition"
      >
        <FileText class="w-6 h-6 text-red-400 shrink-0" stroke-width="1.5" />
        <div>
          <p class="text-text text-xs font-semibold leading-snug">{{ item.title }}</p>
          <p class="text-desc text-[10px] capitalize">{{ formatKategori(item.kategori) }} &nbsp;•&nbsp; {{ item.tahun }}</p>
        </div>
      </a>
    </div>

    <!-- <div class="flex justify-center">
      <button class="inline-flex items-center gap-2 bg-white border border-outline text-text font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-netral transition">
        Unduh Semua Dokumen
        <Download class="w-4 h-4" />
      </button>
    </div> -->
  </section>
</template>