<script setup lang="ts">
import SectionLayout from '@/layouts/SectionLayout.vue';
</script>

<template>
    <SectionLayout>
    <div class="grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <p class="font-sora text-3xl lg:text-5xl font-bold text-colorPrimary mb-1">
            Akademik
          </p>
          <h1 class="font-sora text-3xl lg:text-5xl font-bold text-text leading-tight mb-6">
            Fakultas Teknik<br />
            Universitas Pasundan
          </h1>
          <p class="text-desc text-base lg:text-lg leading-relaxed mb-8 max-w-xl">
            Informasi lengkap mengenai program studi, kurikulum, kompetensi lulusan,
            peraturan akademik, biaya pendidikan, dan layanan akademik di
            Fakultas Teknik Universitas Pasundan.
          </p>

          <div class="flex flex-wrap gap-4">
            <router-link
              to="/prodi"
              class="inline-flex items-center gap-2 bg-colorPrimary text-white font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition"
            >
              Jelajahi Program Studi
              <i class="pi pi-arrow-right text-sm"></i>
            </router-link>
            <router-link
              to="/akademik/layanan"
              class="inline-flex items-center gap-2 bg-white text-text font-semibold px-6 py-3 rounded-lg border border-outline hover:bg-netral transition"
            >
              Buka Layanan Akademik
              <i class="pi pi-arrow-right text-sm"></i>
            </router-link>
          </div>
        </div>

        <div class="relative rounded-2xl overflow-hidden aspect-[16/10]">
          <img
            src="/src/assets/Gedung.jpg"
            alt="Mahasiswa Fakultas Teknik Universitas Pasundan"
            class="w-full h-full object-cover"
          />
          <div class="absolute -top-10 -right-16 w-40 h-40 bg-colorPrimary rotate-45"></div>
        </div>
      </div>
    </SectionLayout>
  <!-- <section class="bg-netral">
    <div class="max-w-7xl mx-auto px-4 lg:px-8 pt-6 pb-16 lg:pb-24">

      

      
    </div>
  </section> -->
</template>