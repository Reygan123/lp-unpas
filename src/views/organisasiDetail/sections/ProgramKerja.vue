<script setup lang="ts">
import { computed } from 'vue';
import { Users, GraduationCap, MonitorSmartphone, HeartHandshake, Lightbulb, Diamond, Rocket, MessagesSquare, ClipboardList } from 'lucide-vue-next';

const props = defineProps<{
  programKerja: Array<{
    kategori: string;
    namaProgram: string;
    deskripsi: string;
    tanggalPelaksanaan: string;
    status: string;
  }>;
  isLoading: boolean;
}>();

const iconMap: Record<string, any> = {
  pengembangan_organisasi: Users,
  kaderisasi: GraduationCap,
  keilmuan_keprofesian: MonitorSmartphone,
  pengabdian_masyarakat: HeartHandshake,
  minat_bakat: Lightbulb,
  kesejahteraan_mahasiswa: Diamond,
  kewirausahaan: Rocket,
  komunikasi_informasi: MessagesSquare,
};

const statusColor: Record<string, string> = {
  berjalan: 'bg-blue-100 text-blue-700',
  selesai: 'bg-green-100 text-green-700',
  rencana: 'bg-gray-100 text-gray-600',
};

const getIcon = (kategori: string) => iconMap[kategori] || ClipboardList;

const formatKategori = (kategori: string) => kategori ? kategori.replace(/_/g, ' ') : '-';
</script>

<template>
  <section id="program-kerja" class="scroll-mt-24 mt-10">
    <h2 class="font-sora font-bold text-colorPrimary mb-4">
      C. PROGRAM KERJA
    </h2>

    <div v-if="isLoading" class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
      <div v-for="n in 4" :key="n" class="bg-white rounded-xl border border-outline h-32 animate-pulse"></div>
    </div>

    <div v-else-if="programKerja.length === 0" class="bg-white rounded-xl border border-outline p-10 text-center mb-5">
      <p class="text-desc text-sm">Belum ada program kerja yang tersedia.</p>
    </div>

    <div v-else class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
      <div
        v-for="item in programKerja"
        :key="item.namaProgram"
        class="bg-white rounded-xl border border-outline p-4 flex flex-col items-center text-center gap-2"
      >
        <component :is="getIcon(item.kategori)" class="w-7 h-7 text-colorPrimary" stroke-width="1.5" />
        <p class="text-text text-xs font-semibold leading-snug">{{ item.namaProgram }}</p>
        <p class="text-desc text-[10px] capitalize">{{ formatKategori(item.kategori) }}</p>
        <span
          class="text-[10px] font-semibold px-2 py-0.5 rounded capitalize"
          :class="statusColor[item.status] || 'bg-gray-100 text-gray-600'"
        >
          {{ item.status }}
        </span>
      </div>
    </div>

    <!-- <div class="flex justify-center">
      <button class="inline-flex items-center gap-2 bg-white border border-outline text-text font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-netral transition">
        Lihat Semua Program Kerja
        <i class="pi pi-arrow-right text-xs"></i>
      </button>
    </div> -->
  </section>
</template>