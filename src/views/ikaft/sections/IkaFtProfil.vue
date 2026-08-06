<script setup lang="ts">
import { computed } from 'vue';
import { Users, Phone } from 'lucide-vue-next';

const props = defineProps<{
  ikaft: any;
  isLoading: boolean;
}>();

const baseUrl = import.meta.env.VITE_APP_IMG_URL

const getImageUrl = (imagePath: string | null) => {
  if (!imagePath) return ''
  return `${baseUrl}/${imagePath}`
}


const ikaft = computed(() => {
  const data = props.ikaft || {};
  return {
    deskripsi: data.deskripsi || '-',
    strukturPengurus: data.struktur_pengurus || '-',
    kontak: data.kontak || '-',
    logoUrl: data.logo ? getImageUrl(data.logo) : null,
  };
});
</script>

<template>
  <div id="ikaft" class="scroll-mt-24 bg-white border border-outline rounded-xl p-5">
    <h2 class="font-sora font-bold text-text mb-4">Profil IKAFT</h2>

    <div v-if="isLoading" class="grid sm:grid-cols-3 gap-4">
      <div class="bg-netral rounded-xl animate-pulse h-32"></div>
      <div class="sm:col-span-2 bg-netral rounded-xl animate-pulse h-32"></div>
    </div>

    <div v-else class="grid sm:grid-cols-3 gap-4">
      <div class="bg-netral rounded-xl border border-outline p-5 flex flex-col items-center text-center gap-3">
        <img
          v-if="ikaft.logoUrl"
          :src="ikaft.logoUrl"
          alt="Logo IKAFT"
          class="w-20 h-20 object-contain"
        />
        <div v-else class="w-20 h-20 rounded-full bg-colorPrimary/10 flex items-center justify-center">
          <Users class="w-10 h-10 text-colorPrimary" />
        </div>
        <p class="font-sora font-bold text-text text-sm">IKAFT Universitas Pasundan</p>
        <p class="text-desc text-xs flex items-center gap-1.5">
          <Phone class="w-3.5 h-3.5 shrink-0" />
          {{ ikaft.kontak }}
        </p>
      </div>

      <div class="sm:col-span-2 flex flex-col gap-4">
        <div class="bg-netral rounded-xl border border-outline p-5">
          <p class="text-text text-sm font-semibold mb-2">Deskripsi</p>
          <p class="text-desc text-sm leading-relaxed">{{ ikaft.deskripsi }}</p>
        </div>
        <div class="bg-netral rounded-xl border border-outline p-5">
          <p class="text-text text-sm font-semibold mb-2">Struktur Pengurus</p>
          <p class="text-desc text-sm leading-relaxed whitespace-pre-line">{{ ikaft.strukturPengurus }}</p>
        </div>
      </div>
    </div>
  </div>
</template>