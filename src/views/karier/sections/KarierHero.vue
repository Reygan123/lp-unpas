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
        <span class="text-text font-medium">Karier & Alumni</span>
      </nav>

      <h1 class="font-sora text-3xl lg:text-5xl font-bold text-text mb-4">
        Career and Development Center
      </h1>
      <p class="text-desc leading-relaxed max-w-2xl">
        Akses informasi magang, lowongan kerja, webinar karier, jejaring alumni,
        dan layanan konsultasi CV untuk menunjang persiapan karier mahasiswa dan alumni
        Fakultas Teknik Universitas Pasundan.
      </p>
    </div>
    </section-layout>
</template>