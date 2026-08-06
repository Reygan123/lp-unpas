<script setup lang="ts">
import { computed } from 'vue';
import { PlayCircle, ExternalLink } from 'lucide-vue-next';

const props = defineProps<{
  alumniNetworking: any[];
  isLoading: boolean;
}>();

const tipeLabel: Record<string, string> = {
  video_sharing: 'Video Sharing',
  artikel: 'Artikel',
  podcast: 'Podcast',
};

const baseUrl = import.meta.env.VITE_APP_IMG_URL

const getImageUrl = (imagePath: string | null) => {
  if (!imagePath) return ''
  return `${baseUrl}/${imagePath}`
}

const alumniNetworking = computed(() => {
  return (props.alumniNetworking || []).map((item: any) => ({
    ...item,
    thumbnailUrl: item.thumbnail ? getImageUrl(item.thumbnail) : null,
    tipeText: tipeLabel[item.tipe] || item.tipe,
  }));
});
</script>

<template>
  <div id="alumni-networking" class="scroll-mt-24 bg-white border border-outline rounded-xl p-5">
    <h2 class="font-sora font-bold text-text mb-4">Alumni Networking</h2>

    <div v-if="isLoading" class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="n in 4" :key="n" class="bg-netral rounded-xl animate-pulse h-40"></div>
    </div>

    <div v-else-if="alumniNetworking.length === 0" class="py-10 text-center">
      <p class="text-desc text-sm">Belum ada data alumni networking yang tersedia.</p>
    </div>

    <div v-else class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <a
        v-for="item in alumniNetworking"
        :key="item.id"
        :href="item.url"
        target="_blank"
        class="bg-netral rounded-xl border border-outline overflow-hidden flex flex-col hover:shadow-md transition"
      >
        <div class="relative w-full aspect-video">
          <img
            v-if="item.thumbnailUrl"
            :src="item.thumbnailUrl"
            :alt="item.judul"
            class="w-full h-full object-cover"
          />
          <div v-else class="w-full h-full bg-colorPrimary/10 flex items-center justify-center">
            <PlayCircle class="w-8 h-8 text-colorPrimary" stroke-width="1.5" />
          </div>
          <div v-if="item.tipe === 'video_sharing'" class="absolute inset-0 bg-black/20 flex items-center justify-center">
            <PlayCircle class="w-8 h-8 text-white" fill="white" />
          </div>
        </div>
        <div class="p-4 flex flex-col gap-1">
          <span class="inline-block w-fit bg-colorPrimary/10 text-colorPrimary text-[10px] font-semibold px-2 py-0.5 rounded">
            {{ item.tipeText }}
          </span>
          <p class="font-sora font-bold text-text text-sm leading-snug">{{ item.judul }}</p>
          <p v-if="item.bidang" class="text-desc text-xs">{{ item.bidang }}</p>
          <p v-if="item.deskripsi" class="text-desc text-xs leading-relaxed">{{ item.deskripsi }}</p>
          <span class="inline-flex items-center gap-1 text-colorPrimary font-semibold text-xs mt-1">
            Lihat Selengkapnya
            <ExternalLink class="w-3 h-3" />
          </span>
        </div>
      </a>
    </div>
  </div>
</template>