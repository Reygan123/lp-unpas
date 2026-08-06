<script setup lang="ts">
import { computed } from 'vue';
import { LineChart } from 'lucide-vue-next';

const props = defineProps<{
  tracerStudyPartisipasi: any[];
  isLoading: boolean;
}>();

const data = computed(() => {
  return (props.tracerStudyPartisipasi || []).map((item: any) => ({
    ...item,
    persentase: item.jumlah_target > 0
      ? Math.round((item.jumlah_mengisi / item.jumlah_target) * 100)
      : 0,
    namaProdi: item.departement?.name,
  }));
});
</script>

<template>
  <div id="tracer-study" class="scroll-mt-24 bg-white border border-outline rounded-xl p-5">
    <h2 class="font-sora font-bold text-text mb-4">Partisipasi Tracer Study</h2>

    <div v-if="isLoading" class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="n in 4" :key="n" class="bg-netral rounded-xl animate-pulse h-24"></div>
    </div>

    <div v-else-if="data.length === 0" class="py-10 text-center">
      <p class="text-desc text-sm">Belum ada data partisipasi tracer study.</p>
    </div>

    <div v-else class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div
        v-for="item in data"
        :key="item.id"
        class="bg-netral rounded-xl border border-outline p-4 flex flex-col items-center text-center gap-2"
      >
        <LineChart class="w-6 h-6 text-colorPrimary" stroke-width="1.5" />
        <p class="font-sora font-bold text-colorPrimary text-2xl">{{ item.persentase }}%</p>
        <p class="text-text text-xs font-semibold">{{ item.namaProdi }}</p>
        <p class="text-desc text-xs">Angkatan {{ item.angkatan }} &nbsp;|&nbsp; {{ item.tahun }}</p>
        <p class="text-desc text-[10px]">{{ item.jumlah_mengisi }} / {{ item.jumlah_target }} mengisi</p>
      </div>
    </div>
  </div>
</template>