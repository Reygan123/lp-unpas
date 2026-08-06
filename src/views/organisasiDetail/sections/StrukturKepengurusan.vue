<script setup lang="ts">
import { CalendarDays, Users2, ChevronRight } from 'lucide-vue-next';

defineProps<{
  periode: string;
  totalPengurus: string;
  pengurusInti: Array<{ foto: string; jabatan: string; nama: string }>;
}>();
</script>

<template>
  <section id="struktur" class="scroll-mt-24 mt-10">
    <h2 class="font-sora font-bold text-colorPrimary mb-4">
      B. STRUKTUR KEPENGURUSAN
    </h2>

    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      <div class="bg-netral rounded-xl border border-outline p-4 flex flex-col items-center justify-center text-center gap-3">
        <CalendarDays class="w-6 h-6 text-colorPrimary" stroke-width="1.5" />
        <div>
          <p class="text-desc text-xs">Periode Kepengurusan</p>
          <p class="text-text font-sora font-bold text-sm">{{ periode }}</p>
        </div>
        <Users2 class="w-6 h-6 text-colorPrimary" stroke-width="1.5" />
        <div>
          <p class="text-desc text-xs">Total Pengurus</p>
          <p class="text-text font-sora font-bold text-sm">{{ totalPengurus }}</p>
        </div>
      </div>

      <div
        v-for="item in pengurusInti"
        :key="item.nama"
        class="bg-white rounded-xl border border-outline overflow-hidden flex flex-col"
      >
        <img :src="item.foto" :alt="item.nama" class="w-full aspect-square object-cover" />
        <div class="p-3 text-center">
          <span class="inline-block bg-colorPrimary text-white text-[10px] font-semibold px-2 py-0.5 rounded mb-1.5">
            {{ item.jabatan }}
          </span>
          <p class="text-text text-sm font-semibold">{{ item.nama }}</p>
        </div>
      </div>

      <button class="bg-white rounded-xl border border-outline p-4 flex flex-col items-center justify-center text-center gap-2 hover:bg-netral transition">
        <Users2 class="w-6 h-6 text-colorPrimary" stroke-width="1.5" />
        <p class="text-text text-xs font-semibold">Kepala Bidang / Departemen</p>
        <p class="text-colorPrimary text-xs font-semibold inline-flex items-center gap-1">
          Lihat Selengkapnya
          <ChevronRight class="w-3.5 h-3.5" />
        </p>
      </button>
    </div>
  </section>
</template>