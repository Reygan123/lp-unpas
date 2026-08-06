<script setup lang="ts">
import { UserCircle2, ListChecks, Images, CalendarCheck2, Megaphone, Phone } from 'lucide-vue-next';

const menu = [
  { icon: UserCircle2, title: 'Ketua Angkatan', desc: 'Profil dan informasi ketua angkatan' },
  { icon: ListChecks, title: 'Daftar PIC', desc: 'Daftar histori aktivis angkatan' },
  { icon: Images, title: 'Album Foto Angkatan', desc: 'Dokumentasi momen kegiatan' },
  { icon: CalendarCheck2, title: 'Daftar Kegiatan Angkatan', desc: 'Agenda kegiatan yang telah dilaksanakan' },
  { icon: Megaphone, title: 'Pengumuman Angkatan', desc: 'Informasi penting terkait angkatan' },
  { icon: Phone, title: 'Kontak Resmi', desc: 'Kontak dan alamat resmi angkatan' },
];
</script>

<template>
  <section class="bg-netral">
    <div class="max-w-7xl mx-auto px-4 lg:px-8 pb-8">
      <h2 class="font-sora text-xl font-bold text-colorPrimary mb-4">
        Halaman Detail Angkatan
      </h2>

      <div class="grid lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div
            v-for="item in menu"
            :key="item.title"
            class="bg-white rounded-xl border border-outline p-4 flex flex-col gap-2"
          >
            <component :is="item.icon" class="w-6 h-6 text-colorPrimary" stroke-width="1.5" />
            <p class="font-sora font-bold text-text text-sm">{{ item.title }}</p>
            <p class="text-desc text-xs leading-snug">{{ item.desc }}</p>
          </div>
        </div>

        <div class="bg-white rounded-xl border border-outline overflow-hidden flex flex-col sm:flex-row lg:flex-col">
          <img
            src=""
            alt="Angkatan 2020 Fakultas Teknik"
            class="w-full sm:w-1/2 lg:w-full h-40 lg:h-32 object-cover"
          />
          <div class="p-4 flex flex-col gap-1">
            <p class="font-sora font-bold text-text text-sm">Angkatan 2020 - Fakultas Teknik</p>
            <p class="text-desc text-xs">PIC Aktivis: Dinda Aulia Putri</p>
            <p class="text-desc text-xs mb-2">Total Anggota: 128 mahasiswa</p>
            <router-link
              to="/kemahasiswaan-dan-alumni/tokang/detail"
              class="inline-flex items-center gap-1 text-colorPrimary font-semibold text-xs hover:opacity-80"
            >
              Lihat Detail Angkatan
              <i class="pi pi-arrow-right text-xs"></i>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>