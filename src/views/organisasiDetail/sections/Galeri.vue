<script setup lang="ts">
import { Play } from 'lucide-vue-next';

defineProps<{
  galeri: Array<{ src: string; isVideo?: boolean }>;
}>();
</script>

<template>
  <section id="galeri" class="scroll-mt-24 bg-white rounded-xl border border-outline p-5 h-full">
    <div class="flex items-center justify-between mb-4">
      <h2 class="font-sora font-bold text-colorPrimary text-sm">
        E. GALERI
      </h2>
      <router-link to="#" class="inline-flex items-center gap-1 text-colorPrimary font-semibold text-xs hover:opacity-80">
        Lihat Semua
        <i class="pi pi-arrow-right text-[10px]"></i>
      </router-link>
    </div>

    <div class="grid grid-cols-3 gap-3">
      <div
        v-for="(item, index) in galeri"
        :key="index"
        class="relative rounded-lg overflow-hidden aspect-square"
      >
        <img :src="item.src" alt="Galeri kegiatan" class="w-full h-full object-cover" />
        <div v-if="item.isVideo" class="absolute inset-0 bg-black/30 flex items-center justify-center">
          <Play class="w-6 h-6 text-white" fill="white" />
        </div>
      </div>
    </div>
  </section>
</template>