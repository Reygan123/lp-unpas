<script setup lang="ts">
import SectionLayout from "@/layouts/SectionLayout.vue";
</script>

<template>
  <SectionLayout>
    <nav class="text-sm text-desc">
      <router-link to="/" class="hover:text-colorPrimary">Beranda</router-link>
      <span class="mx-2">/</span>
      <router-link to="/akademik" class="hover:text-colorPrimary">Akademik</router-link>
      <span class="mx-2">/</span>
      <span class="text-text font-medium">Peraturan Akademik</span>
    </nav>

    <div>
      <h1 class="font-sora text-3xl lg:text-5xl font-bold text-text mb-4">
        Peraturan Akademik
      </h1>
      <p class="text-desc leading-relaxed max-w-2xl">
        Informasi resmi mengenai pengumuman, kalender akademik, buku panduan, dan
        peraturan akademik Fakultas Teknik Universitas Pasundan.
      </p>
    </div>
  </SectionLayout>
</template>
