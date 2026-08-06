<script setup lang="ts">
import { ref } from 'vue';
import { Briefcase, FileSearch, Video, Users, LineChart, FileEdit } from 'lucide-vue-next';
import SectionLayout from '@/layouts/SectionLayout.vue';

const tabs = [
  { key: 'magang', label: 'Magang', icon: Briefcase },
  { key: 'lowongan', label: 'Lowongan Kerja', icon: FileSearch },
  { key: 'webinar', label: 'Webinar Karier', icon: Video },
  { key: 'alumni-networking', label: 'Alumni Networking', icon: Users },
  { key: 'tracer-study', label: 'Tracer Study', icon: LineChart },
  { key: 'review-cv', label: 'Review CV', icon: FileEdit },
];

const active = ref('magang');

const scrollTo = (key: string) => {
  active.value = key;
  const el = document.getElementById(key);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};
</script>

<template>
   <div class="w-full px-[20px] md:px-[60px] lg:px-[120px]">
      <div class="bg-white border border-outline rounded-xl p-2 flex flex-wrap gap-2">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          @click="scrollTo(tab.key)"
          class="flex-1 min-w-[150px] inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold transition"
          :class="active === tab.key
            ? 'bg-colorPrimary text-white'
            : 'bg-white text-text hover:bg-netral'"
        >
          <component :is="tab.icon" class="w-4 h-4" />
          {{ tab.label }}
        </button>
      </div>
    </div>
</template>