<script setup lang="ts">
import { User, Archive, ListTree, Contact2, ChevronRight, Phone, Mail } from 'lucide-vue-next';

const statusPic = [
  { label: 'On Duty', color: 'bg-green-500', desc: 'PIC aktif menjalankan peran dan bertanggung jawab penuh.' },
  { label: 'Standby', color: 'bg-orange-500', desc: 'PIC dalam masa transisi atau persiapan untuk aktif.' },
  { label: 'Tidak Aktif', color: 'bg-gray-400', desc: 'PIC tidak aktif / belum ditetapkan atau tidak dapat dihubungi.' },
];

const navigasi = [
  { icon: User, label: 'Angkatan Aktif' },
  { icon: Archive, label: 'Arsip Angkatan' },
  { icon: ListTree, label: 'Detail Angkatan' },
  { icon: Contact2, label: 'PIC Angkatan' },
  { icon: Phone, label: 'Kontak Resmi' },
];
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="bg-white border border-outline rounded-xl p-5">
      <h3 class="font-sora font-bold text-colorPrimary text-sm mb-4">Makna Status PIC</h3>
      <div class="flex flex-col divide-y divide-outline">
        <div v-for="item in statusPic" :key="item.label" class="flex items-start gap-3 py-3 first:pt-0">
          <span class="text-white text-xs font-semibold px-2.5 py-1 rounded shrink-0" :class="item.color">
            {{ item.label }}
          </span>
          <p class="text-desc text-xs leading-relaxed">{{ item.desc }}</p>
        </div>
      </div>
    </div>

    <div class="bg-white border border-outline rounded-xl p-5">
      <h3 class="font-sora font-bold text-colorPrimary text-sm mb-2">Navigasi Cepat</h3>
      <div class="flex flex-col divide-y divide-outline">
        <button
          v-for="item in navigasi"
          :key="item.label"
          class="flex items-center justify-between gap-3 py-3 first:pt-1 text-sm text-text hover:text-colorPrimary transition"
        >
          <span class="flex items-center gap-2">
            <component :is="item.icon" class="w-4 h-4 text-colorPrimary shrink-0" />
            {{ item.label }}
          </span>
          <ChevronRight class="w-4 h-4 text-desc" />
        </button>
      </div>
    </div>

    <div class="bg-white border border-outline rounded-xl p-5">
      <h3 class="font-sora font-bold text-colorPrimary text-sm mb-3">Butuh Bantuan?</h3>
      <div class="flex flex-col gap-2 text-sm text-text">
        <p class="flex items-center gap-2">
          <Phone class="w-4 h-4 text-colorPrimary shrink-0" />
          022-2019432
        </p>
        <p class="flex items-center gap-2">
          <Mail class="w-4 h-4 text-colorPrimary shrink-0" />
          tokang@ft.unpas.ac.id
        </p>
        <p class="text-desc text-xs mt-1">Senin - Jumat | 08.00 - 16.00 WIB</p>
      </div>
    </div>
  </div>
</template>