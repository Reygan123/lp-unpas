<script setup lang="ts">
import { computed } from 'vue';
import { Phone } from 'lucide-vue-next';

const props = defineProps<{
  data: any[];
  isLoading: boolean;
}>();

const jabatanKetua = 'ketua_angkatan';

const toWaLink = (kontak: string) => {
  if (!kontak) return '#';
  const normalized = kontak.trim().replace(/\D/g, '');
  const withCountryCode = normalized.startsWith('0') ? `62${normalized.slice(1)}` : normalized;
  return `https://wa.me/${withCountryCode}`;
};

const angkatan = computed(() => {
  const groups: Record<string, any> = {};

  (props.data || []).forEach((item: any) => {
    const key = `${item.angkatan}-${item.id_departement}`;
    if (!groups[key]) {
      groups[key] = {
        unit: item.departement?.name || '-',
        tahun: item.angkatan,
        ketua: null,
        pic: null,
      };
    }
    if (item.jabatan === jabatanKetua) {
      groups[key].ketua = item;
    } else {
      groups[key].pic = item;
    }
  });

  return Object.values(groups).map((group: any, index: number) => {
    const activePerson = group.pic || group.ketua;
    return {
      no: index + 1,
      unit: group.unit,
      tahun: group.tahun,
      namaKetua: group.ketua?.nama || '-',
      namaPic: group.pic?.nama || '-',
      kontak: activePerson?.kontak || '-',
      alamat: '-',
      surat: '-',
      status: activePerson?.status_on_duty ? 'On Duty' : 'Tidak Aktif',
      statusColor: activePerson?.status_on_duty ? 'bg-green-500' : 'bg-gray-400',
      waLink: activePerson?.kontak ? toWaLink(activePerson.kontak) : '#',
    };
  });
});
</script>

<template>
  <div class="w-full">
    <div class="bg-white border border-outline rounded-xl p-5">
      <h2 class="font-sora font-bold text-colorPrimary mb-1">
        Daftar Angkatan Aktif
      </h2>
      <p class="text-desc text-xs mb-4">
        Default menampilkan angkatan aktif tingkat Fakultas. Gunakan filter untuk memilih unit/prodi atau angkatan sebelumnya.
      </p>

      <div v-if="isLoading" class="py-10 text-center">
        <p class="text-desc text-sm">Memuat data angkatan...</p>
      </div>

      <div v-else-if="angkatan.length === 0" class="py-10 text-center">
        <p class="text-desc text-sm">Tidak ada data angkatan yang sesuai.</p>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full min-w-[960px] text-sm">
          <thead>
            <tr class="text-left text-desc text-xs bg-netral">
              <th class="px-3 py-2 font-medium rounded-l-lg">No</th>
              <th class="px-3 py-2 font-medium">Unit</th>
              <th class="px-3 py-2 font-medium">Tahun Angkatan</th>
              <th class="px-3 py-2 font-medium">Nama Ketua Angkatan</th>
              <th class="px-3 py-2 font-medium">Nama PIC Aktivis Angkatan</th>
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
              <td class="px-3 py-3 text-text whitespace-nowrap">{{ item.namaKetua }}</td>
              <td class="px-3 py-3 text-text whitespace-nowrap">{{ item.namaPic }}</td>
              <td class="px-3 py-3 text-desc whitespace-nowrap">{{ item.kontak }}</td>
              <td class="px-3 py-3 text-desc whitespace-nowrap">{{ item.alamat }}</td>
              <td class="px-3 py-3 text-desc whitespace-nowrap">{{ item.surat }}</td>
              <td class="px-3 py-3 whitespace-nowrap">
                <span class="inline-block text-white text-xs font-semibold px-2.5 py-1 rounded" :class="item.statusColor">
                  {{ item.status }}
                </span>
              </td>
              <td class="px-3 py-3 text-right">
                <a
                  :href="item.waLink"
                  target="_blank"
                  class="inline-flex items-center gap-1.5 bg-colorPrimary text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:opacity-90 transition whitespace-nowrap"
                >
                  <Phone class="w-3.5 h-3.5" />
                  Hubungi
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>