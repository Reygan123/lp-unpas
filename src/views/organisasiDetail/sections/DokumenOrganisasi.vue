<script setup lang="ts">
import { FileText, Download } from 'lucide-vue-next';

const dokumen = [
  { title: 'Periode Kepengurusan 2025-2026', tipe: 'PDF' },
  { title: 'AD/ART Organisasi', tipe: 'PDF' },
  { title: 'Program Kerja 2025', tipe: 'PDF' },
  { title: 'Laporan Kegiatan 2024', tipe: 'PDF' },
  { title: 'Pedoman Organisasi', tipe: 'DOCX' },
  { title: 'Kontak Organisasi', tipe: 'PDF' },
];
</script>

<template>
  <section id="dokumen" class="scroll-mt-24 mt-10">
    <h2 class="font-sora font-bold text-colorPrimary mb-4">
      F. DOKUMEN ORGANISASI
    </h2>

    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-5">
      <div
        v-for="item in dokumen"
        :key="item.title"
        class="bg-white rounded-xl border border-outline p-4 flex items-center gap-3"
      >
        <FileText class="w-6 h-6 text-red-400 shrink-0" stroke-width="1.5" />
        <div>
          <p class="text-text text-xs font-semibold leading-snug">{{ item.title }}</p>
          <p class="text-desc text-[10px]">{{ item.tipe }}</p>
        </div>
      </div>
    </div>

    <div class="flex justify-center">
      <button class="inline-flex items-center gap-2 bg-white border border-outline text-text font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-netral transition">
        Unduh Semua Dokumen
        <Download class="w-4 h-4" />
      </button>
    </div>
  </section>
</template>