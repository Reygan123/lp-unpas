<script setup lang="ts">
import { ref } from "vue";
import { ChevronLeft, ChevronRight, Download, CalendarPlus } from "lucide-vue-next";

const activeTab = ref("bulanan");
const activeDate = ref(20);

const days = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

const weeks = [
  [27, 28, 29, 30, 1, 2, 3],
  [4, 5, 6, 7, 8, 9, 10],
  [11, 12, 13, 14, 15, 16, 17],
  [18, 19, 20, 21, 22, 23, 24],
  [25, 26, 27, 28, 29, 30, 31],
];

const isOutside = (week: number[], day: number) => {
  return (week === weeks[0] && day > 20) || (week === weeks[4] && day < 20);
};

const legend = [
  { label: "Registrasi", color: "bg-blue-500" },
  { label: "Perwalian", color: "bg-pink-500" },
  { label: "Awal Perkuliahan", color: "bg-green-500" },
  { label: "Kerja Praktik", color: "bg-teal-500" },
  { label: "UTS", color: "bg-orange-500" },
  { label: "Tugas Akhir", color: "bg-purple-500" },
  { label: "Yudisium", color: "bg-indigo-500" },
  { label: "Wisuda", color: "bg-yellow-500" },
  { label: "UAS", color: "bg-red-500" },
  { label: "Batas Input Nilai", color: "bg-amber-700" },
  { label: "Libur Akademik", color: "bg-gray-400" },
];
</script>

<template>
  <div class="bg-white border border-outline rounded-xl p-5 flex flex-col h-full w-full">
    <div class="flex items-center gap-6 mb-4 border-b border-outline">
      <button
        class="pb-3 text-sm font-semibold border-b-2 transition"
        :class="
          activeTab === 'bulanan'
            ? 'text-colorPrimary border-colorPrimary'
            : 'text-desc border-transparent'
        "
        @click="activeTab = 'bulanan'"
      >
        Kalender Bulanan
      </button>
      <button
        class="pb-3 text-sm font-semibold border-b-2 transition"
        :class="
          activeTab === 'agenda'
            ? 'text-colorPrimary border-colorPrimary'
            : 'text-desc border-transparent'
        "
        @click="activeTab = 'agenda'"
      >
        Daftar Agenda
      </button>
    </div>

    <div v-if="activeTab === 'bulanan'">
      <div class="flex items-center justify-between mb-4">
        <button class="text-desc hover:text-colorPrimary">
          <ChevronLeft class="w-4 h-4" />
        </button>
        <p class="font-sora font-bold text-text text-sm">Mei 2026</p>
        <button class="text-desc hover:text-colorPrimary">
          <ChevronRight class="w-4 h-4" />
        </button>
      </div>

      <div class="grid grid-cols-7 text-center text-xs text-desc mb-2">
        <span v-for="d in days" :key="d">{{ d }}</span>
      </div>

      <div class="flex flex-col gap-1 mb-5">
        <div
          v-for="(week, wIndex) in weeks"
          :key="wIndex"
          class="grid grid-cols-7 text-center"
        >
          <button
            v-for="(day, dIndex) in week"
            :key="dIndex"
            class="text-xs py-1.5 rounded-full"
            :class="[
              isOutside(week, day) ? 'text-desc/40' : 'text-text',
              day === activeDate && !isOutside(week, day)
                ? 'bg-colorPrimary text-white font-semibold'
                : '',
            ]"
            @click="activeDate = day"
          >
            {{ day }}
          </button>
        </div>
      </div>

      <p class="text-text text-xs font-semibold mb-2">Keterangan Agenda</p>
      <div class="grid grid-cols-2 gap-x-2 gap-y-1.5 mb-5">
        <div v-for="item in legend" :key="item.label" class="flex items-center gap-1.5">
          <span class="w-2 h-2 rounded-full shrink-0" :class="item.color"></span>
          <span class="text-desc text-[11px]">{{ item.label }}</span>
        </div>
      </div>
    </div>

    <div v-else class="flex-1 flex items-center justify-center py-10">
      <p class="text-desc text-sm">Daftar agenda akan ditampilkan di sini.</p>
    </div>

    <div class="mt-auto flex flex-col gap-2">
      <button
        class="inline-flex items-center justify-center gap-2 bg-colorPrimary text-white font-semibold text-sm px-4 py-2.5 rounded-lg hover:opacity-90 transition"
      >
        <Download class="w-4 h-4" />
        Unduh Kalender Akademik
      </button>
      <button
        class="inline-flex items-center justify-center gap-2 bg-white text-text font-semibold text-sm px-4 py-2.5 rounded-lg border border-outline hover:bg-netral transition"
      >
        <CalendarPlus class="w-4 h-4" />
        Tambah ke Google Calendar
      </button>
    </div>
  </div>
</template>