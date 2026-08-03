<script setup lang="ts">
import HeroBg from '@/assets/gedung.webp'
</script>

<template>
  <section class="relative w-full min-h-[50vh] md:min-h-[60vh] flex items-center overflow-hidden">
    <img
      :src="HeroBg"
      alt="Pengabdian Masyarakat Fakultas Teknik UNPAS"
      class="absolute inset-0 w-full h-full object-cover"
    />
    <div class="absolute inset-0 bg-black/50"></div>

    <div class="relative z-10 max-w-4xl mx-auto px-4 md:px-8 text-center text-white">
      <p class="text-sm md:text-base font-semibold tracking-widest uppercase text-white/80 mb-3">
        Tri Dharma Perguruan Tinggi
      </p>
      <h1 class="text-3xl md:text-5xl font-bold leading-tight mb-4">
        Pengabdian kepada Masyarakat
      </h1>
      <p class="text-base md:text-lg text-white/90 max-w-2xl mx-auto">
        Wujud nyata kontribusi Fakultas Teknik Universitas Pasundan dalam menerapkan
        ilmu pengetahuan dan teknologi untuk kesejahteraan masyarakat.
      </p>
    </div>
  </section>
</template>