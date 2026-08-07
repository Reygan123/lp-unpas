<script setup lang="ts">
import { ref } from 'vue';
import { UserCircle2, Network, ListChecks,  Images, FileText, Phone } from 'lucide-vue-next';

const nav = [
  { key: 'profil', label: 'Profil', icon: UserCircle2 },
  { key: 'struktur', label: 'Struktur Kepengurusan', icon: Network },
  { key: 'program-kerja', label: 'Program Kerja', icon: ListChecks },
  // { key: 'berita', label: 'Berita & Kegiatan', icon: Newspaper },
  { key: 'galeri', label: 'Galeri', icon: Images },
  { key: 'dokumen', label: 'Dokumen Organisasi', icon: FileText },
  { key: 'kontak', label: 'Kontak', icon: Phone },
];

const active = ref('profil');

const scrollTo = (key: string) => {
  active.value = key;
  const el = document.getElementById(key);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};
</script>

<template>
  <div class="bg-white border border-outline rounded-xl p-2 flex flex-col sticky top-24">
    <button
      v-for="item in nav"
      :key="item.key"
      @click="scrollTo(item.key)"
      class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition text-left"
      :class="active === item.key
        ? 'bg-colorPrimary text-white'
        : 'text-text hover:bg-netral'"
    >
      <component :is="item.icon" class="w-4 h-4 shrink-0" />
      {{ item.label }}
    </button>
  </div>
</template>