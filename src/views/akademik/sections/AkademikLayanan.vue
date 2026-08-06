<script setup lang="ts">
import {
  MonitorSmartphone,
  Code2,
  Briefcase,
  BookOpen,
  Wifi,
  FileText,
  BadgeCheck,
  ExternalLink,
} from "lucide-vue-next";
import SectionLayout from "@/layouts/SectionLayout.vue";

const props = defineProps<{
  layanan: any;
  isLoading: boolean;
}>();
</script>

<template>
  <SectionLayout>
    <div class="flex items-center justify-between mb-8">
      <h2
        class="font-sora text-xl lg:text-2xl font-bold text-text border-l-4 border-colorPrimary pl-3"
      >
        Layanan Akademik dan Administrasi
      </h2>
      <router-link
        to="/akademik/layanan"
        class="inline-flex items-center gap-1 text-colorPrimary font-semibold text-sm hover:opacity-80 whitespace-nowrap"
      >
        Lihat Semua Layanan
        <i class="pi pi-arrow-right text-xs"></i>
      </router-link>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
      <div
        v-for="item in layanan"
        :key="item.nama_sistem"
        class="bg-white rounded-xl border border-outline p-5 flex flex-col items-center text-center"
      >
        <div
          class="w-14 h-14 rounded-full bg-colorPrimary flex items-center justify-center mb-4"
        >
          <MonitorSmartphone class="w-7 h-7 text-white" stroke-width="1.5" />
        </div>
        <h3 class="font-sora font-bold text-text text-sm mb-1">
          {{ item.nama_sistem }}
        </h3>
        <p class="text-desc text-xs leading-relaxed mb-1">
          {{ item.deskripsi }}
        </p>
        <p class="mb-4"></p>

        <a
          :href="item.alamat_url"
          target="_blank"
          rel="noopener"
          class="mt-auto inline-flex items-center gap-2 bg-colorPrimary text-white font-semibold text-xs px-4 py-2 rounded-lg hover:opacity-90 transition"
        >
          Buka Portal
          <ExternalLink class="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  </SectionLayout>
</template>