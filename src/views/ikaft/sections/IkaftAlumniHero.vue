<script setup lang="ts">
import SectionLayout from "@/layouts/SectionLayout.vue";
</script>

<template>
  <section-layout>
    <div class="pt-6">
      <nav class="text-sm text-desc mb-6">
        <router-link to="/" class="hover:text-colorPrimary">Beranda</router-link>
        <span class="mx-2">/</span>
        <router-link to="/kemahasiswaan-dan-alumni" class="hover:text-colorPrimary"
          >Kemahasiswaan & Alumni</router-link
        >
        <span class="mx-2">/</span>
        <span class="text-text font-medium">IKAFT & Alumni Update</span>
      </nav>

      <h1 class="font-sora text-3xl lg:text-5xl font-bold text-text mb-4">
        IKAFT & Pemutakhiran Data Alumni
      </h1>
      <p class="text-desc leading-relaxed max-w-2xl">
        Ikatan Keluarga Alumni Fakultas Teknik (IKAFT) Universitas Pasundan menjadi wadah
        silaturahmi dan kolaborasi alumni. Perbarui data diri Anda agar tetap terhubung
        dengan jaringan alumni dan informasi terbaru dari fakultas.
      </p>
    </div>
  </section-layout>
</template>
