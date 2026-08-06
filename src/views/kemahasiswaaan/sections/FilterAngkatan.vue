<script setup lang="ts">
import { Search } from 'lucide-vue-next';

const unit = ['Fakultas Teknik', 'Prodi TI', 'Prodi TP', 'Prodi MS', 'Prodi IF', 'Prodi TL', 'Prodi PWK'];
const tahunAngkatan = ['7 angkatan aktif', '2020', '2021', '2022', '2023'];
const programStudi = ['Semua Program Studi', 'Teknik Informatika', 'Teknik Industri', 'Teknik Mesin', 'Perencanaan Wilayah dan Kota'];
const statusPic = ['Semua Status', 'On Duty', 'Standby', 'Tidak Aktif'];
</script>

<template>
  <section class="bg-netral">
    <div class="max-w-7xl mx-auto px-4 lg:px-8 pb-4">
      <div class="bg-white border border-outline rounded-xl p-5 flex flex-wrap items-end gap-4">
        <div class="flex flex-col gap-1 w-40">
          <label class="text-xs text-desc">Unit</label>
          <select class="border border-outline rounded-lg px-3 py-2 text-sm text-text bg-white">
            <option v-for="item in unit" :key="item">{{ item }}</option>
          </select>
        </div>
        <div class="flex flex-col gap-1 w-40">
          <label class="text-xs text-desc">Tahun Angkatan</label>
          <select class="border border-outline rounded-lg px-3 py-2 text-sm text-text bg-white">
            <option v-for="item in tahunAngkatan" :key="item">{{ item }}</option>
          </select>
        </div>
        <div class="flex flex-col gap-1 w-48">
          <label class="text-xs text-desc">Program Studi</label>
          <select class="border border-outline rounded-lg px-3 py-2 text-sm text-text bg-white">
            <option v-for="item in programStudi" :key="item">{{ item }}</option>
          </select>
        </div>
        <div class="flex flex-col gap-1 w-40">
          <label class="text-xs text-desc">Status PIC</label>
          <select class="border border-outline rounded-lg px-3 py-2 text-sm text-text bg-white">
            <option v-for="item in statusPic" :key="item">{{ item }}</option>
          </select>
        </div>
        <div class="flex flex-col gap-1 flex-1 min-w-[220px]">
          <label class="text-xs text-desc">Cari angkatan / PIC / NPM</label>
          <div class="flex items-center gap-2 border border-outline rounded-lg px-3 py-2">
            <Search class="w-4 h-4 text-desc shrink-0" />
            <input
              type="text"
              placeholder="Ketik kata kunci..."
              class="flex-1 outline-none text-sm text-text placeholder:text-desc bg-transparent"
            />
          </div>
        </div>
        <button class="inline-flex items-center gap-2 bg-colorPrimary text-white font-semibold text-sm px-5 py-2.5 rounded-lg hover:opacity-90 transition whitespace-nowrap">
          <i class="pi pi-list"></i>
          Lihat Semua Angkatan
        </button>
      </div>
    </div>
  </section>
</template>