<script setup lang="ts">
import SectionLayout from '@/layouts/SectionLayout.vue';

</script>

<template>
    <section-layout>
    <div class="pt-6">
      <nav class="text-sm text-desc mb-6">
        <router-link to="/" class="hover:text-colorPrimary">Beranda</router-link>
        <span class="mx-2">/</span>
        <router-link to="/kemahasiswaan-dan-alumni" class="hover:text-colorPrimary">Kemahasiswaan & Alumni</router-link>
        <span class="mx-2">/</span>
        <span class="text-text font-medium">Kehidupan Kampus</span>
      </nav>

      <h1 class="font-sora text-3xl lg:text-5xl font-bold text-text mb-4">
        Kehidupan Kampus
      </h1>
      <p class="text-desc leading-relaxed max-w-2xl">
        Dokumentasi kegiatan kemahasiswaan serta prestasi yang diraih mahasiswa
        Fakultas Teknik Universitas Pasundan di tingkat regional, nasional, hingga internasional.
      </p>
    </div>
    </section-layout>
</template>