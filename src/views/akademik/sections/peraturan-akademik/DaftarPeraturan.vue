<script setup lang="ts">
import { ref } from 'vue';
import { ChevronDown } from 'lucide-vue-next';

const peraturan = [
  { title: 'Skripsi dan Tugas Akhir', desc: 'Ketentuan penyusunan, pembimbingan, dan sidang skripsi/tugas akhir.' },
  { title: 'Kerja Praktik dan Magang', desc: 'Ketentuan pelaksanaan kerja praktik dan program magang mahasiswa.' },
  { title: 'Mata Kuliah Kampus Berdampak', desc: 'Ketentuan pengakuan sks kegiatan MBKM di luar kampus.' },
  { title: 'Perkuliahan dan Evaluasi', desc: 'Ketentuan kehadiran, evaluasi, dan penilaian perkuliahan.' },
  { title: 'Kemajuan Studi', desc: 'Ketentuan evaluasi kemajuan studi mahasiswa tiap semester.' },
  { title: 'Yudisium dan Kelulusan', desc: 'Ketentuan syarat dan prosedur yudisium serta kelulusan.' },
];

const openIndex = ref<number | null>(null);

const toggle = (index: number) => {
  openIndex.value = openIndex.value === index ? null : index;
};
</script>

<template>
  <section id="peraturan" class="bg-netral scroll-mt-24 pb-16 lg:pb-24">
    <div class="max-w-7xl mx-auto px-4 lg:px-8">
      <div class="bg-white border border-outline rounded-xl p-5">
        <h2 class="font-sora font-bold text-text mb-4">Daftar Peraturan Akademik</h2>

        <div class="flex flex-col divide-y divide-outline">
          <div v-for="(item, index) in peraturan" :key="item.title">
            <button
              class="w-full flex items-center gap-3 py-3.5 text-left"
              @click="toggle(index)"
            >
              <span class="w-6 h-6 rounded-full bg-colorPrimary/10 text-colorPrimary text-xs font-bold flex items-center justify-center shrink-0">
                {{ index + 1 }}
              </span>
              <span class="flex-1 text-text text-sm font-semibold">{{ item.title }}</span>
              <ChevronDown
                class="w-4 h-4 text-colorPrimary shrink-0 transition-transform duration-300"
                :class="{ 'rotate-180': openIndex === index }"
              />
            </button>
            <div v-show="openIndex === index" class="pb-3.5 pl-9">
              <p class="text-desc text-sm leading-relaxed">{{ item.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>