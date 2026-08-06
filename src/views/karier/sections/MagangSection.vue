<script setup lang="ts">
import { computed } from 'vue';
import { Building2, CalendarDays, MapPin, FileText } from 'lucide-vue-next';

const props = defineProps<{
  magang: any[];
  isLoading: boolean;
}>();

const getFileUrl = (path: string) => {
  return `${import.meta.env.VITE_API_URL}/storage/${path}`;
};

const magang = computed(() => {
  return (props.magang || [])
    .filter((item: any) => item.status === 'aktif')
    .map((item: any) => ({
      ...item,
      posterUrl: item.poster ? getFileUrl(item.poster) : null,
    }));
});
</script>

<template>
  <div id="magang" class="scroll-mt-24 bg-white border border-outline rounded-xl p-5">
    <h2 class="font-sora font-bold text-text mb-4">Program Magang</h2>

    <div v-if="isLoading" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="n in 3" :key="n" class="bg-netral rounded-xl p-4 animate-pulse h-32"></div>
    </div>

    <div v-else-if="magang.length === 0" class="py-10 text-center">
      <p class="text-desc text-sm">Belum ada informasi magang yang tersedia.</p>
    </div>

    <div v-else class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="item in magang"
        :key="item.id"
        class="bg-netral rounded-xl border border-outline p-4 flex flex-col gap-2"
      >
        <p class="font-sora font-bold text-text text-sm leading-snug">{{ item.nama_lowongan }}</p>
        <p class="text-desc text-xs flex items-center gap-1.5">
          <Building2 class="w-3.5 h-3.5 shrink-0" />
          {{ item.perusahaan }}
        </p>
        <p v-if="item.lokasi" class="text-desc text-xs flex items-center gap-1.5">
          <MapPin class="w-3.5 h-3.5 shrink-0" />
          {{ item.lokasi }}
        </p>
        <p v-if="item.durasi" class="text-desc text-xs">
          Durasi: {{ item.durasi }} hari
        </p>
        <p v-if="item.prodi_relevan" class="text-desc text-xs">
          Prodi Relevan: {{ item.prodi_relevan }}
        </p>
        <p v-if="item.batas_pendaftaran" class="text-desc text-xs flex items-center gap-1.5">
          <CalendarDays class="w-3.5 h-3.5 shrink-0" />
          Batas: {{ new Date(item.batas_pendaftaran).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) }}
        </p>
        <div class="flex items-center gap-3 mt-2">
          <a
            v-if="item.posterUrl"
            :href="item.posterUrl"
            target="_blank"
            class="inline-flex items-center gap-1 text-desc font-semibold text-xs hover:text-colorPrimary"
          >
            <FileText class="w-3.5 h-3.5" />
            Poster
          </a>
          <a
            v-if="item.tautan_pendaftaran"
            :href="item.tautan_pendaftaran"
            target="_blank"
            class="inline-flex items-center gap-1 text-colorPrimary font-semibold text-xs hover:opacity-80"
          >
            Daftar Sekarang
            <i class="pi pi-arrow-right text-[10px]"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>