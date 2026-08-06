<script setup lang="ts">
import { computed } from 'vue';
import { CalendarDays, Clock, MapPin, Video } from 'lucide-vue-next';

const props = defineProps<{
  webinar: any[];
  isLoading: boolean;
}>();

const jenisLabel: Record<string, string> = {
  pelatihan_wawancara: 'Pelatihan Wawancara',
  seminar: 'Seminar',
  workshop: 'Workshop',
  job_fair: 'Job Fair',
};

const baseUrl = import.meta.env.VITE_APP_IMG_URL

const getImageUrl = (imagePath: string | null) => {
  if (!imagePath) return ''
  return `${baseUrl}/${imagePath}`
}

const webinar = computed(() => {
  return (props.webinar || []).map((item: any) => ({
    ...item,
    posterUrl: item.poster ? getImageUrl(item.poster) : null,
    jenisText: jenisLabel[item.jenis] || item.jenis,
  }));
});
</script>

<template>
  <div id="webinar" class="scroll-mt-24 bg-white border border-outline rounded-xl p-5">
    <h2 class="font-sora font-bold text-text mb-4">Webinar & Event Karier</h2>

    <div v-if="isLoading" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="n in 3" :key="n" class="bg-netral rounded-xl animate-pulse h-48"></div>
    </div>

    <div v-else-if="webinar.length === 0" class="py-10 text-center">
      <p class="text-desc text-sm">Belum ada webinar atau event karier yang tersedia.</p>
    </div>

    <div v-else class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="item in webinar"
        :key="item.id"
        class="bg-netral rounded-xl border border-outline overflow-hidden flex flex-col"
      >
        <img v-if="item.posterUrl" :src="item.posterUrl" :alt="item.nama_kegiatan" class="w-full aspect-video object-cover" />
        <div v-else class="w-full aspect-video bg-colorPrimary/10 flex items-center justify-center">
          <Video class="w-8 h-8 text-colorPrimary" stroke-width="1.5" />
        </div>
        <div class="p-4 flex flex-col flex-1">
          <span v-if="item.jenisText" class="inline-block w-fit bg-colorPrimary/10 text-colorPrimary text-[10px] font-semibold px-2 py-0.5 rounded mb-2">
            {{ item.jenisText }}
          </span>
          <p class="font-sora font-bold text-text text-sm leading-snug mb-2">{{ item.nama_kegiatan }}</p>
          <p v-if="item.deskripsi" class="text-desc text-xs leading-relaxed mb-2">{{ item.deskripsi }}</p>
          <div class="flex flex-col gap-1 mt-auto pt-2 text-desc text-xs">
            <span v-if="item.tanggal" class="flex items-center gap-1.5">
              <CalendarDays class="w-3.5 h-3.5 shrink-0" />
              {{ new Date(item.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) }}
            </span>
            <span v-if="item.waktu" class="flex items-center gap-1.5">
              <Clock class="w-3.5 h-3.5 shrink-0" />
              {{ item.waktu }} WIB
            </span>
            <span v-if="item.tempat" class="flex items-center gap-1.5">
              <MapPin class="w-3.5 h-3.5 shrink-0" />
              {{ item.tempat }}
            </span>
          </div>
          <a
            v-if="item.tautan_pendaftaran"
            :href="item.tautan_pendaftaran"
            target="_blank"
            class="inline-flex items-center gap-1 text-colorPrimary font-semibold text-xs hover:opacity-80 mt-2"
          >
            Daftar
            <i class="pi pi-arrow-right text-[10px]"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>