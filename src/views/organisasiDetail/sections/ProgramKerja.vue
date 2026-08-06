<script setup lang="ts">
import { Users, GraduationCap, MonitorSmartphone, HeartHandshake, Lightbulb, Diamond, Rocket, MessagesSquare } from 'lucide-vue-next';

const program = [
  { icon: Users, title: 'Pengembangan Organisasi' },
  { icon: GraduationCap, title: 'Kaderisasi' },
  { icon: MonitorSmartphone, title: 'Keilmuan & Keprofesian' },
  { icon: HeartHandshake, title: 'Pengabdian Masyarakat' },
  { icon: Lightbulb, title: 'Minat & Bakat' },
  { icon: Diamond, title: 'Kesejahteraan Mahasiswa' },
  { icon: Rocket, title: 'Kewirausahaan' },
  { icon: MessagesSquare, title: 'Komunikasi & Informasi' },
];
</script>

<template>
  <section id="program-kerja" class="scroll-mt-24 mt-10">
    <h2 class="font-sora font-bold text-colorPrimary mb-4">
      C. PROGRAM KERJA
    </h2>

    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
      <div
        v-for="item in program"
        :key="item.title"
        class="bg-white rounded-xl border border-outline p-4 flex flex-col items-center text-center gap-2"
      >
        <component :is="item.icon" class="w-7 h-7 text-colorPrimary" stroke-width="1.5" />
        <p class="text-text text-xs font-semibold leading-snug">{{ item.title }}</p>
      </div>
    </div>

    <div class="flex justify-center">
      <button class="inline-flex items-center gap-2 bg-white border border-outline text-text font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-netral transition">
        Lihat Semua Program Kerja
        <i class="pi pi-arrow-right text-xs"></i>
      </button>
    </div>
  </section>
</template>