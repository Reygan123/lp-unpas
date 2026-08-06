<script setup lang="ts">
import { ref } from "vue";
import { ChevronDown } from "lucide-vue-next";
import SectionLayout from "@/layouts/SectionLayout.vue";

const faqs = [
  {
    q: "Apakah biaya pendidikan sudah termasuk biaya praktikum dan laboratorium?",
    a:
      "Biaya pendidikan yang tercantum merupakan estimasi UKT per semester dan belum termasuk biaya praktikum, laboratorium, atau kegiatan penunjang akademik lainnya yang diinformasikan tersendiri oleh program studi.",
  },
  {
    q: "Bisakah saya berpindah program dari Reguler ke Hybrid atau PJJ?",
    a:
      "Mahasiswa dapat mengajukan perpindahan skema program perkuliahan dengan mengikuti prosedur akademik yang berlaku dan persetujuan dari program studi terkait.",
  },
  {
    q: "Bagaimana teknis perkuliahan di program Fastrack Sarjana-Magister?",
    a:
      "Program Fastrack memungkinkan mahasiswa mengambil sejumlah mata kuliah magister sejak masa sarjana sesuai ketentuan akademik, sehingga masa studi S1 dan S2 dapat ditempuh lebih efisien.",
  },
];

const openIndex = ref<number | null>(null);

const toggle = (index: number) => {
  openIndex.value = openIndex.value === index ? null : index;
};
</script>

<template>
  <SectionLayout id="faq">
    <h2
      class="font-sora text-xl lg:text-2xl font-bold text-text border-l-4 border-colorPrimary pl-3 mb-6"
    >
      FAQ
    </h2>

    <div class="bg-white rounded-xl border border-outline divide-y divide-outline">
      <div v-for="(item, index) in faqs" :key="item.q">
        <button
          class="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
          @click="toggle(index)"
        >
          <span class="text-text text-sm font-semibold">{{ item.q }}</span>
          <ChevronDown
            class="w-4 h-4 text-colorPrimary shrink-0 transition-transform duration-300"
            :class="{ 'rotate-180': openIndex === index }"
          />
        </button>
        <div v-show="openIndex === index" class="px-5 pb-4">
          <p class="text-desc text-sm leading-relaxed">{{ item.a }}</p>
        </div>
      </div>
    </div>
  </SectionLayout>
</template>
