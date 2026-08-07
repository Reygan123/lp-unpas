<script setup lang="ts">
import { CalendarDays, Users, Landmark, Phone } from 'lucide-vue-next';

defineProps<{
  ormawa: any;
}>();
</script>

<template>
  <section class="relative bg-colorPrimary">
    <img
      :src="ormawa.banner"
      alt=""
      class="absolute inset-0 w-full h-full object-cover opacity-30"
      aria-hidden="true"
    />
    <div class="absolute inset-0 bg-gradient-to-r from-colorPrimary via-colorPrimary/90 to-colorPrimary/60"></div>

    <div class="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
      <nav class="pt-4 text-sm text-white/70 flex items-center flex-wrap gap-1">
        <router-link to="/" class="hover:text-white">Beranda</router-link>
        <span class="mx-1">/</span>
        <router-link to="/kemahasiswaan-dan-alumni" class="hover:text-white">Kemahasiswaan</router-link>
        <span class="mx-1">/</span>
        <span class="hover:text-white">Ormawa</span>
        <span class="mx-1">/</span>
        <span class="text-white font-medium">{{ ormawa.nama }}</span>
      </nav>

      <div class="py-8 flex flex-col sm:flex-row items-start gap-6">
        <img
          :src="ormawa.logo"
          :alt="`Logo ${ormawa.nama}`"
          class="w-24 h-24 lg:w-28 lg:h-28 object-contain shrink-0"
        />
        <div>
          <span class="inline-block bg-white/15 text-white text-xs font-semibold px-3 py-1 rounded mb-3">
            {{ ormawa.kategori }}
          </span>
          <h1 class="font-sora text-3xl lg:text-5xl font-bold text-white mb-2">
            {{ ormawa.nama }}
          </h1>
          <p class="text-white/90 text-base lg:text-lg leading-snug mb-2">
            {{ ormawa.namaLengkap }}<br />
            {{ ormawa.unit }}
          </p>
          <p class="text-white/70 text-sm" v-html="ormawa.tagline"></p>
        </div>
      </div>
    </div>

    <div class="relative z-10 top-9">
      <div class="max-w-7xl mx-auto px-4 lg:px-8 mb-6 md:mb-10">
        <div class="bg-white rounded-xl border border-outline shadow-sm p-5 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="flex items-center gap-3">
            <CalendarDays class="w-8 h-8 text-colorPrimary shrink-0" stroke-width="1.5" />
            <div>
              <p class="text-desc text-xs">Periode Kepengurusan</p>
              <p class="text-text font-semibold text-sm">{{ ormawa.periode }}</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <Users class="w-8 h-8 text-colorPrimary shrink-0" stroke-width="1.5" />
            <div>
              <p class="text-desc text-xs">Jumlah Anggota</p>
              <p class="text-text font-semibold text-sm">{{ ormawa.jumlahAnggota }}</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <Landmark class="w-8 h-8 text-colorPrimary shrink-0" stroke-width="1.5" />
            <div>
              <p class="text-desc text-xs">Pembina</p>
              <p class="text-text font-semibold text-sm">{{ ormawa.pembina }}</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <Phone class="w-8 h-8 text-colorPrimary shrink-0" stroke-width="1.5" />
            <div>
              <p class="text-desc text-xs">Kontak</p>
              <p class="text-text font-semibold text-sm">{{ ormawa.kontak }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>