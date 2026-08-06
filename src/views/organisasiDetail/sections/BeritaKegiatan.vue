<script setup lang="ts">
defineProps<{
  berita: Array<{ foto: string; title: string; tanggal: string; desc: string }>;
}>();
</script>

<template>
  <section id="berita" class="scroll-mt-24 bg-white rounded-xl border border-outline p-5 h-full">
    <div class="flex items-center justify-between mb-4">
      <h2 class="font-sora font-bold text-colorPrimary text-sm">
        D. BERITA & KEGIATAN
      </h2>
      <router-link to="#" class="inline-flex items-center gap-1 text-colorPrimary font-semibold text-xs hover:opacity-80">
        Lihat Semua
        <i class="pi pi-arrow-right text-[10px]"></i>
      </router-link>
    </div>

    <div class="flex flex-col divide-y divide-outline">
      <div v-for="item in berita" :key="item.title" class="flex gap-3 py-3 first:pt-0">
        <img :src="item.foto" :alt="item.title" class="w-16 h-16 rounded-lg object-cover shrink-0" />
        <div>
          <p class="text-colorPrimary text-sm font-semibold leading-snug mb-1">{{ item.title }}</p>
          <p class="text-desc text-xs mb-1">{{ item.tanggal }}</p>
          <p class="text-desc text-xs leading-relaxed">{{ item.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>