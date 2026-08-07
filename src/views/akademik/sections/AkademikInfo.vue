<script setup lang="ts">
import { FileText, Download } from "lucide-vue-next";
import SectionLayout from "@/layouts/SectionLayout.vue";

const props = defineProps<{
  pengumuman: any;
  kalender: any;
  dokumen: any;
}>();
</script>

<template>
  <SectionLayout>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div class="bg-white rounded-xl border border-outline p-6 flex flex-col">
        <div class="flex items-center justify-between mb-5">
          <h3 class="font-sora font-bold text-text text-[1.125rem]">Pengumuman Terbaru</h3>
          <!-- <router-link
            to="/akademik/pengumuman"
            class="inline-flex items-center gap-1 text-colorPrimary font-semibold text-[0.875rem] hover:opacity-80 whitespace-nowrap"
          >
            Lihat Semua
            <i class="pi pi-arrow-right text-[0.75rem]"></i>
          </router-link> -->
        </div>

        <div class="flex-1 divide-y divide-outline">
          <div
            v-for="item in props.pengumuman"
            :key="item.id"
            class="flex gap-4 py-4 first:pt-0"
          >
            <div class="flex flex-col items-center leading-none shrink-0 w-10">
              <span class="text-colorPrimary font-sora font-bold text-[1.125rem]">{{ new Date(item.tanggal_publikasi).getDate().toString().padStart(2, '0') }}</span>
              <span class="text-colorPrimary text-[0.75rem] font-semibold">{{ new Date(item.tanggal_publikasi).toLocaleString('id-ID', { month: 'short' }).toUpperCase() }}</span>
            </div>
            <div>
              <p class="text-text text-[0.875rem] font-semibold leading-snug mb-1">
                {{ item.judul }}
              </p>
              <p class="text-desc text-[0.75rem]">
                {{ item.kategori.charAt(0).toUpperCase() + item.kategori.slice(1) }} &nbsp;|&nbsp; {{ new Date(item.tanggal_publikasi).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) }}
              </p>
            </div>
          </div>

          <div
            v-if="!props.pengumuman || props.pengumuman.length === 0"
            class="flex flex-col items-center justify-center text-center py-8"
          >
            <div class="w-12 h-12 rounded-lg bg-colorPrimary/10 flex items-center justify-center mb-3">
              <i class="pi pi-megaphone text-colorPrimary text-[1.25rem]"></i>
            </div>
            <p class="text-text text-[0.875rem] font-semibold mb-1">Belum Ada Pengumuman</p>
            <p class="text-desc text-[0.75rem]">Pengumuman terbaru akan muncul di sini</p>
          </div>
        </div>

        <!-- <router-link
          to="/akademik/pengumuman"
          class="inline-flex items-center gap-1 text-colorPrimary font-semibold text-[0.875rem] hover:opacity-80 mt-4 pt-4 border-t border-outline"
        >
          Lihat Semua Pengumuman
          <i class="pi pi-arrow-right text-[0.75rem]"></i>
        </router-link> -->
      </div>

      <div class="bg-white rounded-xl border border-outline p-6 flex flex-col">
        <div class="flex items-center justify-between mb-5">
          <h3 class="font-sora font-bold text-text text-[1.125rem]">Kalender Akademik</h3>
          <!-- <router-link
            to="/akademik/kalender"
            class="inline-flex items-center gap-1 text-colorPrimary font-semibold text-[0.875rem] hover:opacity-80 whitespace-nowrap"
          >
            Lihat Kalender Lengkap
            <i class="pi pi-arrow-right text-[0.75rem]"></i>
          </router-link> -->
        </div>

        <div class="flex-1 divide-y divide-outline">
          <div
            v-for="item in props.kalender"
            :key="item.title"
            class="flex gap-3 py-4 first:pt-0"
          >
            <div
              class="w-9 h-9 rounded-lg bg-colorPrimary/10 flex items-center justify-center shrink-0"
            >
              <i class="pi pi-calendar text-colorPrimary text-[0.875rem]"></i>
            </div>
            <div>
              <p class="text-text text-[0.875rem] font-semibold leading-snug mb-1">
                {{ item.title }}
              </p>
              <p class="text-desc text-[0.75rem]">
                {{ item.tanggal }}
              </p>
            </div>
          </div>

          <div
            v-if="!props.kalender || props.kalender.length === 0"
            class="flex flex-col items-center justify-center text-center py-8"
          >
            <div class="w-12 h-12 rounded-lg bg-colorPrimary/10 flex items-center justify-center mb-3">
              <i class="pi pi-calendar text-colorPrimary text-[1.25rem]"></i>
            </div>
            <p class="text-text text-[0.875rem] font-semibold mb-1">Belum Ada Agenda</p>
            <p class="text-desc text-[0.75rem]">Kalender akademik akan muncul di sini</p>
          </div>
        </div>

        <!-- <button
          class="inline-flex items-center justify-center gap-2 bg-colorPrimary text-white font-semibold text-[0.875rem] px-4 py-2.5 rounded-lg hover:opacity-90 transition mt-4"
        >
          <Download class="w-4 h-4" />
          Unduh Kalender Akademik
        </button> -->
      </div>

      <div class="bg-white rounded-xl border border-outline p-6 flex flex-col">
        <div class="flex items-center justify-between mb-5">
          <h3 class="font-sora font-bold text-text text-[1.125rem]">Dokumen Terbaru</h3>
          <!-- <router-link
            to="/akademik/dokumen"
            class="inline-flex items-center gap-1 text-colorPrimary font-semibold text-[0.875rem] hover:opacity-80 whitespace-nowrap"
          >
            Lihat Semua
            <i class="pi pi-arrow-right text-[0.75rem]"></i>
          </router-link> -->
        </div>

        <div class="flex-1 divide-y divide-outline">
          <div
            v-for="item in props.dokumen"
            :key="item.id"
            class="flex gap-3 py-4 first:pt-0"
          >
            <FileText class="w-8 h-8 text-red-400 shrink-0" stroke-width="1.5" />
            <div>
              <p class="text-text text-[0.875rem] font-semibold leading-snug mb-1">
                {{ item.judul }}
              </p>
              <p class="text-desc text-[0.75rem]">
                PDF &nbsp;•&nbsp; {{ (item.file.split('/').pop()?.length || 0) > 0 ? '1.2 MB' : '1.2 MB' }}
              </p>
            </div>
          </div>

          <div
            v-if="!props.dokumen || props.dokumen.length === 0"
            class="flex flex-col items-center justify-center text-center py-8"
          >
            <div class="w-12 h-12 rounded-lg bg-colorPrimary/10 flex items-center justify-center mb-3">
              <FileText class="w-6 h-6 text-colorPrimary" stroke-width="1.5" />
            </div>
            <p class="text-text text-[0.875rem] font-semibold mb-1">Belum Ada Dokumen</p>
            <p class="text-desc text-[0.75rem]">Dokumen terbaru akan muncul di sini</p>
          </div>
        </div>

        <!-- <router-link
          to="/akademik/dokumen"
          class="inline-flex items-center gap-1 text-colorPrimary font-semibold text-[0.875rem] hover:opacity-80 mt-4 pt-4 border-t border-outline"
        >
          Lihat Semua Dokumen
          <i class="pi pi-arrow-right text-[0.75rem]"></i>
        </router-link> -->
      </div>
    </div>
  </SectionLayout>
</template>