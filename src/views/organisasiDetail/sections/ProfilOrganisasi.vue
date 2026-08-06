<script setup lang="ts">
import { Eye, Target, Flag, Gem, Globe2 } from 'lucide-vue-next';

const profil = [
  { icon: Eye, title: 'Visi', desc: 'Menjadi organisasi mahasiswa yang unggul, profesional, dan berdampak dalam bidang teknik industri.' },
  { icon: Target, title: 'Misi', desc: 'Mewadahi potensi mahasiswa, mengembangkan kompetensi, serta berkontribusi bagi masyarakat.' },
  { icon: Flag, title: 'Tujuan', desc: 'Membentuk mahasiswa teknik industri yang berintegritas, inovatif, dan siap bersaing di tingkat nasional dan global.' },
  { icon: Gem, title: 'Nilai Organisasi', list: ['Integritas', 'Profesionalisme', 'Kolaborasi', 'Inovasi', 'Kepedulian'] },
  { icon: Globe2, title: 'Ruang Lingkup Kegiatan', desc: 'Kegiatan organisasi mencakup bidang keilmuan, pengembangan diri, sosial, kewirausahaan, dan minat bakat mahasiswa.' },
];
</script>

<template>
  <section id="profil" class="scroll-mt-24">
    <h2 class="font-sora font-bold text-colorPrimary mb-4">
      A. PROFIL ORGANISASI
    </h2>

    <div class="grid grid-cols-2 lg:grid-cols-5 gap-4">
      <div
        v-for="item in profil"
        :key="item.title"
        class="bg-white rounded-xl border border-outline p-5 flex flex-col items-center text-center gap-3"
      >
        <component :is="item.icon" class="w-8 h-8 text-colorPrimary" stroke-width="1.5" />
        <p class="font-sora font-bold text-text text-sm">{{ item.title }}</p>
        <ul v-if="item.list" class="text-desc text-xs leading-relaxed text-left w-full list-disc list-inside">
          <li v-for="l in item.list" :key="l">{{ l }}</li>
        </ul>
        <p v-else class="text-desc text-xs leading-relaxed">{{ item.desc }}</p>
      </div>
    </div>
  </section>
</template>