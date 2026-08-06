<script setup lang="ts">
import { Search, Pin, FileClock, GraduationCap, Wallet, FileEdit } from 'lucide-vue-next';
import SectionLayout from '@/layouts/SectionLayout.vue';

const pengumuman = [
  {
    icon: Pin,
    badge: 'PENTING',
    badgeColor: 'bg-red-500',
    title: 'Perubahan Jadwal UTS Genap 2026',
    desc: 'Sehubungan dengan kegiatan akademik, bersama ini disampaikan perubahan jadwal UTS Semester Genap 2026...',
    unit: 'Unit Akademik',
    tanggalUnit: '20 Mei 2026',
    tanggal: '20',
    bulan: 'MEI',
    tahun: '2026',
  },
  {
    icon: FileClock,
    badge: 'KRS',
    badgeColor: 'bg-blue-500',
    title: 'Jadwal Pengisian KRS Semester Genap 2026',
    desc: 'Pengisian KRS Semester Genap 2026 akan dilaksanakan secara online melalui SITU 2...',
    unit: 'Bagian Akademik',
    tanggalUnit: '18 Mei 2026',
    tanggal: '18',
    bulan: 'MEI',
    tahun: '2026',
  },
  {
    icon: GraduationCap,
    badge: 'Tugas Akhir',
    badgeColor: 'bg-purple-500',
    title: 'Pendaftaran Seminar Proposal Skripsi Gelombang 2',
    desc: 'Pendaftaran Seminar Proposal Skripsi Gelombang 2 dibuka mulai tanggal 20 - 31 Mei 2026...',
    unit: 'Jurusan',
    tanggalUnit: '17 Mei 2026',
    tanggal: '17',
    bulan: 'MEI',
    tahun: '2026',
  },
  {
    icon: Wallet,
    badge: 'Beasiswa',
    badgeColor: 'bg-orange-500',
    title: 'Informasi Beasiswa Bank Indonesia 2026',
    desc: 'Dibuka pendaftaran Beasiswa Bank Indonesia Tahun 2026 untuk mahasiswa aktif S1...',
    unit: 'Kemahasiswaan',
    tanggalUnit: '15 Mei 2026',
    tanggal: '15',
    bulan: 'MEI',
    tahun: '2026',
  },
  {
    icon: FileEdit,
    badge: 'Administrasi',
    badgeColor: 'bg-gray-500',
    title: 'Pengajuan Cuti Akademik Semester Genap 2026',
    desc: 'Mahasiswa yang akan mengajukan cuti akademik dapat mengajukan permohonan mulai...',
    unit: 'Bagian Akademik',
    tanggalUnit: '14 Mei 2026',
    tanggal: '14',
    bulan: 'MEI',
    tahun: '2026',
  },
];

const kategori = ['Semua Kategori', 'Penting', 'KRS', 'Tugas Akhir', 'Beasiswa', 'Administrasi'];
const tahun = ['Semua Tahun', '2026', '2025', '2024'];
</script>

<template>
  <section id="pengumuman" class="bg-netral scroll-mt-24">
    <div class="max-w-7xl mx-auto px-4 lg:px-8">
      <div class="bg-white border border-outline rounded-xl p-5 flex flex-col h-full">
        <div class="flex flex-col sm:flex-row gap-3 mb-5">
          <div class="flex-1 flex items-center gap-2 border border-outline rounded-lg px-3 py-2">
            <Search class="w-4 h-4 text-desc shrink-0" />
            <input
              type="text"
              placeholder="Cari pengumuman..."
              class="flex-1 outline-none text-sm text-text placeholder:text-desc bg-transparent"
            />
          </div>
          <select class="border border-outline rounded-lg px-3 py-2 text-sm text-text bg-white">
            <option v-for="item in kategori" :key="item">{{ item }}</option>
          </select>
          <select class="border border-outline rounded-lg px-3 py-2 text-sm text-text bg-white">
            <option v-for="item in tahun" :key="item">{{ item }}</option>
          </select>
        </div>

        <h2 class="font-sora font-bold text-text mb-4">Pengumuman Terbaru</h2>

        <div class="flex-1 divide-y divide-outline">
          <div
            v-for="item in pengumuman"
            :key="item.title"
            class="flex gap-3 py-4 first:pt-0"
          >
            <div class="w-9 h-9 rounded-lg bg-colorPrimary/10 flex items-center justify-center shrink-0">
              <component :is="item.icon" class="w-4 h-4 text-colorPrimary" />
            </div>
            <div class="flex-1">
              <span
                class="inline-block text-white text-[10px] font-semibold px-2 py-0.5 rounded mb-1.5"
                :class="item.badgeColor"
              >
                {{ item.badge }}
              </span>
              <p class="text-text text-sm font-semibold leading-snug mb-1">
                {{ item.title }}
              </p>
              <p class="text-desc text-xs leading-relaxed mb-1.5">
                {{ item.desc }}
              </p>
              <p class="text-desc text-xs">
                {{ item.unit }} &nbsp;|&nbsp; {{ item.tanggalUnit }}
              </p>
            </div>
            <div class="flex flex-col items-center leading-none shrink-0 w-10 text-right">
              <span class="text-colorPrimary font-sora font-bold text-lg">{{ item.tanggal }}</span>
              <span class="text-colorPrimary text-xs font-semibold">{{ item.bulan }}</span>
              <span class="text-desc text-[10px]">{{ item.tahun }}</span>
            </div>
          </div>
        </div>

        <router-link
          to="/akademik/pengumuman"
          class="inline-flex items-center gap-1 text-colorPrimary font-semibold text-sm hover:opacity-80 mt-4 pt-4 border-t border-outline"
        >
          Lihat Semua Pengumuman
          <i class="pi pi-arrow-right text-xs"></i>
        </router-link>
      </div>
    </div>
  </section>
</template>