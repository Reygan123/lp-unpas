<script setup lang="ts">
import { ref } from 'vue';
import { Megaphone, CalendarDays, BookOpen, ListChecks } from 'lucide-vue-next';
import SectionLayout from '@/layouts/SectionLayout.vue';

const tabs = [
  { key: 'pengumuman', label: 'A. Papan Pengumuman', icon: Megaphone },
  { key: 'kalender', label: 'B. Kalender Akademik', icon: CalendarDays },
  { key: 'panduan', label: 'C. Buku Panduan Akademik', icon: BookOpen },
  { key: 'peraturan', label: 'D. Daftar Peraturan Akademik', icon: ListChecks },
];

const active = ref('pengumuman');

const scrollTo = (key: string) => {
  active.value = key;
  const el = document.getElementById(key);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};
</script>

<template>
    <SectionLayout>
    <div class="bg-white border border-outline rounded-xl p-2 flex flex-wrap gap-2">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          @click="scrollTo(tab.key)"
          class="flex-1 min-w-[160px] inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold transition"
          :class="active === tab.key
            ? 'bg-colorPrimary text-white'
            : 'bg-white text-text hover:bg-netral'"
        >
          <component :is="tab.icon" class="w-4 h-4" />
          {{ tab.label }}
        </button>
      </div>
    </SectionLayout>
</template>