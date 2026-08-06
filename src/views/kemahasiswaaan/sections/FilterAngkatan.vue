<script setup lang="ts">
import SectionLayout from '@/layouts/SectionLayout.vue';
import { Search } from 'lucide-vue-next';

const props = defineProps<{
  unit: string;
  tahun: string;
  prodi: string;
  status: string;
  search: string;
  unitOptions: any[];
  tahunOptions: any[];
  prodiOptions: any[];
}>();

const emit = defineEmits<{
  'update:unit': [value: string];
  'update:tahun': [value: string];
  'update:prodi': [value: string];
  'update:status': [value: string];
  'update:search': [value: string];
}>();

const statusPic = ['Semua Status', 'On Duty', 'Standby', 'Tidak Aktif'];
</script>

<template>
  <div class="w-full px-[20px] md:px-[60px] lg:px-[120px] space-y-4 md:space-y-4 lg:space-y-4">
    <div class="bg-white border border-outline rounded-xl p-5 flex flex-wrap items-end gap-4">
      <div class="flex flex-col gap-1 w-40">
        <label class="text-xs text-desc">Unit</label>
        <select
          :value="unit"
          @change="emit('update:unit', ($event.target as HTMLSelectElement).value)"
          class="border border-outline rounded-lg px-3 py-2 text-sm text-text bg-white"
        >
          <option v-for="item in unitOptions" :key="item">{{ item }}</option>
        </select>
      </div>
      <div class="flex flex-col gap-1 w-40">
        <label class="text-xs text-desc">Tahun Angkatan</label>
        <select
          :value="tahun"
          @change="emit('update:tahun', ($event.target as HTMLSelectElement).value)"
          class="border border-outline rounded-lg px-3 py-2 text-sm text-text bg-white"
        >
          <option v-for="item in tahunOptions" :key="item">{{ item }}</option>
        </select>
      </div>
      <div class="flex flex-col gap-1 w-48">
        <label class="text-xs text-desc">Program Studi</label>
        <select
          :value="prodi"
          @change="emit('update:prodi', ($event.target as HTMLSelectElement).value)"
          class="border border-outline rounded-lg px-3 py-2 text-sm text-text bg-white"
        >
          <option v-for="item in prodiOptions" :key="item">{{ item }}</option>
        </select>
      </div>
      <div class="flex flex-col gap-1 w-40">
        <label class="text-xs text-desc">Status PIC</label>
        <select
          :value="status"
          @change="emit('update:status', ($event.target as HTMLSelectElement).value)"
          class="border border-outline rounded-lg px-3 py-2 text-sm text-text bg-white"
        >
          <option v-for="item in statusPic" :key="item">{{ item }}</option>
        </select>
      </div>
      <div class="flex flex-col gap-1 flex-1 min-w-[220px]">
        <label class="text-xs text-desc">Cari angkatan / PIC / NPM</label>
        <div class="flex items-center gap-2 border border-outline rounded-lg px-3 py-2">
          <Search class="w-4 h-4 text-desc shrink-0" />
          <input
            :value="search"
            @input="emit('update:search', ($event.target as HTMLInputElement).value)"
            type="text"
            placeholder="Ketik kata kunci..."
            class="flex-1 outline-none text-sm text-text placeholder:text-desc bg-transparent"
          />
        </div>
      </div>
      <button
        class="inline-flex items-center gap-2 bg-colorPrimary text-white font-semibold text-sm px-5 py-2.5 rounded-lg hover:opacity-90 transition whitespace-nowrap">
        <i class="pi pi-list"></i>
        Lihat Semua Angkatan
      </button>
    </div>
  </div>
</template>