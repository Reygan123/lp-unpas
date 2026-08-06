<script setup lang="ts">
import { computed } from "vue";
import { Building2, Repeat, Wifi, Rocket, Check, GraduationCap } from "lucide-vue-next";
import SectionLayout from "@/layouts/SectionLayout.vue";

const props = defineProps<{
  programs?: any;
}>();

const iconMap: Record<string, any> = {
  reguler: Building2,
  hybrid: Repeat,
  pjj: Wifi,
  fastrack: Rocket,
};

const getIcon = (slug: string) => {
  const key = Object.keys(iconMap).find((k) => slug?.includes(k));
  return key ? iconMap[key] : GraduationCap;
};

const parseList = (value: string | null) => {
  if (!value) return [];
  return value
    .split(/\r?\n/)
    .map((line) => line.replace(/^\d+\.\s*/, "").trim())
    .filter((line) => line.length > 0);
};

const programs = computed(() => {
  return (props.programs || []).map((item: any) => ({
    icon: getIcon(item.slug),
    name: item.nama,
    desc: item.ringkasan,
    keunggulan: parseList(item.keunggulan),
    durasi: item.durasi || "-",
    mode: item.bentuk_pembelajaran,
    biaya: item.biaya,
    label: "Estimasi Biaya / Semester",
  }));
});
</script>

<template>
  <SectionLayout>
    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        v-for="item in programs"
        :key="item.name"
        class="bg-white rounded-xl border border-outline p-6 flex flex-col"
      >
        <div
          class="w-11 h-11 rounded-lg bg-colorPrimary/10 flex items-center justify-center mb-4"
        >
          <component
            :is="item.icon"
            class="w-6 h-6 text-colorPrimary"
            stroke-width="1.5"
          />
        </div>
        <h3 class="font-sora font-bold text-text mb-2">{{ item.name }}</h3>
        <p class="text-desc text-sm leading-relaxed mb-4">{{ item.desc }}</p>

        <p class="text-text text-xs font-semibold mb-2">Keunggulan</p>
        <ul class="flex flex-col gap-1.5 mb-4">
          <li
            v-for="k in item.keunggulan"
            :key="k"
            class="flex items-start gap-2 text-desc text-xs leading-snug"
          >
            <Check class="w-3.5 h-3.5 text-colorPrimary shrink-0 mt-0.5" />
            {{ k }}
          </li>
        </ul>

        <div class="grid grid-cols-2 gap-3 text-xs mb-4">
          <div>
            <p class="text-desc mb-0.5">Durasi Studi</p>
            <p class="text-text font-semibold">{{ item.durasi }}</p>
          </div>
          <div>
            <p class="text-desc mb-0.5">Mode Belajar</p>
            <p class="text-text font-semibold">{{ item.mode }}</p>
          </div>
        </div>

        <div v-if="item.biaya" class="mt-auto pt-4 border-t border-outline">
          <p class="text-desc text-xs mb-1">{{ item.label }}</p>
          <p class="text-colorPrimary font-sora font-bold text-lg">{{ item.biaya }}</p>
        </div>
      </div>
    </div>
  </SectionLayout>
  <!-- <section class="bg-netral">
    <div class="max-w-7xl mx-auto px-4 lg:px-8 pb-8">

      <p class="text-desc text-xs mt-4">
        Catatan: Estimasi biaya dapat berubah mengikuti kebijakan universitas setiap tahun akademik.
      </p>
    </div>
  </section> -->
</template>
