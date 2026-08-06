<script setup lang="ts">
import { computed, ref } from 'vue';
import { Trophy } from 'lucide-vue-next';

const props = defineProps<{
  prestasi: any[];
  isLoading: boolean;
}>();

const baseUrl = import.meta.env.VITE_APP_IMG_URL

const getImageUrl = (imagePath: string | null) => {
  if (!imagePath) return ''
  return `${baseUrl}/${imagePath}`
}

const kategoriTabs = [
  { key: 'semua', label: 'Semua' },
  { key: 'internasional', label: 'Internasional' },
  { key: 'nasional', label: 'Nasional' },
  { key: 'regional', label: 'Regional' },
];

const activeTab = ref('semua');

const kategoriColor: Record<string, string> = {
  internasional: 'bg-purple-100 text-purple-700',
  nasional: 'bg-blue-100 text-blue-700',
  regional: 'bg-green-100 text-green-700',
};

const prestasi = computed(() => {
  const list = (props.prestasi || []).map((item: any) => ({
    id: item.id,
    title: item.title,
    winner_name: item.winner_name,
    category: item.category,
    image: getImageUrl(item.image),
  }));

  if (activeTab.value === 'semua') return list;
  return list.filter((item) => item.category === activeTab.value);
});
</script>

<template>
  <div>
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <h2 class="font-sora text-xl lg:text-2xl font-bold text-text border-l-4 border-colorPrimary pl-3">
        Prestasi Mahasiswa
      </h2>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="tab in kategoriTabs"
          :key="tab.key"
          @click="activeTab = tab.key"
          class="px-4 py-1.5 rounded-full text-xs font-semibold transition"
          :class="activeTab === tab.key
            ? 'bg-colorPrimary text-white'
            : 'bg-white text-text border border-outline hover:bg-netral'"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>

    <div v-if="isLoading" class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="n in 4" :key="n" class="bg-white rounded-xl border border-outline overflow-hidden animate-pulse">
        <div class="w-full aspect-square bg-netral"></div>
        <div class="p-4 flex flex-col gap-2">
          <div class="h-3 w-20 bg-netral rounded"></div>
          <div class="h-4 w-full bg-netral rounded"></div>
        </div>
      </div>
    </div>

    <div v-else-if="prestasi.length === 0" class="bg-white rounded-xl border border-outline p-10 text-center">
      <p class="text-desc text-sm">Belum ada prestasi pada kategori ini.</p>
    </div>

    <div v-else class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        v-for="item in prestasi"
        :key="item.id"
        class="bg-white rounded-xl border border-outline overflow-hidden hover:shadow-md transition flex flex-col"
      >
        <img :src="item.image" :alt="item.title" class="w-full aspect-square object-cover" />
        <div class="p-4 flex flex-col flex-1">
          <span
            class="inline-flex items-center gap-1 w-fit text-[10px] font-semibold px-2 py-0.5 rounded mb-2 capitalize"
            :class="kategoriColor[item.category] || 'bg-gray-100 text-gray-600'"
          >
            <Trophy class="w-3 h-3" />
            {{ item.category }}
          </span>
          <p class="font-sora font-bold text-text text-sm leading-snug mb-1">
            {{ item.title }}
          </p>
          <p class="text-desc text-xs leading-relaxed mt-auto pt-2">
            {{ item.winner_name }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>