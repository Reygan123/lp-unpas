<script setup lang="ts">
import SectionLayout from '@/layouts/SectionLayout.vue';

const rows = [
  { aspek: 'Mode Belajar', reguler: 'Tatap Muka', hybrid: 'Tatap Muka + Daring', pjj: 'Daring Penuh', fastrack: 'Tatap Muka / Hybrid' },
  { aspek: 'Durasi Studi', reguler: '± 4 Tahun (S1)', hybrid: '± 4 Tahun (S1)', pjj: '± 4-5 Tahun', fastrack: '± 5 Tahun (S1 + S2)' },
  { aspek: 'Fleksibilitas', reguler: 'Rendah', hybrid: 'Menengah', pjj: 'Tinggi', fastrack: 'Menengah' },
  { aspek: 'Sesuai Mahasiswa', reguler: 'Fresh Graduate', hybrid: 'Mahasiswa Aktif', pjj: 'Pekerja / Sibuk', fastrack: 'Mahasiswa Berprestasi' },
  { aspek: 'Estimasi Biaya / Semester', reguler: 'Rp 6.000.000', hybrid: 'Rp 5.200.000', pjj: 'Rp 4.000.000', fastrack: 'Rp 7.500.000' },
];
</script>

<template>
  <SectionLayout>
      <h2 class="font-sora text-xl lg:text-2xl font-bold text-text border-l-4 border-colorPrimary pl-3 mb-6">
        Perbandingan Program
      </h2>

      <div class="bg-white rounded-xl border border-outline overflow-x-auto">
        <table class="w-full min-w-[640px] text-sm">
          <thead>
            <tr class="bg-netral">
              <th class="text-left text-text font-sora font-bold px-5 py-3 whitespace-nowrap">Aspek</th>
              <th class="text-left text-text font-sora font-bold px-5 py-3 whitespace-nowrap">Reguler</th>
              <th class="text-left text-text font-sora font-bold px-5 py-3 whitespace-nowrap">Hybrid</th>
              <th class="text-left text-text font-sora font-bold px-5 py-3 whitespace-nowrap">PJJ</th>
              <th class="text-left text-text font-sora font-bold px-5 py-3 whitespace-nowrap">Fastrack Sarjana-Magister</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-outline">
            <tr v-for="row in rows" :key="row.aspek">
              <td class="px-5 py-3 text-text font-medium whitespace-nowrap">{{ row.aspek }}</td>
              <td class="px-5 py-3 text-desc whitespace-nowrap">{{ row.reguler }}</td>
              <td class="px-5 py-3 text-desc whitespace-nowrap">{{ row.hybrid }}</td>
              <td class="px-5 py-3 text-desc whitespace-nowrap">{{ row.pjj }}</td>
              <td class="px-5 py-3 text-desc whitespace-nowrap">{{ row.fastrack }}</td>
            </tr>
          </tbody>
        </table>
      </div>
  </SectionLayout>
</template>