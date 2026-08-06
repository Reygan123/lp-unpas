<script setup lang="ts">
import { computed } from 'vue';
import { Users, UserCircle2, Building2, PencilLine } from 'lucide-vue-next';
import SectionLayout from '@/layouts/SectionLayout.vue';

const props = defineProps<{
  tokang: any[];
  alumni: any[];
  isLoading: boolean;
}>();

const jabatanLabel: Record<string, string> = {
  ketua_angkatan: 'Ketua Angkatan',
  pic_aktivis: 'PIC Aktivis',
};

const getImageUrl = (path: string) => {
  return `${import.meta.env.VITE_API_URL}/storage/${path}`;
};

const tokohAngkatan = computed(() => {
  return (props.tokang || []).map((item: any) => ({
    id: item.id,
    angkatan: item.angkatan,
    nama: item.nama,
    pekerjaan: jabatanLabel[item.jabatan] || item.jabatan,
    institusi: item.departement?.name || '-',
  }));
});

const alumniList = computed(() => {
  return (props.alumni || []).map((item: any) => ({
    id: item.id,
    nama: item.nama,
    profesi: item.profesi,
    perusahaan: item.perusahaan,
    foto: item.foto ? getImageUrl(item.foto) : null,
    deskripsi: item.cerita_sukses || `${item.profesi || '-'} di ${item.perusahaan || '-'}`,
    tanggal: item.created_at
      ? new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
      : '-',
  }));
});
</script>

<template>
  <SectionLayout>
      <div class="grid lg:grid-cols-2 gap-6">
        <div class="bg-white border border-outline rounded-xl p-5">
          <div class="flex items-center justify-between mb-4">
            <h2 class="font-sora font-bold text-text flex items-center gap-2">
              <Users class="w-5 h-5 text-colorPrimary" />
              Tokoh Angkatan
            </h2>
            <router-link
              to="/kemahasiswaan-dan-alumni/tokang"
              class="inline-flex items-center gap-1 text-colorPrimary font-semibold text-sm hover:opacity-80 whitespace-nowrap"
            >
              Lihat Semua
              <i class="pi pi-arrow-right text-xs"></i>
            </router-link>
          </div>

          <div v-if="isLoading" class="py-10 text-center">
            <p class="text-desc text-sm">Memuat data tokoh angkatan...</p>
          </div>

          <div v-else-if="tokohAngkatan.length === 0" class="py-10 text-center">
            <p class="text-desc text-sm">Belum ada data tokoh angkatan.</p>
          </div>

          <div v-else class="overflow-x-auto">
            <table class="w-full min-w-[480px] text-sm">
              <thead>
                <tr class="text-left text-desc text-xs">
                  <th class="pb-3 font-medium">Angkatan</th>
                  <th class="pb-3 font-medium">Nama</th>
                  <th class="pb-3 font-medium">Pekerjaan</th>
                  <th class="pb-3 font-medium">Institusi</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-outline">
                <tr v-for="item in tokohAngkatan" :key="item.id">
                  <td class="py-3 text-text font-semibold whitespace-nowrap">{{ item.angkatan }}</td>
                  <td class="py-3 text-text whitespace-nowrap">{{ item.nama }}</td>
                  <td class="py-3 text-desc whitespace-nowrap">{{ item.pekerjaan }}</td>
                  <td class="py-3 text-desc whitespace-nowrap">{{ item.institusi }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="flex flex-col gap-4">
          <div class="bg-white border border-outline rounded-xl p-5 flex-1">
            <div class="flex items-center justify-between mb-4">
              <h2 class="font-sora font-bold text-text flex items-center gap-2">
                <UserCircle2 class="w-5 h-5 text-colorPrimary" />
                Alumni
              </h2>
              <!-- <router-link
                to="/kemahasiswaan-dan-alumni/ikaft-alumni"
                class="inline-flex items-center gap-1 text-colorPrimary font-semibold text-sm hover:opacity-80 whitespace-nowrap"
              >
                Lihat Semua Berita
                <i class="pi pi-arrow-right text-xs"></i>
              </router-link> -->
            </div>

            <div v-if="isLoading" class="py-10 text-center">
              <p class="text-desc text-sm">Memuat data alumni...</p>
            </div>

            <div v-else-if="alumniList.length === 0" class="py-10 text-center">
              <p class="text-desc text-sm">Belum ada data alumni.</p>
            </div>

            <div v-else class="flex flex-col divide-y divide-outline">
              <div v-for="item in alumniList" :key="item.id" class="flex gap-3 py-3 first:pt-0">
                <img
                  v-if="item.foto"
                  :src="item.foto"
                  :alt="item.nama"
                  class="w-14 h-14 rounded-lg object-cover shrink-0"
                />
                <div v-else class="w-14 h-14 rounded-lg bg-colorPrimary/10 flex items-center justify-center shrink-0">
                  <UserCircle2 class="w-6 h-6 text-colorPrimary" />
                </div>
                <div>
                  <p class="text-text text-sm font-semibold leading-snug">
                    {{ item.nama }} <span v-if="item.profesi">- {{ item.profesi }}</span>
                  </p>
                  <p class="text-desc text-xs leading-relaxed mb-1">
                    {{ item.deskripsi }}
                  </p>
                  <p class="text-desc text-xs">{{ item.tanggal }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <router-link
              to="/kemahasiswaan-dan-alumni/ikaft-alumni"
              class="bg-white border border-outline rounded-xl p-4 flex items-center gap-3 hover:shadow-md transition"
            >
              <Building2 class="w-6 h-6 text-colorPrimary shrink-0" stroke-width="1.5" />
              <div>
                <p class="text-text text-sm font-semibold">IKA FT</p>
                <p class="text-desc text-xs">Kunjungi portal IKA FT Unpas</p>
              </div>
            </router-link>
            <router-link
              to="/kemahasiswaan-dan-alumni/ikaft-alumni"
              class="bg-white border border-outline rounded-xl p-4 flex items-center gap-3 hover:shadow-md transition"
            >
              <PencilLine class="w-6 h-6 text-colorPrimary shrink-0" stroke-width="1.5" />
              <div>
                <p class="text-text text-sm font-semibold">Pembaruan Data Alumni</p>
                <p class="text-desc text-xs">Perbarui data untuk terhubung kembali</p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
  </SectionLayout>
</template>