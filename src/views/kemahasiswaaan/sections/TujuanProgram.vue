<script setup lang="ts">
import { MessageSquareText, Users, Building2, Megaphone, Handshake, GraduationCap } from 'lucide-vue-next';

const tujuan = [
  { icon: MessageSquareText, text: 'memperkuat komunikasi antar anggota angkatan' },
  { icon: Users, text: 'memudahkan koordinasi mahasiswa' },
  { icon: Building2, text: 'menghubungkan mahasiswa dengan pengelola fakultas dan prodi' },
  { icon: Megaphone, text: 'mendukung penyebaran informasi' },
  { icon: Handshake, text: 'membangun kepedulian dan solidaritas angkatan' },
  { icon: GraduationCap, text: 'menjaga hubungan mahasiswa setelah menjadi alumni' },
];
</script>

<template>
  <section class="bg-netral">
    <div class="max-w-7xl mx-auto px-4 lg:px-8 pb-8">
      <h2 class="font-sora text-xl font-bold text-colorPrimary mb-4">
        Tujuan Program
      </h2>

      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <div
          v-for="(item, index) in tujuan"
          :key="index"
          class="bg-white rounded-xl border border-outline p-4 flex flex-col items-center text-center gap-2"
        >
          <component :is="item.icon" class="w-6 h-6 text-colorPrimary" stroke-width="1.5" />
          <p class="text-text text-xs leading-snug">
            {{ index + 1 }}. {{ item.text }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>