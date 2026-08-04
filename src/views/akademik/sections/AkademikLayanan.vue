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

const layanan = [
  {
    icon: MonitorSmartphone,
    title: "SITU 2.0",
    desc: "Portal Sistem Akademik",
    domain: "situ2.unpas.ac.id",
    url: "https://situ2.unpas.ac.id",
  },
  {
    icon: Code2,
    title: "UNPAS Dev",
    desc: "Portal Sistem Pendukung Akademik",
    domain: "unpas.dev",
    url: "https://unpas.dev",
  },
  {
    icon: Briefcase,
    title: "Portal TA & KP",
    desc: "Tugas Akhir & Kerja Praktik",
    domain: "",
    url: "#",
  },
  {
    icon: BookOpen,
    title: "Edlink",
    desc: "Learning Management System",
    domain: "edlink.id",
    url: "https://edlink.id",
  },
  {
    icon: Wifi,
    title: "PJJ Pasundan",
    desc: "Pembelajaran Jarak Jauh",
    domain: "",
    url: "#",
  },
  {
    icon: FileText,
    title: "iOffice Unpas",
    desc: "Pengurusan Surat",
    domain: "unpas.inoffice.id",
    url: "https://unpas.inoffice.id",
  },
  {
    icon: BadgeCheck,
    title: "Portal Legalisir",
    desc: "Legalisir Ijazah & Transkrip",
    domain: "",
    url: "#",
  },
];
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
        :key="item.title"
        class="bg-white rounded-xl border border-outline p-5 flex flex-col items-center text-center"
      >
        <div
          class="w-14 h-14 rounded-full bg-colorPrimary flex items-center justify-center mb-4"
        >
          <component :is="item.icon" class="w-7 h-7 text-white" stroke-width="1.5" />
        </div>
        <h3 class="font-sora font-bold text-text text-sm mb-1">
          {{ item.title }}
        </h3>
        <p class="text-desc text-xs leading-relaxed mb-1">
          {{ item.desc }}
        </p>
        <p v-if="item.domain" class="text-colorPrimary text-xs font-medium mb-4">
          {{ item.domain }}
        </p>
        <p v-else class="mb-4"></p>

        <a
          :href="item.url"
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
