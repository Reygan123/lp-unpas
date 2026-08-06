<script setup lang="ts">
import { ref } from 'vue';
import { Users, FileEdit } from 'lucide-vue-next';

const tabs = [
  { key: 'ikaft', label: 'Profil IKAFT', icon: Users },
  { key: 'update-data', label: 'Update Data Alumni', icon: FileEdit },
];

const active = ref('ikaft');

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
          class="flex-1 min-w-[160px] inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold transition"
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