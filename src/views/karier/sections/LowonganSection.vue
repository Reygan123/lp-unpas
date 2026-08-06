<script setup lang="ts">
import { computed } from 'vue';
import { Building2, MapPin, Clock } from 'lucide-vue-next';

const props = defineProps<{
  lowongan: any[];
  isLoading: boolean;
}>();

const lowongan = computed(() => (props.lowongan || []).filter((item: any) => item.status === 'aktif'));
</script>

<template>
  <div id="lowongan" class="scroll-mt-24 bg-white border border-outline rounded-xl p-5">
    <h2 class="font-sora font-bold text-text mb-4">Lowongan Kerja</h2>

    <div v-if="isLoading" class="flex flex-col divide-y divide-outline">
      <div v-for="n in 3" :key="n" class="py-4 animate-pulse h-16 bg-netral rounded-lg my-1"></div>
    </div>

    <div v-else-if="lowongan.length === 0" class="py-10 text-center">
      <p class="text-desc text-sm">Belum ada lowongan kerja yang tersedia.</p>
    </div>

    <div v-else class="flex flex-col divide-y divide-outline">
      <div
        v-for="item in lowongan"
        :key="item.id"
        class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-4 first:pt-0"
      >
        <div>
          <p class="font-sora font-bold text-text text-sm leading-snug mb-1">{{ item.posisi }}</p>
          <div class="flex flex-wrap items-center gap-3 text-desc text-xs">
            <span class="flex items-center gap-1.5">
              <Building2 class="w-3.5 h-3.5 shrink-0" />
              {{ item.perusahaan }}
            </span>
            <span v-if="item.lokasi" class="flex items-center gap-1.5">
              <MapPin class="w-3.5 h-3.5 shrink-0" />
              {{ item.lokasi }}
            </span>
            <span v-if="item.jenis_pekerjaan" class="flex items-center gap-1.5">
              <Clock class="w-3.5 h-3.5 shrink-0" />
              {{ item.jenis_pekerjaan }}
            </span>
          </div>
          <p v-if="item.prodi_relevan" class="text-desc text-xs mt-1">
            Prodi Relevan: {{ item.prodi_relevan }}
          </p>
        </div>
        <a
          v-if="item.tautan_pendaftaran"
          :href="item.tautan_pendaftaran"
          target="_blank"
          class="inline-flex items-center justify-center gap-2 bg-colorPrimary text-white font-semibold text-xs px-4 py-2 rounded-lg hover:opacity-90 transition shrink-0"
        >
          Lamar Sekarang
        </a>
      </div>
    </div>
  </div>
</template>