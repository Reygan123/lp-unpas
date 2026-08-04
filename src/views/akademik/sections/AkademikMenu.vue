<script setup lang="ts">
import { Target, GraduationCap, CalendarClock, ScrollText, MonitorSmartphone } from 'lucide-vue-next';
import SectionLayout from '@/layouts/SectionLayout.vue';

const menus = [
  {
    icon: Target,
    title: 'Kompetensi Lulusan',
    desc: 'Kerangka kompetensi dan karakter lulusan Fakultas Teknik Unpas.',
    label: 'Lihat Kompetensi',
    to: '/akademik/kompetensi-lulusan',
  },
  {
    icon: GraduationCap,
    title: 'Program Studi',
    desc: 'Informasi program sarjana dan pascasarjana di Fakultas Teknik Unpas.',
    label: 'Lihat Program Studi',
    to: '/prodi',
  },
  {
    icon: CalendarClock,
    title: 'Program Perkuliahan',
    desc: 'Informasi kelas reguler, hybrid, PJJ, dan program fast-track.',
    label: 'Lihat Program',
    to: '/akademik/program-perkuliahan',
  },
  {
    icon: ScrollText,
    title: 'Peraturan Akademik',
    desc: 'Pengumuman, kalender akademik, buku panduan, dan peraturan yang berlaku.',
    label: 'Lihat Peraturan',
    to: '/akademik/peraturan',
  },
  {
    icon: MonitorSmartphone,
    title: 'Layanan Akademik',
    desc: 'Akses cepat ke berbagai portal layanan akademik dan administrasi.',
    label: 'Buka Layanan',
    to: '/akademik/layanan',
  },
];
</script>

<template>
    <SectionLayout>
      <div class="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <div
          v-for="menu in menus"
          :key="menu.title"
          class="bg-white rounded-xl border border-outline p-6 hover:shadow-md transition"
        >
          <component :is="menu.icon" class="w-10 h-10 text-colorPrimary mb-4" stroke-width="1.5" />
          <h3 class="font-sora font-bold text-text mb-2">
            {{ menu.title }}
          </h3>
          <p class="text-desc text-sm leading-relaxed mb-4">
            {{ menu.desc }}
          </p>
          <router-link
            :to="menu.to"
            class="inline-flex items-center gap-1 text-colorPrimary font-semibold text-sm hover:opacity-80"
          >
            {{ menu.label }}
            <i class="pi pi-arrow-right text-xs"></i>
          </router-link>
        </div>
      </div>
    </SectionLayout>
</template>