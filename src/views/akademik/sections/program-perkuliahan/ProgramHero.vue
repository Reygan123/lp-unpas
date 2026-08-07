<script setup lang="ts">
import { Building2, Repeat, Wifi, Rocket, Calendar, FileSearch, Wallet, CreditCard, HelpCircle, Download } from 'lucide-vue-next';
import SectionLayout from '@/layouts/SectionLayout.vue';
import { useProgramStore } from '@/stores/program.ts';
import { computed } from 'vue';

const programStore = useProgramStore();

const tipe = computed(() => {
  return programStore.program.map((item: any) => {
    let icon = Building2;
    const name = item.nama.toLowerCase();
    if (name.includes('hybrid')) icon = Repeat;
    else if (name.includes('pjj') || name.includes('daring')) icon = Wifi;
    else if (name.includes('fastrack') || name.includes('magister')) icon = Rocket;
    return {
      icon,
      name: item.nama,
      desc: item.ringkasan ? item.ringkasan.substring(0, 40) + '...' : 'Program perkuliahan',
      slug: item.slug
    };
  });
});

const infoCepat = [
  { icon: Calendar, label: 'Kalender Akademik', to: '/akademik/kalender' },
  { icon: FileSearch, label: 'Pendaftaran PMB', to: 'https://pmb.unpas.ac.id/' },
  { icon: Wallet, label: 'Beasiswa', to: '/akademik/beasiswa' },
  { icon: CreditCard, label: 'Biaya Pendidikan', to: '/akademik/biaya-pendidikan' },
  { icon: HelpCircle, label: 'FAQ', to: '#faq' },
];

const unduhan = [
  { title: 'Panduan Biaya Pendidikan 2024', ukuran: '2.1 MB' },
  { title: 'Skema Program Perkuliahan', ukuran: '1.4 MB' },
  { title: 'Pedoman UKT', ukuran: '980 KB' },
  { title: 'Brosur Fakultas Teknik', ukuran: '3.2 MB' },
];
</script>

<template>
  <SectionLayout>
      <nav class="text-sm text-desc mb-6">
        <router-link to="/" class="hover:text-colorPrimary">Beranda</router-link>
        <span class="mx-2">/</span>
        <router-link to="/akademik" class="hover:text-colorPrimary">Akademik</router-link>
        <span class="mx-2">/</span>
        <span class="text-text font-medium">Program Perkuliahan dan Biaya Pendidikan</span>
      </nav>

      <div class="grid lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2">
          <h1 class="font-sora text-3xl lg:text-4xl font-bold text-text leading-tight mb-4">
            Program Perkuliahan<br />
            dan Biaya Pendidikan
          </h1>
          <p class="text-desc leading-relaxed mb-8 max-w-2xl">
            Temukan berbagai skema program perkuliahan yang fleksibel sesuai kebutuhan Anda
            beserta estimasi biaya pendidikan untuk setiap program di Fakultas Teknik
            Universitas Pasundan.
          </p>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div
              v-for="item in tipe"
              :key="item.name"
              class="bg-white rounded-xl border border-outline p-4 text-center"
            >
              <div class="w-12 h-12 rounded-full bg-colorPrimary/10 flex items-center justify-center mx-auto mb-3">
                <component :is="item.icon" class="w-6 h-6 text-colorPrimary" stroke-width="1.5" />
              </div>
              <p class="font-sora font-bold text-text text-sm mb-1">{{ item.name }}</p>
              <p class="text-desc text-xs leading-snug">{{ item.desc }}</p>
            </div>
          </div>

          <div
            v-if="!tipe || tipe.length === 0"
            class="flex flex-col items-center justify-center text-center py-12 bg-white rounded-xl border border-outline"
          >
            <div class="w-12 h-12 rounded-full bg-colorPrimary/10 flex items-center justify-center mb-3">
              <Building2 class="w-6 h-6 text-colorPrimary" stroke-width="1.5" />
            </div>
            <p class="font-sora font-bold text-text text-sm mb-1">Belum Ada Program Perkuliahan</p>
            <p class="text-desc text-xs">Program perkuliahan akan muncul di sini</p>
          </div>
        </div>

        <div class="flex flex-col gap-6">
          <div class="bg-white rounded-xl border border-outline p-5">
            <h3 class="font-sora font-bold text-text mb-4">Informasi Cepat</h3>
            <ul class="flex flex-col divide-y divide-outline">
              <li v-for="item in infoCepat" :key="item.label">
                <a
                  :href="item.to"
                  class="flex items-center gap-3 py-2.5 text-sm text-text hover:text-colorPrimary transition"
                >
                  <component :is="item.icon" class="w-4 h-4 text-colorPrimary shrink-0" />
                  {{ item.label }}
                </a>
              </li>
            </ul>

            <div
              v-if="!infoCepat || infoCepat.length === 0"
              class="flex flex-col items-center justify-center text-center py-6"
            >
              <HelpCircle class="w-6 h-6 text-colorPrimary mb-2" stroke-width="1.5" />
              <p class="text-desc text-xs">Belum ada informasi cepat</p>
            </div>
          </div>

          <div class="bg-white rounded-xl border border-outline p-5">
            <h3 class="font-sora font-bold text-text mb-4">Unduhan Populer</h3>
            <ul class="flex flex-col divide-y divide-outline">
              <li v-for="item in unduhan" :key="item.title" class="flex items-center justify-between gap-3 py-2.5">
                <div>
                  <p class="text-text text-sm font-medium leading-snug">{{ item.title }}</p>
                  <p class="text-desc text-xs">{{ item.ukuran }}</p>
                </div>
                <Download class="w-4 h-4 text-colorPrimary shrink-0" />
              </li>
            </ul>

            <div
              v-if="!unduhan || unduhan.length === 0"
              class="flex flex-col items-center justify-center text-center py-6"
            >
              <Download class="w-6 h-6 text-colorPrimary mb-2" stroke-width="1.5" />
              <p class="text-desc text-xs">Belum ada unduhan populer</p>
            </div>
          </div>
        </div>
      </div>
  </SectionLayout>
</template>