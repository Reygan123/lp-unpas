<script setup lang="ts">
import { Phone } from 'lucide-vue-next';

const angkatan = [
  { no: 1, unit: 'FT', tahun: '2020', npmKetua: '172010023 - Raka Aditya Pratama', npmPic: '172010456 - Dinda Aulia Putri', kontak: '0812-3456-7890', alamat: 'dinda.aulia20@unpas.ac.id', surat: 'Jl. Terusan Cibogo No.100, Bandung 40134', status: 'On Duty', statusColor: 'bg-green-500' },
  { no: 2, unit: 'Prodi TI', tahun: '2021', npmKetua: '182040111 - Muhammad Fikri', npmPic: '182040222 - Nadya Safitri', kontak: '0813-2222-3344', alamat: 'nadya.safitri21@unpas.ac.id', surat: 'Jl. Gegerkalong Hilir No.47, Bandung 40153', status: 'On Duty', statusColor: 'bg-green-500' },
  { no: 3, unit: 'Prodi TP', tahun: '2021', npmKetua: '182020101 - Bagas Pratama', npmPic: '182020220 - Salsabila Nur A.', kontak: '0812-8901-2345', alamat: 'salsabila.tp21@unpas.ac.id', surat: 'Jl. Sukajadi No.201, Bandung 40162', status: 'Standby', statusColor: 'bg-orange-500' },
  { no: 4, unit: 'Prodi MS', tahun: '2022', npmKetua: '192030150 - Fadly Ramadhan', npmPic: '192030275 - Aisyah Putri I.', kontak: '0813-4567-8890', alamat: 'aisyah.ms22@unpas.ac.id', surat: 'Jl. Pastuer No.15, Bandung 40161', status: 'On Duty', statusColor: 'bg-green-500' },
  { no: 5, unit: 'Prodi IF', tahun: '2022', npmKetua: '192050130 - Rehan Fauzi', npmPic: '192050289 - Daffa Putra H.', kontak: '0812-6543-2109', alamat: 'daffa.if22@unpas.ac.id', surat: 'Jl. Cijambul No.88, Bandung 40132', status: 'Standby', statusColor: 'bg-orange-500' },
  { no: 6, unit: 'Prodi TL', tahun: '2023', npmKetua: '202060145 - Siti Nurhaliza', npmPic: '202060312 - Yoga Pratama', kontak: '0813-1122-3344', alamat: 'yoga.tl23@unpas.ac.id', surat: 'Jl. Cibadak No.122, Bandung 40141', status: 'Tidak Aktif', statusColor: 'bg-gray-400' },
  { no: 7, unit: 'Prodi PWK', tahun: '2023', npmKetua: '202070160 - Naufal Ramadhan', npmPic: '202070305 - Putri Nazwa A.', kontak: '0812-9988-7766', alamat: 'putri.pwk23@unpas.ac.id', surat: 'Jl. Dago Asri No.10, Bandung 40135', status: 'Tidak Aktif', statusColor: 'bg-gray-400' },
];
</script>

<template>
  <section class="bg-netral">
    <div class="max-w-7xl mx-auto px-4 lg:px-8">
      <div class="bg-white border border-outline rounded-xl p-5">
        <h2 class="font-sora font-bold text-colorPrimary mb-1">
          Daftar Angkatan Aktif
        </h2>
        <p class="text-desc text-xs mb-4">
          Default menampilkan 7 angkatan aktif tingkat Fakultas. Gunakan filter untuk memilih unit/prodi atau angkatan sebelumnya.
        </p>

        <div class="overflow-x-auto">
          <table class="w-full min-w-[960px] text-sm">
            <thead>
              <tr class="text-left text-desc text-xs bg-netral">
                <th class="px-3 py-2 font-medium rounded-l-lg">No</th>
                <th class="px-3 py-2 font-medium">Unit</th>
                <th class="px-3 py-2 font-medium">Tahun Angkatan</th>
                <th class="px-3 py-2 font-medium">NPM & Nama Ketua Angkatan</th>
                <th class="px-3 py-2 font-medium">NPM & Nama PIC Aktivis Angkatan</th>
                <th class="px-3 py-2 font-medium">Nomor Kontak PIC</th>
                <th class="px-3 py-2 font-medium">Alamat Email PIC</th>
                <th class="px-3 py-2 font-medium">Alamat Surat PIC Angkatan</th>
                <th class="px-3 py-2 font-medium">Status</th>
                <th class="px-3 py-2 font-medium text-right rounded-r-lg">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-outline">
              <tr v-for="item in angkatan" :key="item.no">
                <td class="px-3 py-3 text-text">{{ item.no }}</td>
                <td class="px-3 py-3 text-text font-medium whitespace-nowrap">{{ item.unit }}</td>
                <td class="px-3 py-3 text-text whitespace-nowrap">{{ item.tahun }}</td>
                <td class="px-3 py-3 text-text whitespace-nowrap">{{ item.npmKetua }}</td>
                <td class="px-3 py-3 text-text whitespace-nowrap">{{ item.npmPic }}</td>
                <td class="px-3 py-3 text-desc whitespace-nowrap">{{ item.kontak }}</td>
                <td class="px-3 py-3 text-desc whitespace-nowrap">{{ item.alamat }}</td>
                <td class="px-3 py-3 text-desc whitespace-nowrap">{{ item.surat }}</td>
                <td class="px-3 py-3 whitespace-nowrap">
                  <span class="inline-block text-white text-xs font-semibold px-2.5 py-1 rounded" :class="item.statusColor">
                    {{ item.status }}
                  </span>
                </td>
                <td class="px-3 py-3 text-right">
                  <button class="inline-flex items-center gap-1.5 bg-colorPrimary text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:opacity-90 transition whitespace-nowrap">
                    <Phone class="w-3.5 h-3.5" />
                    Hubungi
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>