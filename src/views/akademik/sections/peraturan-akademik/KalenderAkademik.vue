<script setup lang="ts">
import { ref, computed } from "vue";
import { ChevronLeft, ChevronRight, Download, CalendarPlus } from "lucide-vue-next";

const props = defineProps<{
  calendar: any[];
  isLoading: boolean;
}>();

const activeTab = ref("bulanan");
const currentDate = ref(new Date());
const activeDate = ref<string | null>(null);

const days = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

const categoryColors = ["bg-blue-500", "bg-pink-500", "bg-green-500", "bg-teal-500", "bg-orange-500", "bg-purple-500", "bg-indigo-500", "bg-yellow-500", "bg-red-500", "bg-amber-700", "bg-gray-400"];

const events = computed(() => props.calendar || []);

const legend = computed(() => {
  const uniqueCategories = Array.from(new Set(events.value.map((item: any) => item.category).filter(Boolean)));
  return uniqueCategories.map((label, index) => ({
    label,
    color: categoryColors[index % categoryColors.length],
  }));
});

const categoryColorMap = computed(() => {
  const map: Record<string, string> = {};
  legend.value.forEach((item) => {
    map[item.label] = item.color;
  });
  return map;
});

const monthLabel = computed(() => {
  return currentDate.value.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
});

const toDateKey = (date: Date) => {
  return date.toISOString().slice(0, 10);
};

const eventsByDate = computed(() => {
  const map: Record<string, any[]> = {};
  events.value.forEach((item: any) => {
    const start = new Date(item.start_date);
    const end = new Date(item.end_date || item.start_date);
    const cursor = new Date(start.getFullYear(), start.getMonth(), start.getDate());
    const endDay = new Date(end.getFullYear(), end.getMonth(), end.getDate());
    while (cursor <= endDay) {
      const key = toDateKey(cursor);
      if (!map[key]) map[key] = [];
      map[key].push(item);
      cursor.setDate(cursor.getDate() + 1);
    }
  });
  return map;
});

const weeks = computed(() => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startOffset = (firstDay.getDay() + 6) % 7;

  const days: { day: number; date: Date; isOutside: boolean }[] = [];

  for (let i = startOffset; i > 0; i--) {
    const date = new Date(year, month, 1 - i);
    days.push({ day: date.getDate(), date, isOutside: true });
  }

  for (let d = 1; d <= lastDay.getDate(); d++) {
    const date = new Date(year, month, d);
    days.push({ day: d, date, isOutside: false });
  }

  const remainder = days.length % 7;
  if (remainder !== 0) {
    const extra = 7 - remainder;
    for (let i = 1; i <= extra; i++) {
      const date = new Date(year, month + 1, i);
      days.push({ day: date.getDate(), date, isOutside: true });
    }
  }

  const result = [];
  for (let i = 0; i < days.length; i += 7) {
    result.push(days.slice(i, i + 7));
  }
  return result;
});

const prevMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1);
};

const nextMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1);
};

const selectDate = (date: Date) => {
  activeDate.value = toDateKey(date);
};

const sortedAgenda = computed(() => {
  return [...events.value].sort((a: any, b: any) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime());
});

const formatAgendaDate = (item: any) => {
  const start = new Date(item.start_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  const end = new Date(item.end_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  return start === end ? start : `${start} - ${end}`;
};
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
        <button class="text-desc hover:text-colorPrimary" @click="prevMonth">
          <ChevronLeft class="w-4 h-4" />
        </button>
        <p class="font-sora font-bold text-text text-sm capitalize">{{ monthLabel }}</p>
        <button class="text-desc hover:text-colorPrimary" @click="nextMonth">
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
            v-for="(item, dIndex) in week"
            :key="dIndex"
            class="relative text-xs py-1.5 rounded-full"
            :class="[
              item.isOutside ? 'text-desc/40' : 'text-text',
              activeDate === item.date.toISOString().slice(0, 10) && !item.isOutside
                ? 'bg-colorPrimary text-white font-semibold'
                : '',
            ]"
            @click="selectDate(item.date)"
          >
            {{ item.day }}
            <span
              v-if="eventsByDate[item.date.toISOString().slice(0, 10)]"
              class="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
              :class="categoryColorMap[eventsByDate[item.date.toISOString().slice(0, 10)][0].category] || 'bg-colorPrimary'"
            ></span>
          </button>
        </div>
      </div>

      <p class="text-text text-xs font-semibold mb-2">Keterangan Agenda</p>
      <div v-if="legend.length > 0" class="grid grid-cols-2 gap-x-2 gap-y-1.5 mb-5">
        <div v-for="item in legend" :key="item.label" class="flex items-center gap-1.5">
          <span class="w-2 h-2 rounded-full shrink-0" :class="item.color"></span>
          <span class="text-desc text-[11px]">{{ item.label }}</span>
        </div>
      </div>
      <p v-else class="text-desc text-xs mb-5">Belum ada kategori agenda.</p>
    </div>

    <div v-else class="flex-1 flex flex-col gap-3 py-2">
      <div v-if="isLoading" class="flex-1 flex items-center justify-center py-10">
        <p class="text-desc text-sm">Memuat agenda...</p>
      </div>
      <div v-else-if="sortedAgenda.length === 0" class="flex-1 flex items-center justify-center py-10">
        <p class="text-desc text-sm">Belum ada agenda yang tersedia.</p>
      </div>
      <div v-else class="flex flex-col divide-y divide-outline">
        <div v-for="item in sortedAgenda" :key="item.id" class="py-3 first:pt-0">
          <p class="text-text text-sm font-semibold leading-snug mb-1">{{ item.title }}</p>
          <p class="text-desc text-xs mb-1">{{ formatAgendaDate(item) }}</p>
          <p class="text-desc text-xs">{{ item.category }} &nbsp;|&nbsp; {{ item.location }}</p>
        </div>
      </div>
    </div>
  </div>
</template>