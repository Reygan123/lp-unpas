<script setup lang="ts">
import { Eye, Download } from 'lucide-vue-next';

const dokumen = [
  { tahun: '2026/2027', nama: 'Buku Panduan Akademik FT Unpas', tanggal: 'Juli 2026', status: 'Masih Berlaku', statusColor: 'bg-green-100 text-green-700' },
  { tahun: '2025/2026', nama: 'Buku Panduan Akademik FT Unpas', tanggal: 'Juli 2025', status: 'Masih Berlaku', statusColor: 'bg-green-100 text-green-700' },
  { tahun: '2024/2025', nama: 'Buku Panduan Akademik FT Unpas', tanggal: 'Juli 2024', status: 'Tidak Berlaku', statusColor: 'bg-orange-100 text-orange-700' },
  { tahun: '2023/2024', nama: 'Buku Panduan Akademik FT Unpas', tanggal: 'Juli 2023', status: 'Arsip', statusColor: 'bg-gray-100 text-gray-600' },
];
</script>

<template>
  <section id="panduan" class="bg-netral scroll-mt-24">
    <div class="max-w-7xl mx-auto px-4 lg:px-8">
      <div class="bg-white border border-outline rounded-xl p-5">
        <div class="overflow-x-auto">
          <table class="w-full min-w-[520px] text-sm">
            <thead>
              <tr class="text-left text-desc text-xs">
                <th class="pb-3 font-medium">Tahun Akademik</th>
                <th class="pb-3 font-medium">Nama Dokumen</th>
                <th class="pb-3 font-medium">Tanggal Terbit</th>
                <th class="pb-3 font-medium">Status</th>
                <th class="pb-3 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-outline">
              <tr v-for="item in dokumen" :key="item.tahun">
                <td class="py-3 text-text font-semibold whitespace-nowrap">{{ item.tahun }}</td>
                <td class="py-3 text-text whitespace-nowrap">{{ item.nama }}</td>
                <td class="py-3 text-desc whitespace-nowrap">{{ item.tanggal }}</td>
                <td class="py-3 whitespace-nowrap">
                  <span class="text-xs font-semibold px-2 py-1 rounded" :class="item.statusColor">
                    {{ item.status }}
                  </span>
                </td>
                <td class="py-3">
                  <div class="flex items-center justify-end gap-3 text-desc">
                    <button class="hover:text-colorPrimary"><Eye class="w-4 h-4" /></button>
                    <button class="hover:text-colorPrimary"><Download class="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <router-link
          to="/akademik/dokumen"
          class="inline-flex items-center gap-1 text-colorPrimary font-semibold text-sm hover:opacity-80 mt-4"
        >
          Lihat Semua Dokumen
          <i class="pi pi-arrow-right text-xs"></i>
        </router-link>
      </div>
    </div>
  </section>
</template>