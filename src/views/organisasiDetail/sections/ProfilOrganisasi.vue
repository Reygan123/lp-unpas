<script setup lang="ts">
import { Eye, Target, Flag, Gem, Globe2 } from 'lucide-vue-next';
import { computed } from 'vue';

const props = defineProps<{
  ormawa: {
    visi: string;
    misi: string;
    tujuan: string;
    nilaiOrganisasi: string;
    ruangLingkup: string;
  };
  isLoading: boolean;
}>();

const profil = computed(() => [
  { icon: Eye, title: 'Visi', desc: props.ormawa.visi || '-' },
  { icon: Target, title: 'Misi', desc: props.ormawa.misi || '-' },
  { icon: Flag, title: 'Tujuan', desc: props.ormawa.tujuan || '-' },
  { icon: Gem, title: 'Nilai Organisasi', desc: props.ormawa.nilaiOrganisasi || '-' },
  { icon: Globe2, title: 'Ruang Lingkup Kegiatan', desc: props.ormawa.ruangLingkup || '-' },
]);
</script>

<template>
  <section id="profil" class="scroll-mt-24">
    <h2 class="font-sora font-bold text-colorPrimary mb-4">
      A. PROFIL ORGANISASI
    </h2>

    <div v-if="isLoading" class="grid grid-cols-2 lg:grid-cols-5 gap-4">
      <div v-for="n in 5" :key="n" class="bg-white rounded-xl border border-outline p-5 h-40 animate-pulse"></div>
    </div>

    <div v-else class="grid grid-cols-2 lg:grid-cols-5 gap-4">
      <div
        v-for="item in profil"
        :key="item.title"
        class="bg-white rounded-xl border border-outline p-5 flex flex-col items-center text-center gap-3"
      >
        <component :is="item.icon" class="w-8 h-8 text-colorPrimary" stroke-width="1.5" />
        <p class="font-sora font-bold text-text text-sm">{{ item.title }}</p>
        <p class="text-desc text-xs leading-relaxed">{{ item.desc }}</p>
      </div>
    </div>
  </section>
</template>