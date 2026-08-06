<script setup lang="ts">
import { computed } from 'vue';
import { Download } from 'lucide-vue-next';
import DokumenService from '@/core/services/DokumenService';

const props = defineProps<{
  dokumen: any[];
  isLoading: boolean;
}>();

const statusMap: Record<string, { label: string; color: string }> = {
  berlaku: { label: 'Masih Berlaku', color: 'bg-green-100 text-green-700' },
  direvisi: { label: 'Direvisi', color: 'bg-blue-100 text-blue-700' },
  dicabut: { label: 'Tidak Berlaku', color: 'bg-orange-100 text-orange-700' },
  arsip: { label: 'Arsip', color: 'bg-gray-100 text-gray-600' },
};

const dokumen = computed(() => {
  return (props.dokumen || []).map((item: any) => ({
    id: item.id,
    tahun: item.tahun_akademik,
    nama: item.judul,
    tanggal: item.tanggal_terbit
      ? new Date(item.tanggal_terbit).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })
      : '-',
    status: statusMap[item.status]?.label || item.status,
    statusColor: statusMap[item.status]?.color || 'bg-gray-100 text-gray-600',
    file: item.file,
    downloadUrl: DokumenService.getDownloadUrl(item.id),
  }));
});
</script>

<template>
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
        <tbody v-if="isLoading" class="divide-y divide-outline">
          <tr>
            <td colspan="5" class="py-6 text-center text-desc text-sm">Memuat dokumen...</td>
          </tr>
        </tbody>
        <tbody v-else-if="dokumen.length === 0" class="divide-y divide-outline">
          <tr>
            <td colspan="5" class="py-6 text-center text-desc text-sm">Belum ada dokumen.</td>
          </tr>
        </tbody>
        <tbody v-else class="divide-y divide-outline">
          <tr v-for="item in dokumen" :key="item.id">
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
                <!-- <a :href="item.downloadUrl" target="_blank" class="hover:text-colorPrimary">
                  <Eye class="w-4 h-4" />
                </a> -->
                <a :href="item.downloadUrl" class="hover:text-colorPrimary">
                  <Download class="w-4 h-4" />
                </a>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- <router-link
      to="/akademik/dokumen"
      class="inline-flex items-center gap-1 text-colorPrimary font-semibold text-sm hover:opacity-80 mt-4"
    >
      Lihat Semua Dokumen
      <i class="pi pi-arrow-right text-xs"></i>
    </router-link> -->
  </div>
</template>