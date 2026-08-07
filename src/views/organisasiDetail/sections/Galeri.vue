<script setup lang="ts">
import { Play } from 'lucide-vue-next';

defineProps<{
  galeri: Array<{ src: string; isVideo?: boolean; caption?: string }>;
  isLoading: boolean;
}>();
</script>

<template>
  <section id="galeri" class="scroll-mt-24 h-full">
    <div class="flex items-center justify-between mb-4">
      <h2 class="font-sora font-bold text-colorPrimary text-sm">
        D. GALERI
      </h2>
    </div>

    <div v-if="isLoading" class="grid grid-cols-3 gap-3">
      <div v-for="n in 6" :key="n" class="rounded-lg aspect-square bg-netral animate-pulse"></div>
    </div>

    <div v-else-if="galeri.length === 0" class="py-10 text-center">
      <p class="text-desc text-sm">Belum ada galeri yang tersedia.</p>
    </div>

    <div v-else class="grid grid-cols-3 gap-3 bg-white rounded-xl border border-outline p-5">
      <div
        v-for="(item, index) in galeri"
        :key="index"
        class="relative rounded-lg overflow-hidden aspect-square group"
      >
        <img :src="item.src" :alt="item.caption || 'Galeri kegiatan'" class="w-full h-full object-cover" />
        <div v-if="item.isVideo" class="absolute inset-0 bg-black/30 flex items-center justify-center">
          <Play class="w-6 h-6 text-white" fill="white" />
        </div>
        <div
          v-if="item.caption"
          class="absolute inset-x-0 bottom-0 bg-black/50 text-white text-[10px] px-2 py-1 truncate opacity-0 group-hover:opacity-100 transition"
        >
          {{ item.caption }}
        </div>
      </div>
    </div>
  </section>
</template>