<script setup lang="ts"></script>

<template>
  <section class="bg-netral relative overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 lg:px-8 pt-6 pb-10 relative z-10">
      <nav class="text-sm text-desc mb-6 flex items-center flex-wrap gap-1">
        <router-link to="/" class="hover:text-colorPrimary">Beranda</router-link>
        <span class="mx-1">/</span>
        <router-link to="/kemahasiswaan-dan-alumni" class="hover:text-colorPrimary">Kemahasiswaan & Alumni</router-link>
        <span class="mx-1">/</span>
        <span class="text-colorPrimary font-medium">ToKang FT Unpas</span>
      </nav>

      <div class="grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <h1 class="font-sora text-3xl lg:text-5xl font-bold text-colorPrimary mb-2">
            ToKang FT Unpas
          </h1>
          <p class="text-text text-lg font-medium mb-4">
            (Tokoh Angkatan di Lingkungan Fakultas Teknik Unpas)
          </p>
          <p class="text-desc leading-relaxed max-w-xl">
            Program identitas yang berisi daftar tokoh atau penghubung setiap angkatan,
            baik tingkat Fakultas maupun tingkat Program Studi.
          </p>
        </div>

        <div class="relative rounded-2xl overflow-hidden aspect-[16/9]">
          <img
            src=""
            alt="Mahasiswa Fakultas Teknik Universitas Pasundan"
            class="w-full h-full object-cover"
          />
          <div class="absolute -top-10 -right-16 w-40 h-40 bg-colorPrimary rotate-45"></div>
        </div>
      </div>
    </div>
  </section>
</template>